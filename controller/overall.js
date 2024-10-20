const userSchema = require('../Model/user');
const supermarketSchema=require('../Model/supermarket')
const productSchema = require('../Model/product');
const feedSchema = require('../Model/feedback')
const cartSchema = require('../Model/cart')



const Count = async(req, res)=>{ 

    try {
        const totalUsers = await userSchema.countDocuments();
      const superM = await supermarketSchema.countDocuments();
        const totalProduct = await productSchema.countDocuments();
        const totalFeed = await feedSchema.countDocuments();
       
        res.json({
          
            success: true,
            User: totalUsers,
            superM:superM,
            Product:totalProduct,
            Feed: totalFeed,
        })
        
    } catch (err) {
        console.log("Error occurred" + err);
        res.json({ error: err });
    }
}


const Counts = async(req, res)=>{ 

    try {

        const sid = req.super

        const totalUsers = await userSchema.countDocuments();
      const superM = await supermarketSchema.countDocuments();
        const totalProduct = await productSchema.countDocuments({s_id:sid.id});
        const totalFeed = await feedSchema.countDocuments();
       
        res.json({
          
            success: true,
            User: totalUsers,
            superM:superM,
            Product:totalProduct,
            Feed: totalFeed,
        })
        
    } catch (err) {
        console.log("Error occurred" + err);
        res.json({ error: err });
    }
}



const User = async(req, res)=>{ 

    try {

        const uid = req.user

        const totalUsers = await cartSchema.countDocuments({u_id:uid});
    
       
        res.json({
          
            success: true,
            Cart: totalUsers,
           
        })
        
    } catch (err) {
        console.log("Error occurred" + err);
        res.json({ error: err });
    }
}






module.exports = {Count, Counts, User}
