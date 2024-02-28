// express-async-handler is a middleware that simplifies the process of handling asynchronous operations in Express.js route handlers.
// This reduces the boilerplate code for error handling in asynchronous route handlers.
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// CRUD Operations ->

//@desc Get all contacts
//@route GET /api/contacts
//@access public
//asyncHandler is a function that wraps another asynchronous function, handling errors that might occur during its execution.
//async (req, res) => { ... } is an asynchronous arrow function that serves as the actual route handler for the "getAllContacts" route
const getAllContacts = asyncHandler(async (req, res) => {
  // Contact is a model from a MongoDB database with a find method to retrieve contacts.
  const contacts = await Contact.find({ userID: req.user.id });

  //After successfully retrieving the contacts, it sets the HTTP response status to 200 (OK). Then, it sends a JSON response
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("Requested body- ", req.body);

  //extracting the name, email, and mobile properties from req.body.
  const { name, email, mobile } = req.body;

  //if any field is empty then don't create contact
  if (!name || !email || !mobile) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  //create a new record or document in a database collection.
  //result of Contact.create operation is stored in variable contact. This variable will hold the newly created contact object or document,
  const contact = await Contact.create({
    name,
    email,
    mobile,
    userID: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get particular contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contactToFind = await Contact.findById(req.params.id);
  if (!contactToFind) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contactToFind);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contactToFind = await Contact.findById(req.params.id);
  if (!contactToFind) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //validating access
  if (contactToFind.userID.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    // ID of the document you want to update.
    req.params.id,
    // data you want to use to update the document.
    req.body,
    // specifying that the method should return the modified document rather than the original one. 
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
    const contactToFind = await Contact.findById(req.params.id);
    if(!contactToFind) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contactToFind.userID.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    //Deleting contact after matching with ID
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200);
});

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
}