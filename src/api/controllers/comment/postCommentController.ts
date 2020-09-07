import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {User} from "../../../db/entities/User";
import {ArtPoem} from "../../../db/entities/ArtPoem";
import {Comment} from "../../../db/entities/Comment";

export const postCommentController = async (req: Request, res: Response) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const commentsRepo = getConnection(process.env.NODE_ENV).getRepository(Comment);

	try {
		const {commentContent, artPoemId} = req.body;

		const user = await userRepo.findOne(req.user);
		const artPoem = await artPoemRepo.findOne(artPoemId);

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

		const comment = new Comment();

		comment.comment = commentContent;
		comment.user = user;
		comment.artpoem = artPoem;

		const insertResult = await commentsRepo.save(comment);

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: `Your comment was posted successfully!`,
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
					message: "Something went wrong while trying to post the comment!",
				})
			)
		);
	}
};
