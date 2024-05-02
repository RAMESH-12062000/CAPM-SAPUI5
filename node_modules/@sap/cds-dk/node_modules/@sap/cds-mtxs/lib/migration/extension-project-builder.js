const path = require('path')
const fs = require('fs')
const cds = require('@sap/cds')
const DEBUG = cds.debug('mtx') //Note: cds.debug returns false for @sap/cds@(< 6.2)

module.exports.build = async function (options) {
    const { project } = options
    const env = cds.env
    const root = cds.root
    try {
        cds.root = project
        cds.env = cds.env.for('cds', project)
        options.dest = path.join(project, cds.env.build.target, 'ext')
        await new ExtensionBuilder(options).run()
    } finally {
        cds.root = root
        cds.env = env
    }
}

class ExtensionBuilder {
    constructor(options) {
        this._files = []
        this._options = options
    }

    async run() {
        const { project, dest } = this._options

        // clean any existing content
        await fs.promises.rm(dest, { force: true, recursive: true })

        // check existence of appPackage folder only
        const appPackageFolder = this._getAppPackageFolder()
        if (!fs.existsSync(path.join(project, appPackageFolder))) {
            throw new Error(`The SaaS application base model '${appPackageFolder}' is missing.`)
        }

        // full compile of the extension using base model - ensuring consistency
        const modelFolders = cds.resolve('*', false).filter(p => !p.startsWith('@sap/cds-mtx'))
        DEBUG && DEBUG(`Extension model folders: ${modelFolders}`)

        // throws an error if no model is found -> e.code === MODEL_NOT_FOUND
        const model = await cds.load(modelFolders)

        // extension CSN using parsed format
        const extModel = await cds.load(this._resolveExtensionFiles(model, project), { flavor: 'parsed' })
        if (extModel.requires) {
            extModel.requires.length = 0
        }

        const csn = cds.compile.to.json(extModel)
        await this._write(csn, path.join(dest, 'extension.csn'))
        await this._collectLanguageBundles(extModel, path.join(dest, 'i18n'))

        const files = Object.keys(await cds.deploy.resources(model))
        if (files.length > 0) {
            const dataDest = path.join(dest, 'data')
            await Promise.all(
                files
                    .filter(file => /\.csv$/.test(file))
                    .map(csv => this._copy(csv, path.join(dataDest, path.basename(csv))))
            )
        }
        await this._copy(path.join(project, 'package.json'), path.join(dest, 'package.json'))
        // add all resources contained in 'gen/ext' folder
        await this._writeTarFile(path.join(project, cds.env.build.target, 'extension.tgz'), dest)

        DEBUG && DEBUG('build output:\n' + this._files.map(file => `  ${path.relative(project, file)}`).join('\n'))
    }

    _getAppPackageFolder() {
        return path.join('node_modules', cds.env.extends || '_base');
    }

    _resolveExtensionFiles(model, project) {
        const node_modules = path.join(project, 'node_modules')
        const paths = model['$sources'].reduce((acc, file) => {
            if (file.startsWith(project) && !file.startsWith(node_modules)) {
                acc.push(file)
            }
            return acc
        }, [])

        return paths
    }

    async _write(data, dest) {
        this._files.push(dest)
        await fs.promises.mkdir(path.dirname(dest), { recursive: true })
        await fs.promises.writeFile(dest, typeof data === "object" && !Buffer.isBuffer(data) ? JSON.stringify(data, null, 2) : data)
    }

    async _copy(src, dest) {
        this._files.push(dest)
        await fs.promises.mkdir(path.dirname(dest), { recursive: true })
        await fs.promises.copyFile(src, dest)
    }

    async _writeTarFile(tarFile, root, resources) {
        const { tar } = cds.utils
        await tar.czfd(tarFile, root, resources)
        this._files.push(tarFile)
    }

    async _collectLanguageBundles(model, dest) {
        // collect effective i18n properties...
        let bundles = {}
        const bundleGenerator = cds.localize.bundles4(model)
        if (bundleGenerator && bundleGenerator[Symbol.iterator]) {
            for (let [locale, bundle] of bundleGenerator) {
                // fallback bundle has the name ""
                if (typeof locale === 'string') {
                    bundles[locale] = bundle
                }
            }
        }
        // omit bundles in case the fallback bundle is the only existing entry
        const keys = Object.keys(bundles)
        if (keys.length === 1 && keys[0] === "" && Object.keys(bundles[keys[0]]).length === 0) {
            bundles = {}
        }
        // copied from ../compile/i18n.js
        const { file: base = 'i18n' } = cds.env.i18n
        if (Object.keys(bundles).length > 0) {
            await this._write(bundles, path.join(dest, base + '.json'))
        }
    }
}
