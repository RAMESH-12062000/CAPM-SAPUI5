const { parentPort } = require('worker_threads')
const cds = require('@sap/cds')

parentPort.on('message', async ({ models, flavor }) => {
    try {
        let csn = await cds.load(models, { flavor, silent: true })
        csn = csn.meta?.flavor === 'inferred' ? cds.minify(csn) : csn
        // Dirty hack for cds.localize in Node sidecar setup
        Object.defineProperty (csn,'$sources',{ value:csn.$sources, enumerable:true }) // REVISIT: better solution
        parentPort.postMessage({ csn })
    } catch (error) {
        parentPort.postMessage({ error: error.message })
    }
})
