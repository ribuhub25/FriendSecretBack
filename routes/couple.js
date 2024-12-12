const express = require("express");
const { getFriendSecret, getAllCodes, getInfoCode } = require("../controllers/couple");
const router = express.Router();

router.get("/:code", getFriendSecret);
router.get("/code/:sort", getAllCodes);
router.get("/info/:code", getInfoCode);
module.exports = router;
