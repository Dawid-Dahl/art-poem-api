import {
	jsonResponse,
	addCollectionToPoemAndRemoveAllOtherCollections,
	doesPoemIncludeCollection,
} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../../db/entities/ArtPoem";
import {Storage, Bucket} from "@google-cloud/storage";
import {Collection} from "../../../db/entities/Collection";
import {getGSCfilename} from "../../utils/gcsUtils";

export const editArtPoemController = async (req: Request, res: Response) => {
	const {
		poemId,
		poemTitle,
		poemCollectionId,
		poemContent,
	}: {
		poemId: number;
		poemTitle: string;
		poemCollectionId: number;
		poemContent: string;
	} = JSON.parse(req.body.editPoemFields);

	const keyFile =
		"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

	const gcs = new Storage({
		keyFilename: keyFile,
		projectId: "poem-art",
	});

	const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

	const deleteGCSFile = async (bucket: Bucket, name: string | undefined) => {
		if (!name) throw new Error("Name arg wasn't properly passed");

		await bucket.file(name).delete();

		console.log(`gs://${bucket.name}/${name} --- DELETED.`);
	};

	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const artPoem = await artPoemRepo.findOne(poemId.toString() as string, {
		relations: ["collections"],
	});
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);

	if (!artPoem) {
		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the ArtPoem!",
				})
			)
		);
		return;
	}

	try {
		if (req.file) {
			console.log("THE ART POEM INSIDE REQ.FILE TO BE DELETED: ", artPoem);

			await deleteGCSFile(bucket, getGSCfilename(artPoem.imageUrl, "poem-art-bucket")).catch(
				console.error
			);

			await getConnection(process.env.NODE_ENV)
				.createQueryBuilder()
				.update(ArtPoem)
				.set({imageUrl: req.gcsPublicUrl})
				.where("id = :id", {id: poemId})
				.execute();
		}

		if (!doesPoemIncludeCollection(artPoem, poemCollectionId)) {
			await addCollectionToPoemAndRemoveAllOtherCollections(artPoemRepo, collectionRepo)(
				poemId,
				poemCollectionId
			);
		}

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.update(ArtPoem)
			.set({title: poemTitle, content: poemContent})
			.where("id = :id", {id: poemId})
			.execute();

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "ArtPoem was edited successfully!",
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to edit the ArtPoem!",
				})
			)
		);
	}
};
