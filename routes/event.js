const express = require("express");
const router = express.Router();
const { handlegetrouter, handlepostevent } = require("../controller/event");

router.post("/events", handlepostevent);
router.get("/events", handlegetrouter);

module.exports = router;
