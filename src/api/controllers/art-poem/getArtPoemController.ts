import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../../db/entities/ArtPoem";

export const getArtPoemController = async (req: Request, res: Response) => {
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);

	try {
		const artPoem = await artPoemRepo.findOne(req.query.id as string, {
			relations: ["collections", "comments", "comments.user", "likes", "user"],
		});

		if (artPoem) {
			res.status(200).json(jsonResponse(true, JSON.stringify(artPoem)));
		} else {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "There is no artpoem associated with that id!",
					})
				)
			);
		}
	} catch (e) {
		console.log(e);

		res.status(404).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the artPoem!",
				})
			)
		);
	}
};
