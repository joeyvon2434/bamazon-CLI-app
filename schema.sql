DROP DATABASE IF EXISTS bamazon;

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


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Settlers of Catan", "Games", 34.99, 50), ("iPhone X", "Electronics", 899.99, 100), ("Leather Couch", "Furniture", 499.50, 10), ("Apples", "Produce", 0.79, 500), ("Oranges", "Produce", 0.89, 350), ("Bang: The Dice Game", "Games", 19.99, 25), ("8 Seat Wooden Table", "Furniture", 699.50, 7), ("Nintendo Switch", "'Electronis", 299.99, 50),  ("Pears", "Produce", 0.85, 300);


INSERT INTO departments (department_name, overhead_costs)
VALUE ("Games", 24000), ("Electronics", 45000), ("Furniture", 36000), ("Produce", 15000);