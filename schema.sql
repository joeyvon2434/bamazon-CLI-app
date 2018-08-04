CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
product_sales DECIMAL(12, 2)
);

CREATE TABLE departments (
department_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL,
overhead_costs DECIMAL(10, 2) NOT NULL
);