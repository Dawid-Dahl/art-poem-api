import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {User} from "../../../db/entities/User";
import {jsonResponse} from "../../utils/utils";

export const postProfileImageController = async (req: Request, res: Response) => {
	try {
		const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

		const user = await userRepo.findOne(req.user);

		if (!user) throw new Error("No user could be found in DB");

		user.profilePicture = req.gcsPublicUrl ?? "";

		const insertResult = await userRepo.save(user);

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "Profile image succesfully uploaded!",
					insertResult: JSON.stringify(insertResult),
				})
			)
		);
	} catch (e) {
		console.error(e);
		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to upload the profile picture!",
				})
			)
		);
	}
};
