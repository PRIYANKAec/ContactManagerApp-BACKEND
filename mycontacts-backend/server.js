const express = require("express");
const dotenv = require("dotenv").config(); 
const app = express();

const port = process.env.PORT || 5000;

app.get("/api/contacts",(req,res) =>
{
    //sending message to backend as an normal message
    // res.send("Getting All contacts"); 
    res.status(200).json({message:"Get all contacts"}); //json format with status code
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})