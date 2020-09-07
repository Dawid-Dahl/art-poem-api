import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Storage} from "@google-cloud/storage";
import {jsonResponse} from "../../utils/utils";
import {User} from "../../../db/entities/User";
import {ArtPoem} from "../../../db/entities/ArtPoem";
import {Collection} from "../../../db/entities/Collection";

export const uploadArtPoemController = async (req: Request, res: Response) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);

	const {title, collection, poem} = JSON.parse(req.body.poemFields);

	try {
		const artPoem = new ArtPoem();

		const user = await userRepo.findOne(req.user);
		const collectionQuery = await collectionRepo.find({where: {user: req.user}});

		if (!user) throw new Error("No user could be found in DB");
		if (!collectionQuery)
			throw new Error("Something went wrong while trying to get the users collections");

		const filteredCollection = collectionQuery.filter(x => x.name === collection)[0];

		artPoem.title = title;
		artPoem.content = poem;
		artPoem.imageUrl = req.gcsPublicUrl ?? "";
		artPoem.user = user;
		artPoem.collections = [filteredCollection];

		const insertResult = await artPoemRepo.save(artPoem);

		console.log("ArtPoem was uploaded!");

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "ArtPoem uploaded successfully!",
					id: insertResult.id,
					publicUrl: req.gcsPublicUrl,
				})
			)
		);
	} catch (e) {
		console.log(e);

		const keyFile =
			"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

		const gcs = new Storage({
			keyFilename: keyFile,
			projectId: "poem-art",
		});

		const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

		const file = req.gcsFileName ? bucket.file(req.gcsFileName) : undefined;

		file?.delete()
			.then(_res => console.log("File was deleted from Google Cloud Storage!"))
			.catch(e => console.log(e));

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to upload the ArtPoem!",
				})
			)
		);
	}
};
