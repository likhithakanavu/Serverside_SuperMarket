const mongoose = require("mongoose");

const ConnectURL = "mongodb://127.0.0.1:27017/supermarkets";

const ConnectToMongoDb = async ()=>{
    try {
        await mongoose.connect(ConnectURL);
        console.log("Connection to mongo is a success");
    } catch (error) {
        console.log("Connection to mongo is Unsuccessful",error);
        
    }
};

module.exports = ConnectToMongoDb;











// NAME : Roshan Valentine Dsilva
// PROJECT TOPIC :  "DietMate: Diet-Friendly Restaurant Management"
// MODULE DESCRIPTION :      

// RESTAURANTS :               
//     Registration
//     Login
//     Manage Profile
//     Manage Employees
//     Manage Customers
//     Manage Categories
//     Manage Menus
//     Manage Orders 
//     Manage Payments 
//     View Feedback
//     View Report
//     Logout      


// CUSTOMERS :      
//     Registration
//     Login 
//     Manage Profile
//     View Menus
//     Search For Menus 
//     Filter By Categories 
//     Add To Bag
//     Add To Favourite
//     View Bag
//     View Favourite 
//     Order Menu
//     View Order list 
//     Make Payment 
//     Give Feedback 
//     Logout



