import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {deleteGCSFile, getGSCfilename} from "../utils/gcsUtils";
import {User} from "../../db/entities/User";

export const deleteProfileImageFromGCSIfExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

		const user = await userRepo.findOne(req.user);

		if (!user) throw new Error("No user was found in the database!");

		const keyFile =
			"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

		const gcs = new Storage({
			keyFilename: keyFile,
			projectId: "poem-art",
		});

		const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

		if (user.profilePicture) {
			const profilePictureName = getGSCfilename(user.profilePicture, "poem-art-bucket");

			await deleteGCSFile(bucket, profilePictureName);

			next();
		} else {
			next();
		}
	} catch (e) {
		console.log(e);
		next(e);
	}
};
