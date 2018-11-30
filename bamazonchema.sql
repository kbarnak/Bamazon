DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
("'Becoming' by Michelle Obama", "book", 14.97, 288),
("Kitchenaid 7-speed Hand Mixer", "small_appliance", 54.99, 39),
("Essential Oils", "beauty_personal_care", 10.95, 66),
("Vitruvi Stone Diffuser", "home", 119.00, 34),
("'Big Magic: Creative Living Beyond Fear' by Elizabeth Gilbert", "book", 12.00, 237),
("Beats Solo 3 Wireless", "electronics", 299.95, 77),
("'Year of Yes' by Shonda Rhimes", "book", 9.69, 188),
("Kieurig K-cup Coffee Maker", "appliance", 114.99, 99)