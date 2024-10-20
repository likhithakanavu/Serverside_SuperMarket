const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedSchema = new Schema(

    {
        u_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        p_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
       
      
        feedback: {
            type: String,
          
        },
        rating: {
            type: String,
          
        },
        status:{
            type: String,
            default:"active",
        },
        date: {
            type: String,
            default: Date.now,
        }

    }

);
module.exports = mongoose.model("feedback", feedSchema);