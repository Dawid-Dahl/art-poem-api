import express from "express";
import {addCollectionController} from "../controllers/collection/addCollectionController";
import {getConnection} from "typeorm";
import {jsonResponse} from "../utils/utils";
import {deleteCollectionController} from "../controllers/collection/deleteCollectionController";
import {Collection} from "../../db/entities/Collection";

const collectionsRouter = express.Router();

collectionsRouter.get("/get-all", async (req, res) => {
	try {
		if (!req.user) throw new Error("No user was found in the Express Request");

		const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);

		const collections = await collectionRepo.find({
			select: ["id", "name", "public"],
			where: {user: req.user},
		});

		res.status(200).json(jsonResponse(true, JSON.stringify(collections)));
	} catch (e) {
		console.log(e);

		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get collections!",
				})
			)
		);
	}
});

collectionsRouter.post("/add", addCollectionController);
collectionsRouter.delete("/delete", deleteCollectionController);

export default collectionsRouter;
