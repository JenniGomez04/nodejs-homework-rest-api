const getAllContactsList = require("./getAllContactsList");
const getContact = require ("./getContactById");
const createContact = require ("./createContact");
const deleteContact = require ("./deleteContact");
const updateContact = require ("./updateContact");
const updateFavorite = require ("./updateFavorite");

module.exports = {
    getAllContactsList, getContact, createContact, deleteContact, updateContact, updateFavorite
}