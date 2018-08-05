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


//start program and start MySQL connection

connection.connect(function (err) {
    if (err) throw err;
    bamazonStart();
});


///////////////////////////////////////
//Called Functions
///////////////////////////////////////

//function provides a welcom screen to Bamazon to display only on initial load
function bamazonStart() {
    console.log('---------------------------\nWelcome to Bamazon!\n---------------------------');
    getChoices();
};


//Function serves as the home for the customer and displays the items they can choose to purchase
function getChoices() {

    //get list of items from database (data retutrn as an array of objects with each column from the products table as a property)
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;

        //display a list of the items with name, price, and quantity
        for (var i = 0; i < response.length; i++) {
            console.log("ID: " + response[i].item_id + " || Product: " + response[i].product_name + " || Price: $" + response[i].price + " || Current Stock: " + response[i].stock_quantity + '\n')
        };

        //prompt user for the item they would like to purchase
        inquirer.prompt([
            {
                type: "input",
                name: "itemChoice",
                message: "Please type the ID of a product you would like to purchase.",
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        console.log('\nPlease input a numeric value.');
                        return false;
                    }
                }
            }
        ]).then(function (answers) {
            checkStock(response, answers);
        });

    }); // end connection query

}; //end get choices function


//Function checks the stock for the item the user wants to purchase and ensures sufficient quantities are available
function checkStock(response, answers) {
    var chosenItem = {
        item_id: 'invalid item'
    };

    //match user choice with the correct item
    for (var i = 0; i < response.length; i++) {
        if (answers.itemChoice == response[i].item_id) {
            chosenItem = response[i];
        }
    }

    if (chosenItem.item_id !== 'invalid item') {
        console.log('Item: ');
        console.log(chosenItem);
    } else {
        console.log('You must select a valid item.')
        getChoices();
    }
}; //end check stock function