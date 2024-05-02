const cds = require('@sap/cds/lib')
const { parseName, getFQN } = require('./fqn')
const { readHandlers } = require('./readHandlers')
const CODE_ANNOTATION = '@extension.code'

async function _getTenantModel(tenant) {
  const { 'cds.xt.ModelProviderService': mps } = cds.services
  return await mps.getCsn(tenant, [], 'nodejs')
}

const _addAnnotationProd = async (extCsn, file, code, tenant) => {
  const { operation, registration, entityName } = parseName(file)
  const m = await _getTenantModel(tenant)
  // REVISIT: Move reflection up
  const reflectedCsn = cds.reflect(extCsn)
  const {fqn, bound} = getFQN(entityName, m.definitions, reflectedCsn.definitions, operation)
  if (!fqn) cds.error(`Bad handler name ${entityName}-${registration}-${operation}`, { code: 400 })
 
  if (!extCsn.extensions) extCsn.extensions = []
  const fqName = bound ? entityName : fqn.name
  if (bound) {
    const ext = extCsn.extensions.find(element => element.annotate === fqName && element.actions?.[operation]?.[CODE_ANNOTATION])
    if (ext) {
      ext.actions[operation][CODE_ANNOTATION].push({ [registration]: operation, code })
    } else {
      extCsn.extensions.push({ 
        annotate: fqName, 
        actions: { [operation] : { [CODE_ANNOTATION]: [{ [registration]: operation, code }] } } })
    }
  } else {
    const ext = extCsn.extensions.find(element => element.annotate === fqName && element[CODE_ANNOTATION])
    if (ext) {
      ext[CODE_ANNOTATION].push({ [registration]: operation, code })
    } else {
      extCsn.extensions.push({ annotate: fqName, [CODE_ANNOTATION]: [{ [registration]: operation, code }] })
    }
  }
}

const addCodeAnnotations = async (projectPath, extCsn, tenant) => {
  const handlers = await readHandlers(projectPath)
  for (var entry of handlers.entries()) {  
    await _addAnnotationProd(extCsn, entry[0], entry[1], tenant)    
  }
}

module.exports = { addCodeAnnotations }
