const express = require("express");
const router = express.Router();
const { handlegetrouter, handlepostevent } = require("../controller/event");

router.get("/:id", handlegetrouter);
router.post("/events", handlepostevent);
module.exports = router;
