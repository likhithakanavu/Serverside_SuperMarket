const express = require('express');
const router = express.Router();
const {Userreg, Login, User,Usera, Delete} = require('../controller/user');
const authUser = require('../middleware/authuser')


router.post("/reg", Userreg );
router.post("/login", Login)
router.get("/view", Usera)

router.get("/vieww", authUser, User)

router.delete("/delete/:id", Delete)


module.exports= router;