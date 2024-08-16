const express = require("express");
const router = express.Router(); //router creation

//get method
router.route("/").get((req,res) =>
{
    res.status(200).json({message:"Get all contacts"});
});

//post method
router.route("/").post((req,res) =>
{
    res.status(200).json({message:"Create Contact"});
});

//get router 
router.route("/:id").get((req,res) =>
{
    res.status(200).json({message:`Get contact for ${req.params.id}` });
});

//put router
router.route("/:id").put((req,res) =>
{
    res.status(200).json({message:`Update contact for ${req.params.id}` });
});

//delete method
router.route("/:id").delete((req,res) =>
{
    res.status(200).json({message:`Delete contact for ${req.params.id}`});
});

module.exports = router;