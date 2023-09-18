INSERT INTO department (name)
VALUES ('Sales'),
    ('Engineering'),
    ('HR');
INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 100000, 1),
    ('Software Engineer', 120000, 2),
    ('HR', 80000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
    ("Jane", "Smith", 2, 1),
    ("Jack", "Jackson", 3, 1),
    ("Mike", "Hunt", 2, NULL),
    ("Sally", "Ride", 3, NULL),
    ("Bob", "Barker", 1, NULL);