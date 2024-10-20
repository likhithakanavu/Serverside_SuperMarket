const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema(

    {
      s_id:{
          type: mongoose.Schema.Types.ObjectId,
            ref:"supermarket"
      },
        c_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"category"
        },
        name: {
            type: String,
            required: true,
        },

        image:{
            type:String,
            required:true,
        },
      qty:{

        type:String,

      },
      unit:{
        type:String,
      },
      price:{
        type:String,
      },
      stock:{
        type:String,
      },
      description:{
        type:String,
      },
        data:{

            type: String,
            default: Date.now,

        },
       
        status:{
            type:String,
            default: "active",
        }
    }

);
module.exports = mongoose.model("product",productSchema);