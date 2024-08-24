const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config(); 
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); //middleware to pass the data from client to server

app.use("/api/contacts",require("./routes/contactRoutes")); // URL for the hosting 

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})