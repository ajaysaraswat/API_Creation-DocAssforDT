const express = require("express");
const { connecttomongoDB } = require("./models/event");
const eventRouter = require("./routes/event");
const app = express();
const Path = require("path");

const startServer = async () => {
	try {
		await connecttomongoDB("mongodb://localhost:27017");
		const PORT = 8000;

		app.use(express.urlencoded({ extended: false }));
		app.use(express.json());
		app.use(express.static(Path.resolve("./public")));

		app.use("/api/v3/app", eventRouter);

		app.listen(PORT, () => {
			console.log(`Server is ... running on PORT ${PORT}`);
		});
	} catch (err) {
		console.log("Failed to connect to MongoDB:", err);
		process.exit(1);
	}
};

startServer();
