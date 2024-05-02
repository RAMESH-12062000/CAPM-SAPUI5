const cds = require('@sap/cds/lib')
const { staticCheckCode } = require('./codeValidation')
const { parseName, getFQN } = require('./fqn')
const { readHandlers } = require('./readHandlers')
const CODE_ANNOTATION = '@extension.code'

const _addAnnotationLocal = (file, code) => {
  const { operation, registration, entityName } = parseName(file)
  // first check if action/function
  const {fqn} = getFQN(entityName, cds.model.definitions, {}, operation)
  if (!fqn) cds.error(`Bad handler name ${entityName}-${registration}-${operation}}`, { code: 400 })
  if (!fqn[CODE_ANNOTATION]) {
    fqn[CODE_ANNOTATION] = []
  }
  fqn[CODE_ANNOTATION].push({ [registration]: operation, code })

  // REVISIT: Remove after cds build calls linters
  // Also consider removing bad file names locally by run
  const findings = staticCheckCode(file, code)    
  if (findings.length > 0) return findings
}

const addCodeAnnotations = async (projectPath = cds.root) => {
  const handlers = await readHandlers(projectPath)
  const findings = []
  handlers.forEach((code, file) => {
    const addResult = _addAnnotationLocal(file, code)
    if (addResult) findings.push(...addResult)
  })

  return findings.map(f => f.message)
}

module.exports = { addCodeAnnotations }
