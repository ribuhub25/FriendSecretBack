const express = require("express");
const router = express.Router();
const { getAllSort, postCreateSort, getSortsByEmailHost } = require("../controllers/sort");

router.get("/", getAllSort);
router.get("/:email", getSortsByEmailHost);
router.post("/create", postCreateSort);

module.exports = router;
