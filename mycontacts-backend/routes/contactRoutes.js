const express = require("express");
const router = express.Router(); //router creation
const {
getContacts, 
createContact, 
getContact, 
updateContact, 
deleteContact
} = require("../controllers/contactController");

router.route("/").get(getContacts).post(createContact); //passing without id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact); // passing with id 

module.exports = router;