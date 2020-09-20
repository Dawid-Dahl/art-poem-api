import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {User} from "../../db/entities/User";
import path from "path";

export const deleteEveryUserGSCFile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

		const user = await userRepo.findOne(req.user);

		if (!user) throw new Error("No user was found in the database!");

		const keyFile =
			process.env.NODE_ENV === "production"
				? path.join("./", process.env.GOOGLE_APPLICATION_CREDENTIALS as string)
				: path.join(__dirname, "../../../", "poem-art-40049b821725.json");

		if (!keyFile) throw new Error("Google Cloud Storage keyfile was not generated properly.");

		const gcs = new Storage({
			keyFilename: keyFile,
			projectId: "poem-art",
		});

		const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

		bucket.deleteFiles(
			{
				prefix: `${user.id}/`,
				force: true,
			},
			err => {
				if (!err) {
					console.log(`All files in the ${user.id}-directory have been deleted.`);
				}
			}
		);

		next();
	} catch (e) {
		console.log(e);
		next(e);
	}
};
