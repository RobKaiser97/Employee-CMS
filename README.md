# Employee CMS (Company Management System)
 
<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" width="100">
</div>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
Interactive command line based prompt to allow for personnel management. Upon launch of the system, users are presented with multiple options:

Overview
- **View All Departments, Roles, and Employees:** Allows for veiwing of all employees in the database, available roles, and departments inside the company.
      Any option selected will return available data in a table with all information relevant to the option selected.

Data Insertion/Deletion
- **Add New Department:** Create new departments to be added to the database.

- **Add New Role:** Add a role by providing the Title of the role, its salary, and the department it falls under.

- **Add New Employee:** Provide a first name, last name, role, and a manager (if applicable).

- **Remove Departments, Roles, and Employees:** Delete data that is no longer relevant.

Data Modification
- **Update Employee Role:** Select an employee by name and update their role.

## Installation

# Clone the repository to your local machine

```sh
git clone https://github.com/RobKaiser97/Employee-CMS.git
```
> The HTTPS cloning is utilized here. SSH and Github CLI are also available
# Create a .env file in the root of the repository
```sh
host = "your-username"
password = "your-password"
```
> Utilize this format for your MySQL username and password

Install dependencies and start the local server

```sh
npm i && node server.js
```
> Some terminals may not support the use of "&&", try using "&" or just run as two separate commands

# Initialize MySQL database

Log into mysql on local machine than enter password

```sh
mysql -u your-username -p
```
> Enter your password when prompted

Add the schema.sql to create the database structure

```sh
SOURCE schema.sql;
```

Add the seeds.sql to populate the database

```sh
SOURCE seeds.sql;
```

## Usage

Click the movie [🎬](https://drive.google.com/file/d/1O9zcQ5C5Dd6a6eyiqgllSI1N9hz-ZNF_/view) to view a demonstration of the application!

## License

This project is licensed under the terms of the **[MIT License](https://opensource.org/licenses/MIT)**

## Contributing

Robert Kaiser

## Tests

N/A

## Questions

If you have any questions or suggestions about this project, please feel free to contact me:

- GitHub: [@RobKaiser97](https://github.com/RobKaiser97)
- Email: kaiserrobert1997@gmail.com
