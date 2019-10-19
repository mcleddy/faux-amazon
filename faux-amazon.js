//require inquirer and mysql
const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "J@nu@ry2",
    database: "faux_amazon_DB"
});
 
function start(){;
// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.table('Hello! Welcome to our Shop!')
    console.table('------------------------------------------------------------------------------------------------------')

    //display items for sale
    for(const i =0; i<Response.length;i++){
        console.table("ID: " + Response[i].itemID + "Item: " + Response[i].itemName + "Price: " + Response[i].price + "Amount in Stock: " +Response[i].amountInstock + "Description: " + Response[i].description);

    };

})
};





//walk customer through buying item

//check stock amount

//update amount of items