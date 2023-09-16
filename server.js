const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const port = process.env.PORT || 3001;
const app = express();
const mainMenu = require("./prompt");
let sql;

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

mainMenu();
