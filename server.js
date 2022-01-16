const inquirer = require("inquirer")
const { initialQuestion, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions } = require("./db/questions")
const cTable = require("console.table")
const mysql = require("mysql2")
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'hashHaset33*',
  database: 'company'
})

function init() {
    inquirer.prompt(initialQuestion)
    .then(answer => {
      answer = answer.initialInput;
      switch (answer) {
        case "View All Employees":
          displayEmployees()
          break;
        case "Add Employees":
          addEmployee()
          break;
        case "Update Employee Role":
          updateEmployee()
          break;
        case "View All Roles":
          displayRoles()
          break;
        case "Add Role":
          addRole()
          break;
        case "View All Departments":
          displayDepartments()
          break;
        case "Add Department":
          addDepartment()
          break;
        case "Quit":
          console.log("Okay, goodbye.")
          process.exit(0)
        return
    }
  })
  .catch(err => {
    console.error(err)
  })
}



init();