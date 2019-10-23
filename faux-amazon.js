//require inquirer and mysql
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "J@nu@ry2",
    database: "fauxAmazon_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    // connect to the mysql server and sql database
    connection.query("SELECT * FROM items", function(err, results) {
        if (err) throw err;
        // run the start function after the connection is made to prompt the user
        console.table('Hello! Welcome to our Shop!')
        console.table('-------------------------------------------------------------------------')

        //display items for sale
        for (let i = 0; i < results.length; i++) {
            console.table("ID: " + results[i].itemID + "Item: " + results[i].itemName + "Price: " + results[i].price + "Amount in Stock: " + results[i].amountInstock + "Description: " + results[i].description);
            console.log("------------------------------------------------------------------------")
        };

        console.log(" ");
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please type in the ID of the product you would like to buy.",
                validate: function (value) {
                    if (isNaN(value) == false && parseInt(value) <= resizeBy.length && parseInt(value) > 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How much would you like to buy?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        ])
            .then(function (answer) {
                let itemPurchased = (answer.id) - 1;
                let quantityOfitems = parseInt(answer.quantity);
                let total = parseFloat(((res[itemPurchased].price) * quantityOfitems).toFixed(2));
                //check if enough is in stock
                if (res[itemPurchased].amountInstock - quantityOfitems) {
                    connection.query("UPDATE Items SET ? WHERE ?", [
                        { stockAmount: (res[itemPurchased].stockAmount - quantityOfitems) },
                        { itemID: answer.id }
                    ],
                        function (err, result) {
                            if (err) throw err;
                            console.log("Your total is $" + total.toFixed(2));
                        });

                    connection.query("SELECT * FROM Department", function (err, departmentRes) {
                        if (err) throw err;
                        var index;
                        for (var i = 0; i < departmentRes.length; i++) {
                            if (departmentRes[i].departmentname === res[itemPurchased].departmentname) {
                                index = i;
                            }
                        }
                        //update amount sold
                        connection.query("UPDATE Department SET ? WHERE?", [
                            {totalSold: departmentRes[index].totalSold + total},
                            {departmentname: res[itemPurchased].departmentname}
                        ], function(err, departmentRes){
                            if (err) throw err;
                            });
                        });

                    } else{
                        console.log("Not enough in stock, come back later.");
                    }
                    reprompt();
                })
            })
        }
        //ask if customer wants to buy something else
        function reprompt(){
            inquirer.prompt([{
                type:"confirm",
                name: "reply",
                message: "Would you like to buy something else?"
            }])
            .then(function(answer){
                if(answer.reply){
                    start();
                }
                else{
                    console.log("Thanks for visiting our store! Come Again!");
                }
            });
        }
        start();






//walk customer through buying item

//check stock amount

//update amount of items