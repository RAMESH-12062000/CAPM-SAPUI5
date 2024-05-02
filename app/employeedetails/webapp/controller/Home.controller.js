sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Token, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("com.app.employeedetails.controller.Home", {
            onInit: function () {

                //this.oRouter = this.getOwnerComponent().getRouter();
                //This is multi inputs @one field not a separate feild...
                var oView = this.getView();
                var oMultiInput = oView.byId("idFNameFilterValue");
                oMultiInput.addValidator(function (args) {
                    if (true) {
                        var text = args.text;
                        return new Token({ key: text, text: text });
                    }
                });

                const oLocalModel = new JSONModel({
                    fName: "",
                    lName: "",
                    gender: "",
                    DOB: "",
                    contractStarted: "",
                    email: "",
                    phone: ""
                });
                this.getView().setModel(oLocalModel, "localModel");
                this.getRouter().attachRoutePatternMatched(this.onEmployeeListLoad, this);
            },
            onEmployeeListLoad: function () {
                this.getView().byId("idEmployeeTable").getBinding("items").refresh();
            },
            onGoPress: function () {
                /**
                 * Create all the filters
                 * Use Multi Input in Filters so that we can push multiple filters at a time
                 * Add the Functionality for Clear Filter
                 */
                const oView = this.getView(),
                    oFirstNameFilter = oView.byId("idFNameFilterValue"),
                    sFirstName = oFirstNameFilter.getTokens(),
                    oLastNameFilter = oView.byId("idLNameFilterValue"),
                    sLastName = oLastNameFilter.getValue(),
                    oEmailFilter = oView.byId("idEmailFilterValue"),
                    sEmail = oEmailFilter.getValue(),
                    oPhoneNumberFilter = oView.byId("iPhoneFilterValue"),
                    sPhoneNumber = oPhoneNumberFilter.getValue(),

                    oTable = oView.byId("idEmployeeTable"),
                    aFilters = [];
                /*
                 * This is for to filtering the multidata throgh the fname ...
                 * but need to maintain tokens concept...*/
                sFirstName.filter((element) => {

                    element ? aFilters.push(new Filter("fName", FilterOperator.EQ, element.getKey())) : "";
                })

                //sFirstName ? aFilters.push(new Filter("fName", FilterOperator.EQ, sFirstName)) : "";
                sLastName ? aFilters.push(new Filter("lName", FilterOperator.EQ, sLastName)) : "";
                sEmail ? aFilters.push(new Filter("email", FilterOperator.EQ, sEmail)) : "";
                sPhoneNumber ? aFilters.push(new Filter("phone", FilterOperator.EQ, sPhoneNumber)) : "";

                oTable.getBinding("items").filter(aFilters);
            },
            //Functionality for Clear Filter...
            //removeAllTokens(),
            onClearFilterPress: function () {
                const oView = this.getView(),
                    oEmailFilter = oView.byId("idEmailFilterValue").setValue(),
                    oFirstNameFilter = oView.byId("idFNameFilterValue").removeAllTokens(),
                    oLastNameFilter = oView.byId("idLNameFilterValue").setValue(),
                    oPhoneNumberFilter = oView.byId("iPhoneFilterValue").setValue()
            },
            onSelectEmployee: function (oEvent) {
                const { ID, fName } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetails", {
                    empId: ID,
                    empName: fName
                })
            },
            onCreateBtnPress: async function () {
                if (!this.oCreateEmployeeDialog) {
                    this.oCreateEmployeeDialog = await this.loadFragment("CreateEmployeeDialog")
                }

                this.oCreateEmployeeDialog.open();
            },
            onCloseDialog: function () {
                if (this.oCreateEmployeeDialog.isOpen()) {
                    this.oCreateEmployeeDialog.close()
                }
            },
            onCreateEmployee: async function () {
                const oPayload = this.getView().getModel("localModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                try {  
                    await this.createData(oModel, oPayload, "/Employee");
                    this.getView().byId("idEmployeeTable").getBinding("items").refresh();
                    this.oCreateEmployeeDialog.close();
                } catch (error) {
                    this.oCreateEmployeeDialog.close();
                    MessageBox.error("Some technical Issue");
                }

            }
        });
    });
