const express = require("express");
const router = express.Router();
const {  Superreg, Login, View,Supermarket, Views, Delete,Update,Updateprofile,SingleView} = require("../controller/supermarket");
const authSuperM = require('../middleware/authsuper')
router.post("/reg", Superreg)
router.post("/login", Login)
router.get("/view",View)
console.log("agag")
router.get("/views",authSuperM,Views)
router.get("/singleview/:id",SingleView)


router.delete("/delete/:id",Delete)
router.put("/update/:id",Update)
router.put("/profileupdate/:id",Updateprofile)





module.exports  = router; 