sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        <% if (!newControllerRouting) { %>'sap/fe/core/controllerextensions/FlexibleColumnLayout',
        'sap/fe/core/controllerextensions/Routing'<% } else { %>'sap/fe/core/controllerextensions/RoutingListener'<% } %>
    ],
    function(Controller, <% if (!newControllerRouting) { %>FCLExtension, RoutingExtension<% } else { %>RoutingListener<% } %>) {
        'use strict';

        return Controller.extend('<%- name %>', {
            <% if (!newControllerRouting) { %>fcl: FCLExtension,
            routing: RoutingExtension<% } else { %>routingListener: RoutingListener,<% } %>

            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf <%= name %>
             */
            //	onInit: function () {
            //
            //	},

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf <%= name %>
             */
            //	onBeforeRendering: function() {
            //
            //	},

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf <%= name %>
             */
            //	onAfterRendering: function() {
            //
            //	},

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf <%= name %>
             */
            //	onExit: function() {
            //
            //	}
        });
    }
);
