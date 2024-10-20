const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(

    {
        u_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        name: {
            type: String,
           
        },
        phone: {
            type: String,
          
        },
        email: {
            type: String,
          
        },
        address: {
            type: String,
         
        },
        city: {
            type: String,
          
        },
        country: {
            type: String,
          
            default:"INDIA"
        },
        zip: {
            type: String,
           
        },
        grandtotal: {
            type: String,
           
        },
      
        p_id:[ {
            p_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            qty:{
            type: String,

            },
            s_id:{

                type: mongoose.Schema.Types.ObjectId,
                     ref: "supermarket"
             },
             u_id:{

                 type: mongoose.Schema.Types.ObjectId,
                     ref: "user"

             },
             orstatus:{
                type: String,
                default:"active",  
             }
        }],
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
module.exports = mongoose.model("order", orderSchema);