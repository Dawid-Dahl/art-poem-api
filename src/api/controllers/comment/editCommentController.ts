import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Comment} from "../../../db/entities/Comment";

export const editCommentController = async (req: Request, res: Response) => {
	const commentsRepo = getConnection(process.env.NODE_ENV).getRepository(Comment);

	try {
		const {commentContent} = req.body;
		const artPoemId = req.query.commentId;

		const comment = await commentsRepo.findOne(artPoemId as string, {
			relations: ["user"],
		});

		if (!comment) {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Couldn't find a comment with that ID",
					})
				)
			);
			return;
		}

		comment.comment = commentContent;

		const insertResult = await commentsRepo.save(comment);

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: `Your comment was edited successfully!`,
					insertResult: JSON.stringify(insertResult),
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to edit the comment!",
				})
			)
		);
	}
};
