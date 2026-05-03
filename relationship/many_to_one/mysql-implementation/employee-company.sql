-- Use Case: Many employees belong to one company (Many-to-One perspective).
-- Focus: The Employee record must store the Company reference.

CREATE TABLE companies (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    industry VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    company_id INT, -- Reference on the "Many" side
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
