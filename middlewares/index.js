const ctrlWrapper = require("./ctrlWrapper");
const validation = require("./validation");
const authMiddleware = require("./authMiddleware");
const upload = require("./upload")

module.exports = {
    ctrlWrapper, validation, authMiddleware, upload,
}