const cds = require('@sap/cds')

const { fs, path } = cds.utils
const tempDir = fs.realpathSync(require('os').tmpdir());
const LOG = cds.log('mtx')

module.exports.getAllTenantIds = async () => {

    const hana = require('@sap/cds-mtxs/srv/plugins/hana/srv-mgr')

    // copied from mtx
    const META_TENANT_REGEX = /TENANT-(.*)-META/i
    const MT_LIB_TENANT_REGEX = /MT_LIB_TENANT-(.*)/i
    const GLOBAL_DATA_META_TENANT = '__META__'
    function _tenantFilter(tenantId, index, allTenants) {
        const t0 = cds.env.requires.multitenancy?.t0 ?? 't0'
        return tenantId
            && !META_TENANT_REGEX.test(tenantId)
            && !MT_LIB_TENANT_REGEX.test(tenantId)
            && tenantId.toLowerCase() !== GLOBAL_DATA_META_TENANT.toLowerCase()
            && tenantId !== t0
            && allTenants.includes(_prefixTenant(tenantId))
    }

    // TODO remove duplicates resulting from multiple bindings
    // replaces Tenant.getAllTenantIds()
    return (await hana.getAll()).reduce((result, t) => [ ...result, t.labels.tenant_id[0]] , []).filter(_tenantFilter)
}

function _prefixTenant(tenantId) {
    return `TENANT-${tenantId}-META`
}

module.exports.getMetaTenantName = (tenant) => {
    return _prefixTenant(tenant)
}

module.exports.getMetadata = async (tenant) => {
    return getMetadata(tenant)
}

async function getMetadata(tenant, type = 'onboarding') {

    // replaces Tenant.getMetadata(tenant)
    const CONTENT_METADATA_QUERY = 'SELECT CONTENT FROM TENANT_METADATA WHERE ID = ? AND DOMAIN = ? LIMIT 1'
    const domain = cds.env.mtx && cds.env.mtx.domain || '__default__'

    try {
        const result = (await cds.tx({ tenant: _prefixTenant(tenant) }, tx => tx.run(CONTENT_METADATA_QUERY, [type, domain])))
        const CONTENT = result?.[0]?.CONTENT || result?.[0]?.content // small tribute to sqlite for testing
        if (type === 'onboarding') {
            const metadata = CONTENT ? JSON.parse(CONTENT) : {}
            // more robust behaviour
            if (!metadata.subscribedTenantId) metadata.subscribedTenantId = tenant
            return metadata
        } else {
            return CONTENT ? JSON.parse(CONTENT) : null
        }

    } catch (error) {
        LOG.error(`Failed to query metadata for tenant '${tenant}' (domain: ${domain}): ${error}`)
        throw error;
    }
}

module.exports.saveMetadata = async (tenant, type, data) => {
    const domain = cds.env.mtx && cds.env.mtx.domain || '__default__'
    const statement = 'UPSERT TENANT_METADATA (ID, CONTENT, DOMAIN) VALUES(?, ?, ?) WHERE ID = ? AND DOMAIN = ?';
    await cds.tx({ tenant: _prefixTenant(tenant) }, tx => tx.run(statement, [type, JSON.stringify(data), domain, type, domain]))
}

const COMPILED_FILES = {
    CSN_NODE: 'csn_node.json', // deprecated
    CSN: 'csn.json',
    ODATA_CSN: 'odata_csn.json',
    I18N: '_i18n/i18n.json'
}

const MODEL_TYPE = {
    base: 'base',
    extension: 'extension',
    compiled: 'compiled',
    migration: 'migration'
}

module.exports.getCsn = async (tenant) => {

    const CONTENT_FILE_QUERY = 'SELECT CONTENT FROM TENANT_FILES WHERE TYPE = ? AND FILENAME = ? AND DOMAIN = ? LIMIT 1';

    const domain = cds.env.mtx && cds.env.mtx.domain || '__default__'

    try {
        const result = (await cds.tx({ tenant: _prefixTenant(tenant) }, tx => tx.run(CONTENT_FILE_QUERY, [MODEL_TYPE.compiled, COMPILED_FILES.CSN_NODE, domain])))
        const { CONTENT } = result && result[0] || {}
        return CONTENT ? JSON.parse(CONTENT) : null

    } catch (error) {
        this.logger.error(`Failed to query collectedSources for tenant '${tenant}' (domain: ${domain}): ${error}`)
        throw error;
    }

    // const loadedModel = await Tenant.getModel(tenant, 'collectedSources');
    // return JSON.parse(loadedModel);
}

// replaces Content.getExtension(tenant)
module.exports.getExtension = async (tenant) => {

    function _isModelFile(filename) {
        const BASE_MODEL_EXTENSION_PROJECT_FILTER = /(.*\.cds$|.*\.csn$|.*\/csn.json$|^csn.json$|.*\/i18n(|_.*)(\.json|\.properties)$)/
        return BASE_MODEL_EXTENSION_PROJECT_FILTER.test(filename);
    }

    function _convertToExtensionProject(files) {
        const BASE_MODEL_NAME = '_base'
        const basemodelFiles = new Map();

        for (const [file, content] of files) {
            if (_isModelFile(file)) {
                const prefixedPath = path.join('node_modules', BASE_MODEL_NAME, file);
                basemodelFiles.set(prefixedPath, content);
            }
        }

        return basemodelFiles;
    }

    async function readFiles(modelType) {
        const MODEL_FILE_QUERY = 'SELECT FILENAME, CONTENT, TYPE FROM TENANT_FILES WHERE TYPE = ? AND DOMAIN = ?';
        const domain = cds.env.mtx && cds.env.mtx.domain || '__default__'
        try {
            const files = (await cds.tx({ tenant: _prefixTenant(tenant) }, tx => tx.run(MODEL_FILE_QUERY, [modelType, domain])));
            return files.map(({ FILENAME, CONTENT }) => [FILENAME, CONTENT.toString('utf-8')]);

        } catch (error) {
            LOG.error(`Failed to query extensions for tenant '${tenant}' (domain: ${domain}): ${error}`);
            throw error;
        }
    }

    const extensions = await readFiles(MODEL_TYPE.extension);
    if (!extensions?.length) return // return nothing if no extensions exist

    const base = await readFiles(MODEL_TYPE.base);

    return [...extensions, ..._convertToExtensionProject(base)]
}

module.exports.hasExtensions = async (tenant) => {
    if (!(await module.exports.wasOldMtx())) return false
    const MODEL_FILE_QUERY = 'SELECT FILENAME FROM TENANT_FILES WHERE TYPE = ? AND DOMAIN = ?';
    const domain = cds.env.mtx && cds.env.mtx.domain || '__default__'
    try {
        const files = (await cds.tx({ tenant: _prefixTenant(tenant) }, tx => tx.run(MODEL_FILE_QUERY, ['extension', domain])));
        return files.length
    } catch (error) {
        LOG.debug(`Upgrade check: No @sap/mtx (old mtx) extensions found for tenant '${tenant}' (domain: ${domain}): ${error}`);
        return false;
    }
}

const wasOldMtx = []

// use this before automatic tenant list update in upgrade
module.exports.wasOldMtx = async () => {
    if (!wasOldMtx.length) {
        if (cds.env.requires.db?.kind === 'hana') {
            const hana = require('@sap/cds-mtxs/srv/plugins/hana/srv-mgr')
            try {
                wasOldMtx.push(!!(await hana.get('__META__')))
            } catch (error) {
                if (error.status === 404) wasOldMtx.push(false)
                else throw error
            }
        } else {
            wasOldMtx.push(false)
        }
    }
    return wasOldMtx[0]
}

module.exports.isMigrated = async (tenant) => {
    return getMetadata(tenant, 'migrated')
}

module.exports.getMigrationParameters = async (tenant) => {
    return getMetadata(tenant, 'migrationParameters')
}

module.exports.setMigrated = async (tenant, tagRule, defaultTag, force) => {
    const timestamp = new Date();
    const timestampIso = timestamp.toISOString();
    const data = {
        timestamp: timestampIso
    }
    await module.exports.saveMetadata(tenant, 'migrated', data)
    await module.exports.saveMetadata(tenant, 'migrationParameters', { tagRule, defaultTag, force })
}

function unixPath(filename) {
    return filename.replace(/\\/g, '/');
}

module.exports.writeFilesFromMap =  async (files, baseDir) => {
    for (const [filename, content] of files) {
        const unixFilename = unixPath(filename);
        const absoluteFilename = path.resolve(baseDir, unixFilename);

        if (absoluteFilename.includes(baseDir)) {
            //this.logger.debug(`Writing file: ${absoluteFilename}`);
            await fs.promises.mkdir(path.dirname(absoluteFilename), { recursive: true });
            await fs.promises.writeFile(absoluteFilename, content);
        } else {
            //this.logger.debug(`Do not write file outside of target: ${absoluteFilename}`);
        }
    }
}

module.exports.mkdirTemp = async () => {
    return fs.promises.mkdtemp(`${tempDir}${path.sep}`);
}
