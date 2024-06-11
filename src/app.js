const express = require("express");
const session = require("express-session");
const router = require("./routes");
require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Authentication API",
			version: "1.0.0",
		},
	},
	apis: ["./routes/*.js"],
};

const swaggerDoc = swaggerJsdoc(options);

app.use("/", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req, res) => {
	res.send("Authentication API");
});

app.listen(PORT, () => {
	console.log(`App is listening on http://localhost:${PORT}`);
});
