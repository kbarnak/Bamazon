
const mysql = require("mysql");
const table = require("table").table;
const inquirer = require("inquirer");

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

//Establish Connection
connection.connect(function (err) {
    if (err) throw err;
    // console.log('connected as id:' + connection.threadId);
    startDirections();
});

//================Inquirer INTRO=================//
function startDirections() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true

    }]).then(function (user) {
        if (user.confirm === true) {
            displayInventory();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}
//================Inventory=================//
// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
    // console.log('___ENTER displayInventory___');

    // Construct the db query string
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var emptyInventory = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(emptyInventory);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompt the user for item/quantity they would like to purchase
        userPurchase();
    })
}
//Customer can search item based on id
//Cutomer can purchase item and have the total $ amount displayed
//Inventory is updated to reduce by the number of products purchased
