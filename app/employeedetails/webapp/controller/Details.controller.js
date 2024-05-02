sap.ui.define(
  [
      "./BaseController",
      "sap/m/MessageBox"
  ],
  function(BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("com.app.employeedetails.controller.Details", {
      onInit: function() {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.attachRoutePatternMatched(this.onEmployeeDetailsLoad, this); 
      },
      onEmployeeDetailsLoad: function(oEvent ){
          const {empId} = oEvent.getParameter("arguments");
          this.ID = empId;
          const sRouterName = oEvent.getParameter("name");
          const oObjectPage = this.getView().byId("idEmployeeDetailsObjectPage");

          oObjectPage.bindElement(`/Employee(${empId})`, {
              expand: 'salary,address'
          });
      },
      onDeleteEmployee: async function(){
        const oModel = this.getView().getModel("ModelV2");
       
        try {
          await this.deleteData(oModel, "/Employee", this.ID);
          this.getRouter().navTo("RouteHome");
        } catch (error) {
          MessageBox.error("Some Technical Issue");
        }
    }
    });
  }
);