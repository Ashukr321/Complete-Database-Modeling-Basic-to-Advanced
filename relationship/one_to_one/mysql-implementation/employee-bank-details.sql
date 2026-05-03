-- Use Case: Separating sensitive data (Bank Details) from general employee information.
-- Goal: Enhanced security and access control.

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department VARCHAR(50),
    position VARCHAR(50),
    hire_date DATE
);

CREATE TABLE bank_details (
    bank_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT UNIQUE NOT NULL, -- Ensures one set of bank details per employee
    account_number VARCHAR(20) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    account_holder_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
