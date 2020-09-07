import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Collection} from "../../../db/entities/Collection";
import {User} from "../../../db/entities/User";

export const addCollectionController = async (req: Request, res: Response) => {
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

	try {
		if (!req.user) throw new Error("No user was found in the Express Request");

		const {collectionName, isPublic} = req.body;

		const user = await userRepo.findOne(req.user);

		if (!user) throw new Error("No user could be fetched from the DB");

		const collection = new Collection();

		collection.name = collectionName;
		collection.public = isPublic;
		collection.user = user;

		const insertResult = await collectionRepo.save(collection);

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: `Your ${
						isPublic ? "public" : "private"
					} collection ${collectionName} was successfully added!`,
					collection: JSON.stringify({
						id: insertResult.id,
						name: collection.name,
						public: collection.public,
					}),
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to add the collection!",
				})
			)
		);
	}
};
