const orderSchema = require('../Model/order');
const cartSchema = require('../Model/cart');
const paySchema = require('../Model/payment')
const productSchema = require('../Model/product');

const Insert = async (req, res) => {
    try {
        const uid = req.user;
        const { name, email, phone, address, city, country, zip, transactionid, grandTotal } = req.body;

        console.log(req.body , "body")
        // Fetch cart items
        const cart = await cartSchema.find({ u_id: uid });
        const productDetails = cart.map(item => ({
            p_id: item.p_id,
            qty: item.qty,
            u_id:item.u_id,
            s_id: item.s_id
        }));

        // Save order
        const order_data = new orderSchema({ name, email, phone, address, city, country, zip, grandtotal:grandTotal, p_id: productDetails, u_id: uid });

        // console.log(dishDetails,'order_data')
        const savedata = await order_data.save();

        // Save payment
        const pay = new paySchema({ transactionid, u_id: uid, o_id: savedata._id });
        const paysavedata = await pay.save();

        // Delete cart items
        const Cartdelete = await cartSchema.deleteMany({ u_id: uid });

        console.log("Insertion Successful");
        res.send({ success: true, order_data: savedata, pay_data: paysavedata, cart_delete: Cartdelete });

    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const Get = async(req,res)=>{
    try {
        let uid = req.user
        const data = await orderSchema.find({u_id:uid}).populate('p_id.p_id');
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}


const GetSuper = async (req, res) => {
    console.log("heloo")
    try {
        console.log("heloo1234")
        let uid = req.super; // Assuming req.super contains the s_id to search for.
        console.log(uid,"ssssssssssssss")
        // Query to find documents where p_id array contains an object with matching s_id
        const data = await orderSchema.find({ 'p_id.s_id': uid.id })
        .populate({
            path: 'p_id.p_id', // Populate the `p_id` field in the `p_id` array

        })
        .populate({
            path: 'p_id', // Populate the `p_id` field in the `p_id` array
            populate: {
                path: 'u_id' // Populate `u_id` inside `p_id`
            }
        })
        .populate('u_id');
        
        console.log(data,"res");
        res.json(data);
    } catch (error) {
        console.error("Some error Occurred: " + error);
        console.log(error,"error")
        res.status(500).json("Some internal error!!!");
    }
};
const GettodaySuper = async (req, res) => {
    try {
        const uid = req.super; // s_id to search for

        // Query to find documents where p_id array contains an object with matching s_id and order is active
        const data = await orderSchema.find({
            'p_id.s_id': uid.id,
            'status': 'active' // Filter for active status
        })
        .populate({
            path: 'p_id.p_id', // Populate the `p_id` field in the `p_id` array

        })
        .populate({
            path: 'p_id', // Populate the `p_id` field in the `p_id` array
            populate: {
                path: 'u_id' // Populate `u_id` inside `p_id`
            }
        })
        .populate('u_id'); 

        console.log(data, "datadata");
        res.json(data);
    } catch (error) {
        console.error("Some error Occurred: " + error);
        res.status(500).json("Some internal error!!!");
    }
};





const AOView = async(req,res)=>{
    try {
        
        const data = await orderSchema.find().populate('dish_id.dish_id')
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}

const Update = async (req, res) => {
    try {
      let id = req.params.id;
      let Statusdata = await orderSchema.findById(id);
  
      if (!Statusdata) {
        return res.json({ success: false, message: "Data not found" });
      }
  
      let status;
      let action = req.body.action;
      if (action === "Accept" || action === "Reject" || action === "Delivered") {
        status = action;
      } else {
        return res.json({ success: false, message: "Invalid action" });
      }
  
      let newData = {};
      if (status) newData.status = status;
  
      let updatestatus = await orderSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
      res.json({ success: true, updatestatus });
  
    } catch (error) {
      res.json({ success: false, message: "Internal server error!!!" });
      console.log(error);
    }
  };

  
const Delete  = async(req,res)=>{

    try {

        let data  = await orderSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await orderSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully...");
            res.json({"Success":true, "Deleted Data":data})
        }
        
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}


module.exports = { Insert,Get,GetSuper,Update, Delete,GettodaySuper } 
















// const Update = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let Statusdata = await orderSchema.findById(id);

//         if (!Statusdata) {
//             return res.json({ success: false, message: "Data not found" });
//         }

//         let action = req.body.action;
//         console.log(action,"actionnnn")
//         let status;
//         if (action === "Accept" || action === "Reject" || action === "Delivered" ) {
//             status = action;
//         } else {
//             return res.json({ success: false, message: "Invalid action" });
//         }

//         // Update the orstatus for each p_id in the array
//         let updatedOrder = await orderSchema.findOneAndUpdate(
//             {
//                 _id: id, 
//                 "p_id.orstatus": { $in: ["active", "Accept", "Reject", "Delivered"] } // Query to find the order by id and where orstatus is one of the specified values
//             },
//             {
//                 $set: { "p_id.$.orstatus": status } // Use the positional operator ($) to update the specific element
//             },
//             { new: true }
//         );
        

//         if (!updatedOrder) {
//             return res.json({ success: false, message: "Status not updated, no matching status found" });
//         }

//         res.json({ success: true, updatedOrder });

//     } catch (error) {
//         res.json({ success: false, message: "Internal server error!!!" });
//         console.log(error);
//     }
// };
