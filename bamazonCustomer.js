// Dependencies: NPM mySQL, inquirer, cli-table
const mysql = require("mysql");
const Table = require("cli-table");
const inquirer = require("inquirer");
// Give Table a value with preset column size
const table = new Table({
    head: ['Item ID', 'Item Name', 'Department', 'Price', 'Quantity'],
    colWidths: [20, 40, 25, 15, 15]
});

// Connection data:
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

// Establish Connection
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id:' + connection.threadId);
    displayInventory()
});

//================Inventory=================//
// This function retrieves the current inventory from bamazonDB and displays it in the Cli-table format
function displayInventory() {

    connection.query('SELECT * FROM Products', function (err, res) {
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity])
        };
        console.log(table.toString(res));
        shopInventory();


        //================Inquirer=================//
        function shopInventory() {

            inquirer.prompt([{
                name: "itemId",
                type: "input",
                message: "What is the item ID you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }, {
                name: "quantity",
                type: "input",
                message: "How many of this item would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }]).then(function (answer) {
                var chosenId = answer.itemId - 1
                var chosenProduct = res[chosenId]
                var chosenQuantity = answer.stock_quantity
                if (chosenQuantity < res[chosenId].stock_quantity) {
                    console.log("Your total for " + "(" + chosenQuantity + ")" + " - " + res[chosenId].product_name + " is: " + res[chosenId].price * chosenQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        StockQuantity: res[chosenId].stock_quantity - chosenQuantity
                    }, {
                        id: chosenProduct.id
                    }], function (err, res) {
                        const totalCost = chosenQuantity * res[0].price;
                        const sales = `UPDATE products SET product_sales = product_sales + ${totalCost} WHERE id = ${chosenId}`;

                        console.log(`\nTotal cost: $ ${totalCost}\n`);

                        addSales(sales);
                        shopInventory();
                    });
                } else {
                    console.log("Insufficient quantity. We only have " + res[chosenId].stock_quantity + " in our inventory.");
                    shopInventory();
                }

            });

        };
    });
};
//Customer can search item based on id DONE
//Cutomer can purchase item and have the total $ amount displayed
//Inventory is updated to reduce by the number of products 

