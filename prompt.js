// const inquirer = require("inquirer");
// const mysql = require("mysql2");
// let sql;

// const mainMenu = () => {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "options",
//         message: "What would you like to do?",
//         choices: [
//           "View all employees",
//           "View all departments",
//           "View all roles",
//           "Add an employee",
//           "Add a department",
//           "Add a role",
//           "Update an employee role",
//           "Remove an employee",
//           "Remove a department",
//           "Remove a role",
//           "Exit",
//         ],
//       },
//     ])
//     .then((response) => {
//       switch (response.options) {
//         case "View all employees":
//           viewEmployees();
//           break;
//         case "View all departments":
//           viewDepartments();
//           break;
//         case "View all roles":
//           viewRoles();
//           break;
//         case "Add an employee":
//           addEmployee();
//           break;
//         case "Add a department":
//           addDepartment();
//           break;
//         case "Add a role":
//           addRole();
//           break;
//         case "Update an employee role":
//           updateRole();
//           break;
//         case "Remove an employee":
//           removeEmployee();
//           break;
//         case "Remove a department":
//           removeDepartment();
//           break;
//         case "Remove a role":
//           removeRole();
//           break;
//         case "Exit":
//           db.end();
//           break;
//       }
//     });
// };

// viewEmployees = () => {
//   sql = `SELECT * FROM employee`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(rows);
//     mainMenu();
//   });
// };

// viewDepartments = () => {
//   sql = `SELECT * FROM departments`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(rows);
//     mainMenu();
//   });
// };

// viewRoles = () => {
//   sql = `SELECT * FROM role`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(rows);
//     mainMenu();
//   });
// };

// addEmployee = () => {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "first_name",
//         message: "What is the employee's first name?",
//       },
//       {
//         type: "input",
//         name: "last_name",
//         message: "What is the employee's last name?",
//       },
//       {
//         type: "option",
//         name: "role_id",
//         message: "What is the employee's role?",
//         choices: [
//           "Sales Lead",
//           "Salesperson",
//           "Lead Engineer",
//           "Software Engineer",
//           "Account Manager",
//           "Accountant",
//           "Legal Team Lead",
//           "Lawyer",
//         ],
//       },
//       {
//         type: "validate",
//         name: "manager_id",
//         message: "Does the employee have a manager?",
//         choices: ["Yes", "No"],
//       },
//     ])
//     .then((response) => {
//       sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
//       db.query(
//         sql,
//         [
//           response.first_name,
//           response.last_name,
//           response.role_id,
//           response.manager_id,
//         ],
//         (err, rows) => {
//           if (err) {
//             console.log(err);
//           }
//           console.table(rows);
//           mainMenu();
//         }
//       );
//     });
// };

// addRole = () => {
//   // db query to get all employees to pass to the inquirer prompt
//   db.query(`SELECT * FROM employees`, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
//       name: `${first_name} ${last_name}`,
//       id: id,
//     }));
//   });
//   // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
//   inquirer
//     .prompt([
//       {
//         type: "choice",
//         name: "employee",
//         message: "Which employee's role would you like to update?",
//         choices: employeeChoices,
//       },
//     ])
//     .then((response) => {
//       inquirer
//         .prompt([
//           {
//             type: "choice",
//             name: "role",
//             message: "What is the employee's new role?",
//             choices: [
//               "Sales Lead",
//               "Salesperson",
//               "Lead Engineer",
//               "Software Engineer",
//               "Account Manager",
//               "Accountant",
//               "Legal Team Lead",
//               "Lawyer",
//             ],
//           },
//         ])
//         .then((response) => {
//           sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
//           db.query(sql, [response.role, response.employee], (err, rows) => {
//             if (err) {
//               console.log(err);
//             }
//             console.table(rows);
//             mainMenu();
//           });
//         });
//     });
// };

// updateRole = () => {
//   // db query to get all employees to pass to the inquirer prompt
//   db.query(`SELECT * FROM employees`, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
//       name: `${first_name} ${last_name}`,
//       id: id,
//     }));
//   });
//   // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
//   inquirer
//     .prompt([
//       {
//         type: "choice",
//         name: "employee",
//         message: "Which employee's role would you like to update?",
//         choices: employeeChoices,
//       },
//     ])
//     .then((response) => {
//       inquirer
//         .prompt([
//           {
//             type: "choice",
//             name: "role",
//             message: "What is the employee's new role?",
//             choices: [
//               "Sales Lead",
//               "Salesperson",
//               "Lead Engineer",
//               "Software Engineer",
//               "Account Manager",
//               "Accountant",
//               "Legal Team Lead",
//               "Lawyer",
//             ],
//           },
//         ])
//         .then((response) => {
//           sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
//           db.query(sql, [response.role, response.employee], (err, rows) => {
//             if (err) {
//               console.log(err);
//             }
//             console.table(rows);
//             mainMenu();
//           });
//         });
//     });
// };

// removeEmployee = () => {
//   // db query to get all employees to pass to the inquirer prompt
//   db.query(`SELECT * FROM employees`, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
//       name: `${first_name} ${last_name}`,
//       id: id,
//     }));
//   });
//   // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
//   inquirer
//     .prompt([
//       {
//         type: "choice",
//         name: "employee",
//         message: "Which employee would you like to remove?",
//         choices: employeeChoices,
//       },
//     ])
//     .then((response) => {
//       sql = `DELETE FROM employees WHERE id = ?`;
//       db.query(sql, [response.employee], (err, rows) => {
//         if (err) {
//           console.log(err);
//         }
//         console.table(rows);
//         mainMenu();
//       });
//     });
// };

// removeDepartment = () => {
//   // db query to get all departments to pass to the inquirer prompt
//   db.query(`SELECT * FROM departments`, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     const departmentChoices = rows.map(({ id, department_name }) => ({
//       name: `${department_name}`,
//       id: id,
//     }));
//   });
//   // pass the departmentChoices array to the inquirer prompt to allow user to select a department to remove
//   inquirer
//     .prompt([
//       {
//         type: "choice",
//         name: "department",
//         message: "Which department would you like to remove?",
//         choices: departmentChoices,
//       },
//     ])
//     .then((response) => {
//       sql = `DELETE FROM departments WHERE id = ?`;
//       db.query(sql, [response.department], (err, rows) => {
//         if (err) {
//           console.log(err);
//         }
//         console.table(rows);
//         mainMenu();
//       });
//     });
// };

// removeRole = () => {
//   // db query to get all roles to pass to the inquirer prompt
//   db.query(`SELECT * FROM role`, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     const roleChoices = rows.map(({ id, title }) => ({
//       name: `${title}`,
//       id: id,
//     }));
//   });
//   // pass the roleChoices array to the inquirer prompt to allow user to select a role to remove
//   inquirer
//     .prompt([
//       {
//         type: "choice",
//         name: "role",
//         message: "Which role would you like to remove?",
//         choices: roleChoices,
//       },
//     ])
//     .then((response) => {
//       sql = `DELETE FROM role WHERE id = ?`;
//       db.query(sql, [response.role], (err, rows) => {
//         if (err) {
//           console.log(err);
//         }
//         console.table(rows);
//         mainMenu();
//       });
//     });
// };

// module.exports = mainMenu;
