const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authuser")
const authSuperM = require("../middleware/authsuper")


const {Insert,Get,GetSuper,Update,Delete,GettodaySuper }  = require("../controller/order");


router.post ("/Insert",authUser, Insert)
router.get ("/get",authUser, Get)
console.log("hellooo")
router.get("/superget",authSuperM, GetSuper)
router.get("/todaysuperget",authSuperM, GettodaySuper)

router.put("/update/:id", Update)
router.delete("/delete/:id", Delete)



module. exports = router;