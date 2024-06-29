const express = require("express");
const session = require("express-session");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");
// const viewRouter = require("./routes/viewRouter"); //view
const inputError = "./backend/error/InputError";
require("dotenv").config();

const loadModel = require("./backend/services/loadModel");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);
//error handling
app.use((err, req, res, next) => {
	if (err instanceof inputError) {
		res.status(err.statusCode).json({
			status: "fail",
			message: err.message,
		});
	} else if (err) {
		res.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	} else {
		next();
	}
});

//view
// app.use("/", viewRouter);

//api
app.use("/api", apiRouter);
app.get("/api", (req, res) => {
	res.send("Agrisense Backend API");
});

app.use("*", (req, res) => {
	res.status(404).json({ message: "endpoint not found" });
});

app.listen(PORT, () => {
	console.log(`App is listening on http://localhost:${PORT}`);
	loadModel()
		.then((model) => {
			app.locals.model = model;
		})
		.catch((error) => {
			console.error("Error loading the model", error);
		});
});
