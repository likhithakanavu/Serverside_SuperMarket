const cartSchema =  require('../Model/cart');
const productSchema = require('../Model/product')
const Insert = async(req, res)=>{ 

    try {
  let id = req.params.id
  let uid =req.user
  console.log(req.user,"userid");
  let product = await productSchema.findById(id)
  console.log(product,"products")
  let dish = await cartSchema.findOne({p_id:id});
       
  if(dish){

    console.log("already added!");
    res.json({success: false, message: "already added"});
}else{
 
        const data  = await new cartSchema({ u_id:uid, p_id:id,s_id:product.s_id });
        const savedata = await data.save();
        // console.log(savedata)
        console.log("Insertion Successfull");
        const success="success";
        res.send({"Insertion Success":true, data:savedata,  success: success});
} 
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}


const View = async(req,res)=>{
    try {
        let uid = req.user
        const data = await cartSchema.find({u_id:uid}).populate('p_id');
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}

const Delete  = async(req,res)=>{

    try {

        let data  = await cartSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await cartSchema.findByIdAndDelete(req.params.id);
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
   
    let Statusdata = await cartSchema.findById(id);
  
    if(!Statusdata){
        return res.json({ success: false, message: "Data is not found" })
    }
    let action = req.body.action;
    if (action === "increase") {
        qty = Number(Statusdata.qty) + 1;
    } else if (action === "decrease") {
        qty = Number(Statusdata.qty) - 1;
    } else {
        return res.json({ success: false, message: "Invalid action" });
    }
   
    let newData = {}
    if(qty){newData.qty = qty}

    let updatestatus = await cartSchema.findByIdAndUpdate(id,  { $set: newData }, { new: true })
    res.json({ success: true, updatestatus })
   
    
    } catch (error) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(error)
        
    }

}



module.exports = {Insert, View, Delete, Update}