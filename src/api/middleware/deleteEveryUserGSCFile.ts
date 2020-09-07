import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {User} from "../../db/entities/User";

export const deleteEveryUserGSCFile = async (req: Request, res: Response, next: NextFunction) => {
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
