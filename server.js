const inquirer = require("inquirer")
const { initialQuestion, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions } = require("./questions/questions")
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

function choicesLoop(sqlStr, choices, role) {
    connection.promise().query(`${sqlStr}`)
    .then(data => {
      const table = data[0]
      if(!role) {
        for(let i = 0; i < table.length; i++) {
          choices.push({name: table[i].first_name + " " + table[i].last_name, value: table[i].id})
          // console.log('choices',choices)
        }
      } else {
          for(let i = 0; i < table.length; i++) {
            choices.push({name: table[i].title, value: table[i].id})
            // console.log('choices',choices)
          }
      }
    })
}

function displayDepartments() {
  connection.query(`SELECT * from departments`, (err, data) => {
    console.table(data)
    init()
  })
}

function displayRoles() {
    connection.query(`SELECT roles.id, roles.title, roles.salary, departments.department_name AS department
      FROM roles
      LEFT JOIN departments
      ON roles.department_id = departments.id;`, (err, data) => {
        console.table(data)
        init()
      })
}
function displayEmployees() {
  connection.query(`SELECT employees.id, employees.first_name AS first, employees.last_name AS last, roles.title AS roles, roles.salary AS salary, departments.department_name AS department, employees.manager_id AS manager FROM employees
  JOIN roles
  ON employees.role_id = roles.id
  JOIN departments
  ON roles.department_id = departments.id;`, (err, data) => {
    if(err) {
      throw err
    }
    else {
      console.table(data)
      init()
    }
  })
}

function addDepartment() {
  inquirer.prompt(departmentQuestion)
  .then (answer => {
    connection.query(`INSERT INTO departments (department_name)
    VALUES ("${answer.departmentName}");`)
    init()
  })
}

function addRole() {
  connection.promise().query(`SELECT * FROM departments`)
    .then(data => {
      // console.log('data----', data);
      const table = data[0]
      for(let i = 0; i < table.length; i++) {
        roleQuestions[2].choices.push({name: table[i].department_name, value: table[i].id})
      }


  inquirer.prompt(roleQuestions)
  .then (answer => {
    connection.query(`INSERT INTO roles (title, salary, department_id)
    VALUES ("${answer.roleName}", ${answer.roleSalary}, ${answer.roleDepartment});`, (err, data) => {
        console.table(data)
        init()
    })
  })
  })
}

function addEmployee() {
  choicesLoop("SELECT * FROM roles", employeeQuestions[2].choices, true)
  choicesLoop(`SELECT first_name, last_name, id FROM employees`, employeeQuestions[3].choices, false)

  inquirer.prompt(employeeQuestions)
  .then (answer => {
    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("${answer.employeeFirstName}", "${answer.employeeLastName}", ${answer.employeeRole}, ${answer.employeeManager});`, (err, data) => {
        console.table(data)
        init()
    })
  })
}


function updateEmployee() {
  connection.promise().query(`SELECT first_name, last_name, id FROM employees`)
    .then(data => {
      const table = data[0]
      for(let i = 0; i < table.length; i++) {
        updateQuestions[0].choices.push({name: table[i].first_name + " " + table[i].last_name, value: table[i].id})
      }
  
  connection.promise().query(`SELECT * FROM roles`)
  .then(data => {
    const table = data[0]
    for(let i = 0; i < table.length; i++) {
      updateQuestions[1].choices.push({name: table[i].title, value: table[i].id})
        }

    inquirer.prompt(updateQuestions)
    .then (answer => {
      connection.query(`UPDATE employees
      SET role_id = "${answer.employeeNewRole}"
      WHERE id = ${answer.updatedEmployeeName};`)
      init()
    })
  })
  })
}

init()