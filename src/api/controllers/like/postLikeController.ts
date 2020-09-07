import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Like} from "../../../db/entities/Like";
import {User} from "../../../db/entities/User";
import {ArtPoem} from "../../../db/entities/ArtPoem";

export const postLikeController = async (req: Request, res: Response) => {
	const likeRepo = getConnection(process.env.NODE_ENV).getRepository(Like);
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);

	try {
		const artPoemId = req.query.artPoemId;

		const user = await userRepo.findOne(req.user);
		const artPoem = await artPoemRepo.findOne(artPoemId as string);

		if (!user) {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Couldn't find a user with that ID",
					})
				)
			);
			return;
		}

		if (!artPoem) {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Couldn't find an artPoem with that ID",
					})
				)
			);
			return;
		}

		const like = new Like();

		like.user = user;
		like.artpoem = artPoem;

		const insertResult = await likeRepo.save(like);

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: `Your like was posted successfully!`,
					insertResult: JSON.stringify(insertResult),
				})
			)
		);
	} catch (e) {
		console.log(e);

		if (e.message.includes("Duplicate")) {
			res.status(403).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: e.message,
					})
				)
			);
		} else {
			res.status(500).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Something went wrong while trying to like the poem!",
					})
				)
			);
		}
	}
};
