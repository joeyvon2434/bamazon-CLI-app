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
    ]).then(function (answers) {
        if (answers.password == 'management') {
            showManagerChoices();
        } else {
            console.log('Seriously?!? I just told you what the password was. OK, maybe you just made a typing error...')
            managerStart();
        }
    });
}; // end manager start


//home screen for the manager that allows the user to choose which information to see
//////////////////////////////
function showManagerChoices() {
    console.log("\nWelcome to the Management Database!\n");
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'selection',
            message: "Please choose an option below.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function (answers) {
        if (answers.selection == "View Products for Sale") {
            viewInventory();
        } else if (answers.selection == "View Low Inventory") {
            lowInventory();
        } else if (answers.selection == "Add to Inventory") {
            addInventory();
        } else if (answers.selection == "Add New Product") {
            addNewProduct();
        } else {
            endConnection();
        }
    });
};

//function to view products
//////////////////////////////
function viewInventory() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        console.log('\n');
        for (var i = 0; i < response.length; i++) {
            console.log("ID: " + response[i].item_id + " || Product: " + response[i].product_name + " || Price: $" + response[i].price + " || Current Stock: " + response[i].stock_quantity + '\n');
        }
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'home',
                message: 'Choose Return to Home Screen or Exit.',
                choices: ['Home', "Exit"]
            }
        ]).then(function (answers) {
            if (answers.home == 'Home') {
                showManagerChoices();
            } else {
                endConnection();
            }
        });
    });
}; //end view inventory function


//View Low inventory function
//////////////////////////////
function lowInventory() {
    console.log('The following poducts have less than 5 units remaining in stock. Consider adding to inventory.');
    connection.query(
        "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5",
        function (err, response) {
            if (err) throw err;
            console.log('\n');
            for (var i = 0; i < response.length; i++) {
                console.log("ID: " + response[i].item_id + " || Product: " + response[i].product_name + " || Current Stock: " + response[i].stock_quantity + '\n');
            };
            inquirer.prompt([
                {
                    type: 'rawlist',
                    name: 'action',
                    message: 'Please select what you would like to do.',
                    choices: ["Add products to inventory", "Return to the Management Home Menu", "Exit"]
                }
            ]).then(function (answers) {
                if (answers.action == "Add products to inventory") {
                    addInventory();
                } else if (answers.action == "Return to the Management Home Menu") {
                    showManagerChoices();
                } else {
                    endConnection();
                }
            })
        }
    )
}; //end low inventory function


//end connection function
//////////////////////////////
function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemChoice",
            message: "Please type the ID of the product to which you would like to add inventory.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('\nPlease input a numeric value.');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('\nPlease input a numeric value.');
                    return false;
                }
            }
        }
    ]).then(function(answers) {
        connection.query("SELECT * FROM products",
        function(err, response) {
            if (err) throw err;
            checkStock(response, answers);
        }
    )
    });
};//end add inventory function

//Function checks the stock for the item the user wants add to ensure a proper item is selected
//////////////////////////////
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
    //ensures that the customer has chosen a valid item
    if (chosenItem.item_id !== 'invalid item') {
            chosenItem.stock_quantity = parseFloat(chosenItem.stock_quantity) + parseFloat(answers.quantity);
            updateProductTable(chosenItem);
        
    } else {
        console.log('You must select a valid item.')
        lowInventory();
    }
}; //end check stock function


//Update product table function
//////////////////////////////
function updateProductTable(chosenItem) {
    connection.query(
        'UPDATE products SET stock_quantity = ? WHERE item_id = ?',
        [chosenItem.stock_quantity, chosenItem.item_id],
        function(err, response) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "action",
                    message: "Inventory increased. What would you like to do?",
                    choices: ["Return to home menu","Add more inventory", "Exit"]
                }
            ]).then(function(answers) {
                if (answers.action == "Return to home menu") {
                    showManagerChoices();
                } else if (answers.action == "Add more inventory") {
                    addInventory();
                } else {
                    connection.end(function(err) {
                        if (err) throw err;
                    });
                }
            });
        }
    )
};//end update product table function


function addNewProduct() {
    var results = [];
                connection.query("SELECT * FROM departments", function(err, response) {
                    if (err) throw err;
                    results = response;
                });
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "Please enter a product name"
        },
        {
            type: "rawlist",
            name: "department_name",
            message: "Please choose a department for this item",
            //choices: ["Electronics", "Games", "Furniture", "Produce"],
            choices: function() {
                var choiceArray = [];
                
                console.log(results);
                for (var i = 0 ; i < results.length; i++) {
                    choiceArray.push(results[i].department_name);
                }
                return choiceArray;
            }
        },
        {
            type: "input",
            name: "price",
            message: "Please enter a price for the new product.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('\nPlease input a numeric value.');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "Please enter a quantity of the new item to stock.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log('\nPlease input a numeric value.');
                    return false;
                }
            }
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO products SET ?",
        {
            product_name: answers.product_name,
            department_name: answers.department_name,
            price: answers.price,
            stock_quantity: answers.stock_quantity,
            product_sales: 0
        },
        function(err, response) {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "action",
                    message: "Product added to store. What would you like to do?",
                    choices: ["Return to home menu","Add more products", "Exit"]
                }
            ]).then(function(answers) {
                if (answers.action == "Return to home menu") {
                    showManagerChoices();
                } else if (answers.action == "Add more products") {
                    addNewProduct();
                } else {
                    connection.end(function(err) {
                        if (err) throw err;
                    });
                }
            });
        }
    )
    });
};


//end connection function
//////////////////////////////
function endConnection() {
    connection.end(function (err) {
        if (err) throw err;
    });
};