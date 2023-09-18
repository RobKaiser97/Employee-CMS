require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");


// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.host,
    password: process.env.password,
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`),
);

db.connect((err) => {
  if (err) throw err;
  mainMenu();
});

const mainMenu = () => {
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

const viewEmployees = () => {
  sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    mainMenu();
  });
};

const viewDepartments = () => {
  sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    mainMenu();
  });
};

const viewRoles = () => {
  sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    mainMenu();
  });
};

const addEmployee = () => {
  let getMan =
  `SELECT manager_id, first_name, last_name FROM employee WHERE manager_id IS NOT NULL;`;
  let getRole =
  `SELECT id, title FROM role;`;

  // db query to get all managers and map them into a variable to pass to the inquirer prompt
  const getManPromise = new Promise((resolve, reject) => {
  db.query(getMan, (err, rows) => {
    if (err) {
      reject(err);
    }
    resolve(rows.map(({ manager_id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      id: `${manager_id}`
    })));
  });
  });
  // db query to get all roles and map them into a variable to pass to the inquirer prompt
  const getRolePromise = new Promise((resolve, reject) => {
  db.query(getRole, (err, rows) => {
    if (err) {
      reject(err);
    }
    resolve(rows.map(({ id, title }) => ({
      name: `${title}`,
      id: `${id}`
    })));
  });
  });
// Use Promise.all to wait for all promises to resolve
// Use Promise.all to wait for all promises to resolve
Promise.all([getManPromise, getRolePromise])
.then(([managerChoices, roleChoices]) => {
  // Run the Inquirer prompt after the database queries have completed
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: [...managerChoices, "None"],
      },
    ])
    .then((response) => {
      let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      let manager_id = response.manager_id === "None" ? null : response.manager_id;
      db.query(
        sql,
        [
          response.first_name,
          response.last_name,
          response.role_id,
          manager_id,
        ],
        (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.table(rows);
          mainMenu();
        }
      );
    });
})
.catch(err => console.log(err));
};

const addRole = () => {
  // db query to get all employees to pass to the inquirer prompt
  db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      id: id,
    }));
  });
  // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
  inquirer
    .prompt([
      {
        type: "choice",
        name: "employee",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices,
      },
    ])
    .then((response) => {
      inquirer
        .prompt([
          {
            type: "choice",
            name: "role",
            message: "What is the employee's new role?",
            choices: [
              "Sales Lead",
              "Salesperson",
              "Lead Engineer",
              "Software Engineer",
              "Account Manager",
              "Accountant",
              "Legal Team Lead",
              "Lawyer",
            ],
          },
        ])
        .then((response) => {
          sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
          db.query(sql, [response.role, response.employee], (err, rows) => {
            if (err) {
              console.log(err);
            }
            console.table(rows);
            mainMenu();
          });
        });
    });
};

const updateRole = () => {
  // db query to get all employees to pass to the inquirer prompt
  db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      id: id,
    }));
  });
  // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
  inquirer
    .prompt([
      {
        type: "choice",
        name: "employee",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices,
      },
    ])
    .then((response) => {
      inquirer
        .prompt([
          {
            type: "choice",
            name: "role",
            message: "What is the employee's new role?",
            choices: [
              "Sales Lead",
              "Salesperson",
              "Lead Engineer",
              "Software Engineer",
              "Account Manager",
              "Accountant",
              "Legal Team Lead",
              "Lawyer",
            ],
          },
        ])
        .then((response) => {
          sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
          db.query(sql, [response.role, response.employee], (err, rows) => {
            if (err) {
              console.log(err);
            }
            console.table(rows);
            mainMenu();
          });
        });
    });
};

const removeEmployee = () => {
  // db query to get all employees to pass to the inquirer prompt
  db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      id: id,
    }));
  });
  // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
  inquirer
    .prompt([
      {
        type: "choice",
        name: "employee",
        message: "Which employee would you like to remove?",
        choices: employeeChoices,
      },
    ])
    .then((response) => {
      sql = `DELETE FROM employees WHERE id = ?`;
      db.query(sql, [response.employee], (err, rows) => {
        if (err) {
          console.log(err);
        }
        console.table(rows);
        mainMenu();
      });
    });
};

const removeDepartment = () => {
  // db query to get all departments to pass to the inquirer prompt
  db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    const departmentChoices = rows.map(({ id, department_name }) => ({
      name: `${department_name}`,
      id: id,
    }));
  });
  // pass the departmentChoices array to the inquirer prompt to allow user to select a department to remove
  inquirer
    .prompt([
      {
        type: "choice",
        name: "department",
        message: "Which department would you like to remove?",
        choices: departmentChoices,
      },
    ])
    .then((response) => {
      sql = `DELETE FROM departments WHERE id = ?`;
      db.query(sql, [response.department], (err, rows) => {
        if (err) {
          console.log(err);
        }
        console.table(rows);
        mainMenu();
      });
    });
};

const removeRole = () => {
  // db query to get all roles to pass to the inquirer prompt
  db.query(`SELECT * FROM role`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    const roleChoices = rows.map(({ id, title }) => ({
      name: `${title}`,
      id: id,
    }));
  });
  // pass the roleChoices array to the inquirer prompt to allow user to select a role to remove
  inquirer
    .prompt([
      {
        type: "choice",
        name: "role",
        message: "Which role would you like to remove?",
        choices: roleChoices,
      },
    ])
    .then((response) => {
      sql = `DELETE FROM role WHERE id = ?`;
      db.query(sql, [response.role], (err, rows) => {
        if (err) {
          console.log(err);
        }
        console.table(rows);
        mainMenu();
      });
    });
};