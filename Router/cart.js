const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authuser") 
const {Insert, View, Delete, Update }  = require("../controller/cart");
router.post ("/Insert/:id",authUser, Insert)
router.get ("/get",authUser, View)
router.delete ("/delete/:id", Delete)
router.put ("/update/:id", Update)



module. exports = router;