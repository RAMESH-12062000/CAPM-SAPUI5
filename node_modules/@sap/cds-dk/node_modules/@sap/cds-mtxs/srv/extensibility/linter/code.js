const cds = require('@sap/cds/lib')
const { staticCheckCode } = require('../code-extensibility/codeValidation')

const _removeActionFromElement = (name, action) => {
    const index = name.indexOf(`.${action}`)
    if (index !== -1) return name.substr(0, index)
    return name
}

module.exports = class CodeChecker {
    check(reflectedExtensionCsn) {
        if (!cds.requires.extensibility?.code) return []
        if (!reflectedExtensionCsn.extensions) return []

        const messages = []
        reflectedExtensionCsn.extensions.forEach(ext => {
          if (ext['@extension.code']) {
            ext['@extension.code'].forEach(reg => {
                const file = reg.on
                    ? `${_removeActionFromElement(ext.annotate, reg.on)}-on-${reg.on}.js`
                    : `${ext.annotate}-${reg.after ? 'after' : 'before'}-${reg.after || reg.before}.js`
                messages.push(...staticCheckCode(file, reg.code))
            })
          }
          if (ext.actions) {
            Object.values(ext.actions).forEach(action => {
                if (action['@extension.code']) {
                    action['@extension.code'].forEach(reg => {
                        messages.push(...staticCheckCode(`${ext.annotate}-on-${reg.on}.js`, reg.code))
                    })
                }
            })
          }
        })

        return messages
    }
}