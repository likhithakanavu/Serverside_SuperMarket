const express = require('express');
const cors = require("cors");
const app = express(); 
const ConnectToMongoDb = require('./db');
ConnectToMongoDb();

const PORT =7001;
app.use(cors());
app.use(express.json());


app.use("/admin", require("./Router/admin"))
app.use("/user", require('./Router/user'))
app.use("/category", require('./Router/category'))
app.use("/upload", express.static('./uploads'))
app.use("/cart", require('./Router/cart'))
app.use("/feedback", require('./Router/feedback'))
app.use("/overall", require('./Router/overall'))
app.use("/SuperM", require('./Router/supermarket'))
app.use("/product", require('./Router/product'))
app.use("/order", require('./Router/order'))


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    
})
