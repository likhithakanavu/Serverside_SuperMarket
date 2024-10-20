const mongoose = require("mongoose");
const {Schema} = mongoose;

const supermarketsSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
        },

        phone: {
            type:String,
           
        },

        email:{
            type: String,
           
        },
        password: {
            type: String,
           
        },
        address: {
            type:String,
        },
        status:{
            type:String,
            default:"Pending"
        },
      

    }
)

module.exports = mongoose.model("supermarket", supermarketsSchema );
