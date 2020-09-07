import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Like} from "../../db/entities/Like";
import {Comment} from "../../db/entities/Comment";
import {Collection} from "../../db/entities/Collection";
import {ArtPoem} from "../../db/entities/ArtPoem";
import {User} from "../../db/entities/User";

export const deleteAllMainServerUserData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Like)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Comment)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Collection)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(ArtPoem)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(User)
			.where("id = :id", {id: req.user})
			.execute();

		console.log(
			`User ${req.user} and all its data was successfully deleted from the Main Server`
		);

		next();
	} catch (e) {
		console.log(e);
		next(e);
	}
};
