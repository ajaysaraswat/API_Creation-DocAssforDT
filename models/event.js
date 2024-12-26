const { MongoClient, ObjectId } = require("mongodb");
let collection = null;

const connecttomongoDB = async (url) => {
	try {
		const client = new MongoClient(url);
		await client.connect();
		const db = client.db("API");
		collection = db.collection("myCollection");
		console.log("MongoDB connected successfully");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
};

const getCollection = () => {
	if (!collection) {
		throw new Error(
			"Collection is not initialized. Call connectToMongoDB first."
		);
	}
	return collection;
};

module.exports = {
	connecttomongoDB,
	getCollection,
};
