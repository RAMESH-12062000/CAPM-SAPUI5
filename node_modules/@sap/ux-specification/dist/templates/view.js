sap.ui.jsview('<%- controllerName %>', {
    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf <%= name %>
     */
    getControllerName: function() {
        return '<%- controllerName %>';
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf <%= name %>
     */
    createContent: function(oController) {
        var oPage = new sap.m.Page({
            title: '<%= name %>',
            id: 'page',
            content: []
        });

        var app = new sap.m.App(this.createId('app'), {
            initialPage: 'oPage'
        });
        app.addPage(oPage);
        return app;
    }
});
