//express-async-handler is a middleware that simplifies the process of handling asynchronous operations in Express.js route handlers.
//This reduces the boilerplate code for error handling in asynchronous route handlers.
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//CRUD Operations ->

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getAllContacts = asyncHandler()

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const createContacts = asyncHandler()

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler()

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const updateContacts = asyncHandler()

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const deleteContacts = asyncHandler()