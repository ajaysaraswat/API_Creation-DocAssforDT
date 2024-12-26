const express = require("express");
const router = express.Router();
const {
	handlegetrouter,
	handlepostevent,
	handleputrouter,
	handledeleterouter,
} = require("../controller/event");

router.post("/events", handlepostevent);
router.get("/events", handlegetrouter);
router.put("/events/:id", handleputrouter);
router.delete("/events/:id", handledeleterouter);

module.exports = router;
