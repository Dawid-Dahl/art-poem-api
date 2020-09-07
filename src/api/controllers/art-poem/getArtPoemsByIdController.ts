import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../../db/entities/ArtPoem";

export const getArtPoemsByUserIdController = async (req: Request, res: Response) => {
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);

	const userId = req.query.id;
	const poemCount = parseInt(req.query.poemCount as string);

	try {
		const artPoemsByUserId = await artPoemRepo.find({
			where: {userId: userId},
			relations: ["collections", "comments", "comments.user", "likes", "user"],
			take: poemCount,
		});

		res.status(200).json(jsonResponse(true, JSON.stringify(artPoemsByUserId)));
	} catch (e) {
		console.log(e);

		res.status(404).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the artPoems!",
				})
			)
		);
	}
};
