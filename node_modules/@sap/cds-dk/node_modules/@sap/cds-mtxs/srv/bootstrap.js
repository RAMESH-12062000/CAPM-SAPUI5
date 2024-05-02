const cds = require ('@sap/cds/lib')
const DEBUG = cds.debug('mtx')

class MTXServices extends cds.Service { init(){
  DEBUG?.('bootstrapping MTX services...')
  const { definitions } = cds.model
  const models = []

  if (cds.requires.multitenancy) {
    _serve ('cds.xt.SaasProvisioningService')
    _serve ('cds.xt.DeploymentService')
    _serve ('cds.xt.ModelProviderService')
  }

  if (cds.requires.extensibility) {
    _serve ('cds.xt.ExtensibilityService')
    _serve ('cds.xt.ModelProviderService')
  }

  if (cds.requires.toggles) {
    _serve ('cds.xt.ModelProviderService')
  }

  function _serve (service) {
    if (service in definitions) return
    if (cds.requires[service] === false) return
    models.push(cds.requires.kinds[service].model)
  }

  if (models?.length) return cds.serve(models).in(cds.app)
}}

module.exports = MTXServices
