
const mongoose = require("mongoose");
const {Schema} = mongoose;

const paySchema = new Schema(

    {

u_id:{
    type:mongoose.Schema.Types.ObjectId,
  ref:"users"
},
transactionid:{
    type:String,
    default: Date.now,
},
o_id:{
 type:mongoose.Schema.Types.ObjectId,
  ref:"orders"
},

data:{
    type:String,
    default: Date.now,
}

}

);
module.exports = mongoose.model("payment",paySchema);