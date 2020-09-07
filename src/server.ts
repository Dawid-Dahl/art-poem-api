import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import errorhandler from "errorhandler";
import morgan from "morgan";
import {createConnection, getConnectionOptions} from "typeorm";
import apiRouter from "./api/routes/api";

(async () => {
	try {
		const config = await getConnectionOptions(process.env.NODE_ENV);

		console.log(config);

		createConnection(config).then(() => {
			const app = express();
			const PORT = process.env.PORT || 5000;

			app.use(express.json());
			app.use(express.urlencoded({extended: false}));
			app.use(
				cors({
					origin: "http://localhost:1234",
					exposedHeaders: ["x-token"],
				})
			);
			app.use(morgan("dev"));

			app.use("/api", apiRouter);

			app.use(errorhandler());

			app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));
		});
	} catch (e) {
		console.error(e);
	}
})();
