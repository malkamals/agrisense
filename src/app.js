const express = require("express");
const session = require("express-session");
const router = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.use("/api", router);
app.get("/api", (req, res) => {
	res.send("Authentication API");
});
app.use("*", (req, res) => {
	res.status(404).json({ message: "Endpoint does not exist" });
});

app.listen(PORT, () => {
	console.log(`App is listening on http://localhost:${PORT}`);
});
