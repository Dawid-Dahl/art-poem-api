import {jsonResponse, deleteAllPoemsAssociatedWithCollection} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Collection} from "../../../db/entities/Collection";
import {ArtPoem} from "../../../db/entities/ArtPoem";

export const deleteCollectionController = async (req: Request, res: Response) => {
	const connection = getConnection(process.env.NODE_ENV);
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const collectionId = req.query.collectionId;

	//Note: all Artpoems associated with the deleted collection will be deleted as well:

	const deletedArtPoemIds = await deleteAllPoemsAssociatedWithCollection(
		connection,
		artPoemRepo
	)(collectionId as string);

	try {
		const deleteResult = await collectionRepo.delete(collectionId as string);

		if (!deleteResult.affected) {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message: "Something went wrong while trying to delete the collection!",
					})
				)
			);
			return;
		}

		if (deleteResult.affected > 0) {
			res.status(200).json(
				jsonResponse(
					true,
					JSON.stringify({
						message: `The collection was successfully deleted!`,
						deletedArtPoemIds,
					})
				)
			);
		} else {
			res.status(404).json(
				jsonResponse(
					false,
					JSON.stringify({
						message:
							"No collection's associated with that id! Collection was not deleted.",
					})
				)
			);
		}
	} catch (e) {
		console.log(e);

		res.status(404).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to delete the collection!",
				})
			)
		);
	}
};
