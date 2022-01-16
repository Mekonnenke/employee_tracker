const initialQuestion = [
    {
        type: "list",
        message: "What would you like to do",
        name: "initialInput",
        choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    }
]

const departmentQuestion = [
    {
        type: "Input",
        message: "Enter New Department Name:",
        name: "departmentName",
    }
]

const roleQuestions = [
    {
        type: "Input",
        message: "Enter New Role Name:",
        name: "roleName",
    },
    {
        type: "Input",
        message: "Enter New Role Salary",
        name: "roleSalary",
    },
    {
        type: "list",
        message: "Enter New Role's Department:",
        name: "roleDepartment",
        choices: []
    }
]

const employeeQuestions = [
    {
        type: "Input",
        message: "Enter New Employee First Name:",
        name: "employeeFirstName",
    },
    {
        type: "Input",
        message: "Enter New Employee Last Name:",
        name: "employeeLastName",
    },
    {
        type: "list",
        message: "Enter New Employee's Role:",
        name: "employeeRole",
        choices: []
    },
    {
        type: "list",
        message: "Enter New Employee's Manager:",
        name: "employeeManager",
        choices: [{name: "none", value: null}]
    }
]

const updateQuestions = [
    {
        type: "list",
        message: "Which Employee Would You Like To Update?",
        name: "updatedEmployeeName",
        choices: []
    },
    {
        type: "list",
        message: "What Role Would You Like To Assign Them?",
        name:"employeeNewRole",
        choices: []
    }
]

module.exports = { initialQuestion, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions }