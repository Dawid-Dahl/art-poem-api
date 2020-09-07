import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Like} from "../../../db/entities/Like";
export const postUnlikeController = async (req: Request, res: Response) => {
	const likeRepo = getConnection(process.env.NODE_ENV).getRepository(Like);

	try {
		const likeId = req.query.likeId;

		const deleteResult = await likeRepo.delete(likeId as string);

		if (!deleteResult.affected) {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Something went wrong while trying to unlike the poem!",
					})
				)
			);
			return;
		}

		if (deleteResult.affected > 0) {
			res.status(200).json(
				jsonResponse(
					true,
					JSON.stringify({
						message: `The poem was successfully unliked!`,
					})
				)
			);
		} else {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "No like is associated with that id! Poem was not unliked.",
					})
				)
			);
		}
	} catch (e) {
		console.log(e);

		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to unlike the poem!",
				})
			)
		);
	}
};
