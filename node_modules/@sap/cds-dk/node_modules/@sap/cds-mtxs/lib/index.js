const cds = require('@sap/cds')

const [major, minor] = cds.version.split('.').map(Number)
if (major < 6 || major === 6 && minor < 7) throw new Error('@sap/cds-mtxs >= 1.7 requires @sap/cds version >= 6.7')

const { defineProperty } = Object

const xt = cds.xt = cds.xt ?? {}

// access to extension linter, internal usage only!
'linter' in xt || defineProperty (xt, 'linter', {
  enumerable:false,
  get:()=> require('../srv/extensibility/linter')
})

// access to service manager client, internal usage only!
'serviceManager' in xt || defineProperty (xt, 'serviceManager', {
  enumerable:false,
  get:()=> require('../srv/plugins/hana/srv-mgr')
})

/** @type { import('@sap/cds/apis/cds') } */
module.exports = cds
