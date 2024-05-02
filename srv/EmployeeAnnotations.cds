using {EmployeeService} from './employee-service';


annotate EmployeeService.Employee with {
    fName  @title: '{i18n>FName}';
    lName  @title: '{i18n>LName}';
    DOB    @title: '{i18n>DOB}';
    email  @title: '{i18n>Email}';
    gender @title: '{i18n>Gender}';
    phone  @title: '{i18n>phone}';
};


// annotate EmployeeService.Employee with @restrict: [{
//         grant: '*',
//         to   : 'Admin'
//     }];
