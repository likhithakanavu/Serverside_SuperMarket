const mongoose = require("mongoose");
const {Schema} = mongoose;

const catSchema = new Schema(

    {
        name: {
            type: String,
           
        },
        status:{
            type:String,
        }
       

    }

);
module.exports = mongoose.model("category",catSchema);