const cds = require('@sap/cds/lib')
const { path } = cds.utils

const conf = cds.requires['cds.xt.ModelProviderService'] || cds.requires.kinds['cds.xt.ModelProviderService']
const main = conf.root ? new class { //> we're running in sidecar -> use env of main app
  get env() { return super.env = cds.env.for ('cds', this.root) }
  get root() { return super.root = path.resolve (cds.root, conf.root) }
  get requires() { return super.requires = this.env.requires }
  cache = {} //> for cds.resolve()
} : { //> not in sidecar
  requires: cds.requires,
  root: cds.root,
  env: cds.env,
}

module.exports = main
