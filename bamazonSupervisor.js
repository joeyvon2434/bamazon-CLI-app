var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');

//set up mysql connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "8889",
    password: "root",
    database: "bamazon"
});

//start supervisor program and establish connection

connection.connect(function (err) {
    if (err) throw err;
    supervisorStart();
});


///////////////////////////////////////
//Called Functions
///////////////////////////////////////

//Supervisor menu function
/////////////////////////////
function supervisorStart() {
    console.log("Welcome to the Supervisor Menu.\n");
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: 'What would you like to do?',
            choices: ["View product sales by department", "Create new department", "Exit"]
        }
    ]).then(function (answers) {
        if (answers.action == "View product sales by department") {
            viewDepartmentSales();
        } else if (answers.action == "Create new department") {
            newDepartment();
        } else {
            endConnection();
        }
    });
};//end supervisor start

//create new department function
//////////////////////////////
function viewDepartmentSales() {
    connection.query("SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS Sales FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id",
        function (err, response) {
            if (err) throw err;

            /*for (var i = 0; i < response.length; i++) {
                console.log("ID: " + response[i].department_id + " || Department: " + response[i].department_name + " || Overhead: $" + response[i].overhead_costs + " || Sales: $" + response[i].Sales + " || Profit: $" + (response[i].Sales - response[i].overhead_costs) + "\n");

            }*/
            calcualteProfit(response);
            console.table(response);

            supervisorStart();
        });

}; //end department sales function



//create new department function
//////////////////////////////
function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: 'department',
            message: "Please input the name of the new department.\n"
        },
        {
            type: 'input',
            name: 'overhead',
            message: 'Please input the overhead cost for the department (numeric values only).',
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
        connection.query("INSERT INTO departments SET ?",
            {
                department_name: answers.department,
                overhead_costs: answers.overhead
            },
            function (err, response) {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'action',
                        message: 'Department created. Please press enter to return to the supervisor menu.'
                    }
                ]).then(function () {
                    supervisorStart();
                });
            }
        )
    })
};

//calculate profit function
//////////////////////////////
function calcualteProfit(response) {

    for (var i = 0; i < response.length; i++) {
        response[i].Profit = response[i].Sales - response[i].overhead_costs;
    };

    return response;
};


//end connection function
//////////////////////////////
function endConnection() {
    connection.end(function (err) {
        if (err) throw err;
    });
};