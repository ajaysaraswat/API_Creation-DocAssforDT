const express = require("express");
const { connecttomongoDB } = require("./models/event");
const eventRouter = require("./routes/event");
const app = express();

// Async function to ensure MongoDB connection is established before starting the server
const startServer = async () => {
	try {
		await connecttomongoDB("mongodb://localhost:27017"); // Ensure MongoDB is connected first
		const PORT = 8000;

		app.use(express.urlencoded({ extended: false }));
		app.use(express.json());

		app.use("/api/v3/app", eventRouter);

		app.listen(PORT, () => {
			console.log(`Server is ... running on PORT ${PORT}`);
		});
	} catch (err) {
		console.error("Failed to connect to MongoDB:", err);
		process.exit(1); // Exit the process if MongoDB connection fails
	}
};

startServer(); // Call the function to start the server
