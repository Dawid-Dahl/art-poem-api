const fs = require("fs");

require("dotenv").config({
	path: ".env",
});

fs.writeFile(
	`./${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
	process.env.GOOGLE_CREDENTIALS,
	err => console.error(err)
);
