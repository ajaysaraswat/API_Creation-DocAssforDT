const express = require("express");
const router = express.Router();
const { getCollection } = require("../models/event");
const { singleupload } = require("../middlewares/event");
const {
	handlegetrouter,
	handlepostevent,
	handleputrouter,
	handledeleterouter,
} = require("../controller/event");

router.post("/events", singleupload, handlepostevent);
router.get("/events", handlegetrouter);
router.put("/events/:id", handleputrouter);
router.delete("/events/:id", handledeleterouter);

module.exports = router;
