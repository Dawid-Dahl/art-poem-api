import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Like} from "../../../db/entities/Like";

export const getLikesByPoemController = async (req: Request, res: Response) => {
	const likesRepo = getConnection(process.env.NODE_ENV).getRepository(Like);

	try {
		const artPoemId = req.query.artPoemId;

		const likesByArtPoemId = await likesRepo.find({
			where: {artpoem: {id: artPoemId}},
		});

		res.status(200).json(jsonResponse(true, JSON.stringify(likesByArtPoemId)));
	} catch (e) {
		console.log(e);

		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the likes!",
				})
			)
		);
	}
};
