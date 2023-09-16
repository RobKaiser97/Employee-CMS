
const inquirer = require("inquirer");
const mysql = require("mysql2");


mainMenu = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "options",
          message: "What would you like to do?",
          choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update an employee role",
            "Remove an employee",
            "Remove a department",
            "Remove a role",
            "Exit",
          ],
        },
      ])
      .then((response) => {
        switch (response.options) {
          case "View all employees":
            viewEmployees();
            break;
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Update an employee role":
            updateRole();
            break;
          case "Remove an employee":
            removeEmployee();
            break;
          case "Remove a department":
            removeDepartment();
            break;
          case "Remove a role":
            removeRole();
            break;
          case "Exit":
            db.end();
            break;
        }
      });
  };
  
  viewEmployees = () => {
    sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
      mainMenu();
    });
  };
  
  viewDepartments = () => {
    sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
      mainMenu();
    });
  };
  
  viewRoles = () => {
    sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
      mainMenu();
    });
  };
  

  module.exports = mainMenu;