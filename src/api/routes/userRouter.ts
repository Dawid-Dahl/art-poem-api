import express from "express";
import {getConnection} from "typeorm";
import {jsonResponse} from "../utils/utils";
import {User} from "../../db/entities/User";
import {Collection} from "../../db/entities/Collection";

const userRouter = express.Router();

userRouter.get("/get/:id", async (req, res) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

	const id = req.params.id;

	try {
		const user = await userRepo.findOne(id);

		res.json(jsonResponse(true, JSON.stringify({user})));
	} catch (e) {
		console.log(e);

		res.status(401).json(jsonResponse(false));
	}
});

userRouter.post("/create", async (req, res) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);

	const {id, username} = req.body;

	if (username && id) {
		try {
			const user = new User();
			user.id = id;
			user.username = username;

			const collection = new Collection();
			collection.user = user;

			await userRepo.save(user);
			await collectionRepo.save(collection);

			console.log("User was saved!");

			res.json(jsonResponse(true));
		} catch (e) {
			console.error(e);
			res.status(401).json(jsonResponse(false));
		}
	} else {
		res.status(401).json(jsonResponse(false));
	}
});

export default userRouter;
