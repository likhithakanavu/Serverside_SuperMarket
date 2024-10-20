const express = require("express");
const router = express.Router();
const {Count,Counts,User }  = require("../controller/overall");
const authsuper = require('../middleware/authsuper')
const authuser = require('../middleware/authuser')


router.get ("/count", Count)
router.get ("/counts",authsuper, Counts)
router.get ("/cart",authuser, User)



module. exports = router;
