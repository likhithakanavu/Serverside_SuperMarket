const { json } = require('express');
const productSchema = require('../Model/product');

const Insert = async (req, res) => {
  try {
      console.log(req.body, "hhhhhh");
      const { name, c_id, qty, unit, price, stock, description } = req.body;
      console.log(c_id, "mmmmmmm");

      const image = req.file.filename;
      const sid = req.super;

      console.log(req.super, "super");
      console.log(sid, "superiii");

      // Check if the product already exists
      const existingProduct = await productSchema.findOne({ name, c_id });

      if (existingProduct) {
          // If the product exists, return an error response
          console.log("Product already exists");
          return res.status(400).json({ success: false, message: "Product already exists" });
      }

      // Proceed with inserting the new product
      const data = new productSchema({ name, c_id, qty, unit, price, stock, description, image, s_id: sid.id });
      const savedata = await data.save();

      console.log("Insertion Successful");
      const success = "success";
      res.send({ "Insertion Success": true, data: savedata, success: success });

  } catch (error) {
      console.error("Some error Occurred: " + error);
      res.status(500).json({ error: "Some internal error!!!" });
  }
};


const View = async(req,res)=>{
  console.log("hi")
    try {
        const sid = req.super
        console.log(sid,"sss")
        const data = await productSchema.find({s_id:sid.id}).populate('c_id');
        console.log(data,"jj");
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}



const Viewu = async(req,res)=>{
    try {
       
        const data = await productSchema.find()
        .populate('c_id')
        .populate('s_id');
        console.log(data,"jj");
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}


const ViewSingle = async (req, res) => {
    try {
      let job = await productSchema.findById(req.params.id)
      .populate('c_id')
      .populate('s_id');
      if (!job) {
        console.log("Job not found with this ID!");
        res.json({
          success: false,
          message: "Job not found with this ID!",
        });
      } else {
        res.json({
          success: true,
          message: "Job fetched successfully",
          data: job,
        });
      }
    } catch (err) {
      console.log("Error occurred" + err);
      res.json({ error: err });
    }
  };


const Delete  = async(req,res)=>{

    try {

        let data  = await productSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await productSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully...");
            res.json({"Success":true, "Deleted Data":data})
        }
        
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}

const StatusUpdate = async (req, res) => {
  try {
    console.log(req.body, "Request body update");
    let id = req.params.id;

    const { name, c_id, qty, unit, price, stock, description } = req.body;

    let Statusdata = await productSchema.findById(id);
    if (!Statusdata) {
      return res.json({ success: false, message: "Data is not found" });
    }

    let newData = {};
    if (name) { newData.name = name; }
    if (c_id) { newData.c_id = c_id; }
    if (qty) { newData.qty = qty; }
    if (unit) { newData.unit = unit; }
    if (price) { newData.price = price; }
    if (stock) { newData.stock = stock; }
    if (description) { newData.description = description; }

    let updatestatus = await productSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
    res.json({ success: true, updatestatus });

  } catch (error) {
    res.json({ success: false, message: "Internal server error!!!" });
    console.log(error);
  }
};

  

module.exports = {Insert, View,Viewu, Delete, StatusUpdate, ViewSingle}