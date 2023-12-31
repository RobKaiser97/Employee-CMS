require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");


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
  figlet("Employee Tracker", (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("Welcome to the Employee Tracker!");

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
            updateEmployeeRole();
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
  });
};

const viewEmployees = () => {
  sql = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee
  LEFT JOIN employee AS m ON employee.manager_id = m.id
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id`;
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
  sql = `SELECT r.id, r.title AS role, r.salary, d.name AS department FROM role r LEFT JOIN department d ON r.department_id = d.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department's name?",
      },
    ])
    .then((response) => {
      let sql = `INSERT INTO department (name) VALUES (?)`;
      db.query(sql, [response.name], (err, rows) => {
        if (err) {
          console.log(err);
        }
        console.log(`Department ${response.name} added successfully!`);
        mainMenu();
      });
    });
}

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
        choices: roleChoices.map(choice => { return {name: choice.name, value: choice.id}}),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who is the employee's manager?",
        choices: [...managerChoices.map(choice => { return {name: choice.name, value: choice.id}}), "None"],
      },
    ])
    .then((response) => {
      let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
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
          console.log(`Employee ${response.first_name} ${response.last_name} added successfully!`);
          mainMenu();
        }
      );
    });
})
.catch(err => console.log(err));
};

const addRole = () => {
  // Query is selecting all rows from the department table
   db.query(`SELECT * from department`, (err, rows) => {
     if (err) throw err;

     const departmentOptions = rows.map((department) => ({
       name: department.name,
       value: department.id
     }));

     inquirer
       .prompt([
         {
           type: "input",
           name: "role",
           message: "What is the role called?",
         },
         {
           type: "input",
           name: "salary",
           message: "What is this roles salary?",
         },
         {
           type: "list",
           name: "department_id",
           message: "What department does this role fall under?",
           choices: departmentOptions,
         },
       ])
       .then((res) => {

         //Query is inserting the newly created role into the department table
         db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
         [res.role, res.salary, res.department_id],
         (err, result) => {
           if (err) throw err;

           console.log(
             `Added Role: ${res.role} Salary: ${res.salary} Department: ${departmentOptions.find(
               (department) => department.value === res.department_id
             ).name
           }`
           );
         }
       );
         viewRoles();
         mainMenu();
       });
   });
 };

const updateEmployeeRole = () => {

  // Collecting information from the employee table
  const getEmployeeList = `SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM employee`;

  const getRoleList = `SELECT id, title FROM role`;

  //Query is passing the information we collected in getEmployeeList
  db.query(getEmployeeList, (err, employees) => {
    if (err) throw err;

    // Query is passing the information we collected in getRoleList
    db.query(getRoleList, (err, roles) => {
      if (err) throw err;

      const employeeOptions = employees.map((employee) => ({
        name: employee.employee_name,
        value: employee.id,
      }));

      const roleOptions = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee are you updating?",
            choices: employeeOptions,
          },
          {
            type: "list",
            name: "role",
            message: "What role will this employee be assigned to?",
            choices: roleOptions,
          },
        ])
        .then((res) => {
          db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
          [res.role, res.employee], (err, result) => {
            if (err) throw err;

            const chosenEmployee = employees.find(
              (employee) => employee.id === res.employee
            );

            const chosenRole = roles.find((role) => role.id === res.role);
            console.log(
              `UPDATED employee ${chosenEmployee.employee_name} with role ${chosenRole.title}`
            );
            viewEmployees();
          });
        });
    });
  });
};

const removeEmployee = () => {
  // db query to get all employees to pass to the inquirer prompt
  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM employee`, (err, employees) => {
    if (err) {
      console.log(err);
    }
    const employeeChoices = employees.map((employee) => ({
      name: employee.employee_name,
      value: employee.id,
    }));

    // pass the employeeChoices array to the inquirer prompt to allow user to select an employee to update
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee would you like to remove?",
          choices: employeeChoices,
        },
      ])
      .then((response) => {
        const sql = `DELETE FROM employee WHERE id = ?`;
        db.query(sql, [response.employee], (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.table(rows);
          mainMenu();
        });
      });
  });
};

const removeDepartment = () => {
  // db query to get all departments to pass to the inquirer prompt
  db.query(`SELECT id, name FROM department`, (err, departments) => {
    if (err) {
      console.log(err);
    }
    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    // pass the departmentChoices array to the inquirer prompt to allow user to select a department to remove
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department would you like to remove?",
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        const sql = `DELETE FROM department WHERE id = ?`;
        db.query(sql, [response.department], (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.table(rows);
          mainMenu();
        });
      });
  });
};

const removeRole = () => {
  // db query to get all roles to pass to the inquirer prompt
  db.query(`SELECT id, title FROM role`, (err, roles) => {
    if (err) {
      console.log(err);
    }
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    // pass the roleChoices array to the inquirer prompt to allow user to select a role to remove
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Which role would you like to remove?",
          choices: roleChoices,
        },
      ])
      .then((response) => {
        const sql = `DELETE FROM role WHERE id = ?`;
        db.query(sql, [response.role], (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.table(rows);
          mainMenu();
        });
      });
  });
};
