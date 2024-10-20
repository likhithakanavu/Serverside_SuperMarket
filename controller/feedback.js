const feedSchema = require('../Model/feedback');
const productSchema = require('../Model/product');

const Insert = async (req, res) => { 
    try {
        const uid = req.user;
        const { rating, feedback, id } = req.body;

        // Check if feedback already exists for the same user and product
        const existingFeedback = await feedSchema.findOne({ u_id: uid, p_id: id });
        
        if (existingFeedback) {
            return res.json({ success: false, message: "Feedback already exists for this product." });
        }

        // If feedback doesn't exist, proceed with insertion
        const data = new feedSchema({ rating, feedback, u_id: uid, p_id: id });
        const savedata = await data.save();
        
        console.log("Insertion Successful");
        res.status(200).json({ success: true, message: "Feedback submitted successfully.", data: savedata });
        
    } catch (error) {
        console.error("Some error occurred: " + error);
        res.status(500).json({ success: false, message: "Some internal error occurred!" });   
    }
};



const View = async(req,res)=>{
    try {
        
        const data = await feedSchema
            .find()
            .populate('u_id') // Populate the u_id field
            .populate('p_id');
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}


const Delete  = async(req,res)=>{

    try {

        let data  = await feedSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await feedSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully...");
            res.json({"Success":true, "Deleted Data":data})
        }
        
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}

module.exports = {Insert, View, Delete}