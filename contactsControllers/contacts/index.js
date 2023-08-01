const getAllContactsList = require("./getAllContactsList");
const getContact = require ("./getContactById");
const createContact = require ("./createContact");
const deleteContact = require ("./deleteContact");
const updateContact = require ("./updateContact");

module.exports = {
    getAllContactsList, getContact, createContact, deleteContact, updateContact
}