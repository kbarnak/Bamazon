
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
    database: "TOP1000Songs_DB",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

//Establish Connection
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
});