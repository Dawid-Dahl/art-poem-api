import fs from "fs";

require("dotenv").config({
	path: ".env",
});

fs.writeFile(
	`./${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
	process.env.GOOGLE_CREDENTIALS as string,
	err => console.error(err)
);
