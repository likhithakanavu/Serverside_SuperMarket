const express = require("express");
const router = express.Router();
const { Insert, View, Delete, StatusUpdate, ViewSingle} = require("../controller/category");

router.post("/insert", Insert)
router.get("/view", View )
router.delete("/delete/:id", Delete)
router.put("/update/:id", StatusUpdate)
router.get("/SingleCat/:id", ViewSingle)



module.exports  = router; 