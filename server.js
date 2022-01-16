const inquirer = require("inquirer")
const { initialQuestion, departmentQuestion, roleQuestions, employeeQuestions, updateQuestions } = require("./db/questions")
const cTable = require("console.table")
const mysql = require("mysql2")
require('dotenv').config()

