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
("'Becoming' by Michelle Obama", "Book", 14.97, 188),
("Kitchenaid 7-speed Hand Mixer", "Small Appliance", 54.99, 39),
("Essential Oils", "Beauty/Personal Care", 10.95, 16),
("Vitruvi Stone Diffuser", "Home", 119.00, 34),
("'Big Magic: Creative Living Beyond Fear' by Elizabeth Gilbert", "Book", 12.00, 137),
("Beats Solo 3 Wireless", "Electronics", 299.95, 77),
("'Year of Yes' by Shonda Rhimes", "Book", 9.69, 132),
("Keurig K-cup Coffee Maker", "Appliance", 114.99, 43),
("Schwinn Upright Bike", "Sports & Outdoors", 279.98, 51),
("Fire TV Stick with Alexa", "Electronics", 39.99, 125)