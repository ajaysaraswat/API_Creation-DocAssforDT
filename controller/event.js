const { Timestamp, ObjectId } = require("mongodb");
const { getCollection } = require("../models/event");

const handlegetrouter = async (req, res) => {
	const eventId = req.params.id;
	const Event = getCollection();
	const event = await Event.findOne({
		_id: new ObjectId(`${eventId}`),
	});
	return res.json(event);
};

const handlepostevent = async (req, res) => {
	const Event = getCollection();
	try {
		const body = req.body;
		const payload = {
			type: "Event",
			uid: Event.length + 1,
			name: body.name,
			tagline: body.tagline,
			schedule: body.schedule,
			description: body.description,
			files: body.files || {}, // Assuming `files` is an object or array from the client
			moderator: body.moderator,
			category: body.category,
			sub_category: body.sub_category,
			rigor_rank: body.rigor_rank,
			attendees: body.attendees || [], // Default to an empty array if not provided
			createdAt: new Date(), // Timestamp for creation
			updatedAt: new Date(), // Timestamp for updates
		};

		const event = await Event.insertOne(payload);
		return res.status(201).json({
			status: "Created Successfully",
			eventId: event.insertedId,
		});
	} catch (err) {
		console.log("error", err);
		return res.status(500).json({
			status: "Error",
			message: "failed due to some issue",
		});
	}
};

module.exports = {
	handlegetrouter,
	handlepostevent,
};
