import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {deleteGCSFile, getGSCfilename} from "../utils/gcsUtils";
import {User} from "../../db/entities/User";
import path from "path";

export const deleteProfileImageFromGCSIfExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

		const user = await userRepo.findOne(req.user);

		if (!user) throw new Error("No user was found in the database!");

		const keyFile = path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

		if (!keyFile) throw new Error("Google Cloud Storage keyfile was not generated properly.");

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
