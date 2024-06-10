const express = require("express");
const router = require("./routes");
const session = require("express-session");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(router);

app.get("/", (req, res) => {
	res.send("Authentication API");
});

app.listen(PORT, () => {
	console.log(`App is listening on http://localhost:${PORT}`);
});
