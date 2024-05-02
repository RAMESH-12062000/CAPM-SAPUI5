@protocol:'rest'
@(requires: ['cds.Subscriber', 'internal-user'])
@(path:'/-/cds/deployment')
service cds.xt.DeploymentService @(impl:'@sap/cds-mtxs/srv/deployment-service.js') {

    /**
     * Subscribe tenant
     * @param tenant Tenant to subscribe
     * @param options Additional subscription options
     */
    action subscribe(@mandatory tenant: String, @open metadata: {}, @open options: {});

    /**
     * Unsubscribe tenant
     * @param tenant Tenant to unsubscribe
     */
    action unsubscribe(@mandatory tenant: String, @open options: {});

    /**
     * Extend tenant
     * @param tenant Tenant to extend
     */
    action extend(@mandatory tenant: String, @open csvs: {}); // REVISIT: csvs, better use options

    action upgrade(@mandatory tenant: String, @open options: {});

    action deploy(@mandatory tenant: String, @open options: {});
}

// Internal API
extend service cds.xt.DeploymentService with {
    function getTables(@mandatory tenant: String) returns Array of String;
    function getColumns(@mandatory tenant: String, @mandatory table: String, @open params: {}) returns Array of String;

    function getTenants(@open options: {}) returns Array of String;
    function getContainers(@open options: {}) returns Array of String;
}