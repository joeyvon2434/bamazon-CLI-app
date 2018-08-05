var inquirer = require('inquirer');
var mysql = require('mysql');

//set up MySQL connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "8889",
    password: "root",
    database: "bamazon"
});

//start the manager program

connection.connect(function (err) {
    if (err) throw err;
    managerStart();
});


///////////////////////////////////////
//Called Functions
///////////////////////////////////////

//starts program and propmts for a password
function managerStart() {
    console.log('\nWelcome to the Bamazon Inventory Monitoring System!');
    console.log("\nWe are serious about security at Bamazon.\n");

    inquirer.prompt([
        {
            type: 'password',
            name: "password",
            mask: '*',
            message: "Please enter the management password. (Hint: The password is management)\n"
        }
    ]).then(function(answers) {
        if (answers.password == 'management') {
            showManagerChoices();
        } else {
            console.log('Seriously?!? I just told you what the password was. OK, maybe you just made a typing error...')
            managerStart();
        }
    });
}; // end manager start


function showManagerChoices() {
    console.log("\nWelcome to the Management Database!\n");
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'selection',
            message: "Please choose an option below.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function(answers) {
        if (answers.selection == "View Products for Sale") {
            console.log("View Products")
        } else if (answers.selection == "View Low Inventory") {
            console.log("Low inventory view");
        } else if (answers.selection =="Add to Inventory") {
            console.log('Add inventory');
        } else if (answers.selection == "Add New Product") {
            console.log("Add new product");
        } else {
            connection.end(function(err) {
                if (err) throw err;
            });
        }
    });
};
