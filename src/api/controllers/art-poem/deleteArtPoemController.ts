import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Storage} from "@google-cloud/storage";
import {deleteGCSFile, getGSCfilename} from "../../utils/gcsUtils";
import {ArtPoem} from "../../../db/entities/ArtPoem";
import {Like} from "../../../db/entities/Like";
import {Comment} from "../../../db/entities/Comment";

export const deleteArtPoemController = async (req: Request, res: Response) => {
	const artPoemId = req.body.artPoemId as number;

	if (!artPoemId) {
		res.status(404).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Didn't receive an Artpoem ID!",
				})
			)
		);
	}

	const keyFile =
		"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

	const gcs = new Storage({
		keyFilename: keyFile,
		projectId: "poem-art",
	});

	const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

	try {
		const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);

		const artPoem = await artPoemRepo.findOne(artPoemId);

		if (!artPoem) throw new Error("No Artpoem was found in the database!");

		await deleteGCSFile(bucket, getGSCfilename(artPoem.imageUrl, "poem-art-bucket")).catch(
			console.error
		);

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Like)
			.where("artpoemId = :artpoemId", {artpoemId: artPoemId})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Comment)
			.where("artpoemId = :artpoemId", {artpoemId: artPoemId})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(ArtPoem)
			.where("id = :id", {id: artPoemId})
			.execute();

		res.status(200).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "ArtPoem was deleted successfully!",
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to delete the ArtPoem!",
				})
			)
		);
	}
};
