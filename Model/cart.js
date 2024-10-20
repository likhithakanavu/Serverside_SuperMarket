const mongoose = require("mongoose");
const {Schema} = mongoose

const cartSchema = new Schema(
    {
        u_id:{
              type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        p_id:{
              type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
        s_id:{
            type:mongoose.Schema.Types.ObjectId,
          ref:"supermarket"
      },
        qty:{
            type:String,
            default:1,
        }
    }
)
module.exports = mongoose.model("cart",cartSchema);