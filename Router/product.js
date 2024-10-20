const express = require("express");
const router = express.Router();
const { Insert, View, Delete, StatusUpdate, ViewSingle, Viewu } = require("../controller/product");
const multer = require("multer");
const authSuperM = require('../middleware/authsuper')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  const imageUpload = multer({ storage: storage });

router.post("/insert",authSuperM, imageUpload.single('image'), Insert)
router.get("/Singleproduct/:id",ViewSingle )
router.get("/view", authSuperM, View )
router.get("/uview",  Viewu )
router.delete("/delete/:id", Delete)
console.log("ghhh")
router.put("/update/:id", StatusUpdate)




module.exports  = router; 