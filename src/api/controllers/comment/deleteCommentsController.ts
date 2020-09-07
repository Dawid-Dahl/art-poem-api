import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Comment} from "../../../db/entities/Comment";

export const deleteCommentsController = async (req: Request, res: Response) => {
	const commentsRepo = getConnection(process.env.NODE_ENV).getRepository(Comment);

	try {
		const commentId = req.query.commentId;

		const deleteResult = await commentsRepo.delete(commentId as string);

		if (!deleteResult.affected) {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Something went wrong while trying to delete the comment!",
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
						message: `The comment was successfully deleted!`,
					})
				)
			);
		} else {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "No comment's associated with that id! Comment was not deleted.",
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
					message: "Something went wrong while trying to delete the comment!",
				})
			)
		);
	}
};
