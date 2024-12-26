const { Timestamp, ObjectId } = require("mongodb");
const { getCollection } = require("../models/event");

const handlegetrouter = async (req, res) => {
	const eventId = req.query.id;
	const { type, limit, page } = req.query;
	if (eventId) {
		const Event = getCollection();
		const event = await Event.findOne({
			_id: new ObjectId(`${eventId}`),
		});
		return res.json(event);
	} else if (type || limit || page) {
		try {
			const { type, limit, page } = req.query;
			const eventsPerPage = parseInt(limit) || 1;
			const currentPage = parseInt(page) || 1;
			const skip = (currentPage - 1) * eventsPerPage;

			const collection = getCollection();

			let filter = {};
			if (type === "latest") {
				filter = {};
			}

			const totalEvents = await collection.countDocuments(filter);
			const events = await collection
				.find(filter)
				.sort({ date: -1 })
				.skip(skip)
				.limit(eventsPerPage)
				.toArray();

			res.status(200).json({
				status: "success",
				events,
				pagination: {
					currentPage,
					totalPages: Math.ceil(totalEvents / eventsPerPage),
					limit: eventsPerPage,
				},
			});
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({ status: "error", message: "Failed to fetch events" });
		}
	} else {
		const collection = getCollection();
		const events = await collection.find({}).toArray();
		return res.json({ events: events });
	}
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

const handleputrouter = async (req, res) => {
	const id = req.params.id;
	const updatedata = req.body;
	const Event = getCollection();
	const result = await Event.updateOne(
		{ _id: new ObjectId(`${id}`) },
		{ $set: updatedata }
	);
	if (result.matchedCount === 0) {
		return res.json({ status: "Event doesn't found" });
	}
	res.status(200).json({
		status: "updated succesfully",
	});
};

const handledeleterouter = (req, res) => {};

module.exports = {
	handlegetrouter,
	handlepostevent,
	handleputrouter,
	handledeleterouter,
};
