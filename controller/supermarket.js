const supermarketSchema  = require('../Model/supermarket');
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const SECRETE_KEY = "PLACEMENT";

const Superreg = async (req,res)=>{
    try {

        const { name, email,phone, password,address} = req.body;
        let checkemail = await supermarketSchema.findOne({email:email});
       
        if(checkemail){

            console.log("Email already exists!");
            res.json({success: false, message: "Email already exists"});
        }else{

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            let newSupermarket = await new supermarketSchema({
                name,
                email,
                password: hashedPassword,
                phone,
                address,
            });

            let savedUser = await newSupermarket.save();
            console.log("New user registered Successfully");
            res.json({
                success:true,
                message: " new user reqistered successfully ",
                user: savedUser,
                 
            })

        }
    } catch (error) {
        
        console.log("Error occurred", error);
        res.json({error: error})

    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        let user = await supermarketSchema.findOne({ email: email });

        if (!user) {
            // User not found
            return res.json({ success: false, message: "Invalid credential!" });
        }

        // Check user status
        if (user.status === "Reject") {
            // Status is "Reject"
            return res.json({ successs: false, message: "Rejected from admin!" });
        } else if (user.status === "Pending") {
            // Status is "Pending"
            return res.json({ successs: false, message: "Status is pending!" });
        }

        // Compare password
        let checkpass = await bcrypt.compare(password, user.password);
        if (!checkpass) {
            // Password mismatch
            return res.json({ successs: false, message: "Invalid credential!" });
        }

        // Generate token
        let userid = user._id; // Use _id to get user ID
        let token = await jwt.sign({ id: userid }, SECRETE_KEY, { expiresIn: '1h' }); // Add options for token expiration

        // Success response
        res.json({
            message: "Login Successfully",
            success: true,
            loggedInUser: user,
            userTocken: token,
        });

    } catch (error) {
        console.log("Error occurred", error);
        res.json({ success: false, message: "An error occurred.", error: error.message });
    }
};



const View = async(req,res)=>{
    try {
      
        const data = await supermarketSchema.find();
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}


const SingleView = async(req,res)=>{
    try {
        let id = req.params.id;
        const data = await supermarketSchema.findById(id);
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}


const Views = async(req,res)=>{
    try {
        let id = req.super;
        const data = await supermarketSchema.findById(id);
        console.log(data,"kkk");

        res.json(data);
        console.log(data,"gagaggggagga")
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}

const Supermarket = async(req,res)=>{
    try {
        const uid = req.user;
        const data = await supermarketSchema.findById(uid);
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}






const Delete  = async(req,res)=>{

    try {

        let data  = await supermarketSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await supermarketSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully...");
            res.json({"Success":true, "Deleted Data":data})
        }
        
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}

const Update = async (req, res)=>{

    try {
    let id = req.params.id;
   
    let Statusdata = await supermarketSchema.findById(id);
  
    if(!Statusdata){
        return res.json({ success: false, message: "Data is not found" })
    }
    let action = req.body.action;
    if (action === "Accept") {
        status = action ;
    } else if (action === "Reject") {
        status = action ;
    } else {
        return res.json({ success: false, message: "Invalid action" });
    }
   
    let newData = {}
    if(status){newData.status = status}

    let updatestatus = await supermarketSchema.findByIdAndUpdate(id,  { $set: newData }, { new: true })
    res.json({ success: true, updatestatus })
   
    
    } catch (error) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(error)
        
    }

}

const Updateprofile = async (req, res) => {
    try {
        console.log(req.body, "Request body update");
        let id = req.params.id;

        const { name, email, phone, address } = req.body;
        console.log(req.body, "req.bodyyyy");

        let Statusdata = await supermarketSchema.findById(id);
        if (!Statusdata) {
            return res.json({ success: false, message: "Data is not found" });
        }

        let newData = {};
        if (name) { newData.name = name; }
        if (email) { newData.email = email; }
        if (phone) { newData.phone = phone; }
        if (address) { newData.address = address; }

        let updatestatus = await supermarketSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
        res.json({ success: true, updatestatus });

    } catch (error) {
        res.json({ success: false, message: "Internal server error!!!" });
        console.log(error);
    }
};


module.exports={
    Superreg, Login, View,Supermarket, Delete, Update,Views,Updateprofile,SingleView
}