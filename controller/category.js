const catSchema = require('../Model/category');

const Insert = async (req, res) => {
    try {
      const { name } = req.body;
      
      // Log the category name for debugging
      console.log(name, "jjjj");
  
      // Check if the category already exists
      const existingCategory = await catSchema.findOne({ name });
      
      if (existingCategory) {
        console.log("Category already exists");
        return res.status(400).json({ message: "Category already exists." });
      }
  
      // If not exists, create a new category
      const data = new catSchema({ name });
      const savedata = await data.save();
  
      console.log("Insertion Successful");
      res.send({ "Insertion Success": true, data: savedata, success: "success" });
      
    } catch (error) {
      console.error("Some error occurred", error);
      res.status(500).json({ message: "Some internal error!" });
    }
  };
  

const View = async(req,res)=>{
    try {
        
        const data = await catSchema.find();
        console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}

const Delete  = async(req,res)=>{

    try {

        let data  = await catSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await catSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully...");
            res.json({"Success":true, "Deleted Data":data})
        }
        
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}

const StatusUpdate = async (req, res)=>{

    try {
    let id = req.params.id;
    const { name } = req.body;
   
    let Statusdata = await catSchema.findById(id);
    if(!Statusdata){
        return res.json({ success: false, message: "Data is not found" })
    }
    let newData = {}
    if(name){newData.name = name}
    

    let updatestatus = await catSchema.findByIdAndUpdate(id,  { $set: newData }, { new: true })
    res.json({ success: true, updatestatus })
   
    
    } catch (error) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(error)
        
    }

}




const ViewSingle = async (req, res) => {
    try {
      let job = await catSchema.findById(req.params.id);
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
          job: job,
        });
      }
    } catch (err) {
      console.log("Error occurred" + err);
      res.json({ error: err });
    }
  };


module.exports = {Insert, View, Delete, StatusUpdate, ViewSingle}