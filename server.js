// // server.js
// // where your node app starts
console.log("Hello Node");
// // init project
var express = require("express");
var app = express();
require("dotenv").config();

// // process.env.DB_PASSWORD
// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// // http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// // your first API endpoint...
app.get("/api/hello", function(req, res) {
	res.json({ greeting: "hello API" });
});
app.get("/api/timestamp/:date_string?", (req, res) => {
	let date_string = req.params.date_string;
	let d = new Date(date_string);
	const getTimestamp = date => ({
		unix: date.getTime(),
		utc: date.toUTCString()
	});
	console.log(new Date(date_string));
	if (date_string === "" || date_string === undefined) {
		res.send(getTimestamp(new Date()));
	} else if (isNaN(d.getTime())) {
		res.send({ error: "Invalid Date" });
	} else {
		res.send(getTimestamp(d));
	}
});

// // listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log("Your app is listening on port " + listener.address().port);
});
