using employee.details as db from '../db/data-model';

@path: '/EmployeeSRV'
service EmployeeService {
    @restrict: [{
        grant: '*',
        to   : 'Admin'
    }]
    entity Employee    as projection on db.Employee;

    entity Address     as projection on db.Address;
    entity Salary      as projection on db.Salary;
    entity Department  as projection on db.Department;
    entity Designation as projection on db.Designation;
}
