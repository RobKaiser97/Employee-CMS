INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 100000, (SELECT id FROM department WHERE name = 'Sales')),
('Software Engineer', 120000, (SELECT id FROM department WHERE name = 'Engineering')),
('HR Manager', 80000, (SELECT id FROM department WHERE name = 'HR'));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', (SELECT id FROM role WHERE title = 'Sales Manager'), NULL),
('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Software Engineer'), NULL),
('Emily', 'Johnson', (SELECT id FROM role WHERE title = 'HR Manager'), (SELECT id FROM employee WHERE first_name = 'John' AND last_name = 'Doe'));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Brown', (SELECT id FROM role WHERE title = 'Sales Manager'), (SELECT id FROM employee WHERE first_name = 'John' AND last_name = 'Doe')),
('Bob', 'Green', (SELECT id FROM role WHERE title = 'Software Engineer'), (SELECT id FROM employee WHERE first_name = 'Jane' AND last_name = 'Smith')),
('Charlie', 'White', (SELECT id FROM role WHERE title = 'HR Manager'), (SELECT id FROM employee WHERE first_name = 'Emily' AND last_name = 'Johnson'));
