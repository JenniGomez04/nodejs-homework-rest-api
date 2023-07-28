const listContacts = require("./listContacts");
const getContact = require ("./getContactById");
const createContact = require ("./createContact");
const deleteContact = require ("./deleteContact");
const updateContact = require ("./updateContact");

module.exports = {
    listContacts, getContact, createContact, deleteContact, updateContact
}