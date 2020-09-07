import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";

export const getArtPoemsByCollectionController = async (req: Request, res: Response) => {
	const connection = getConnection(process.env.NODE_ENV);

	const collectionName = req.query.collection;
	const poemCount = parseInt(req.query.poemCount as string);

	try {
		const artPoemsFromCollection = await connection.query(
			`
			SELECT art_poem.*
			FROM art_poem
			LEFT JOIN art_poem_collections_collection AS jt ON art_poem.id = jt.artPoemId
			LEFT JOIN collection ON jt.collectionId = collection.id
			WHERE collection.name = ?
			LIMIT ?;
		`,
			[collectionName, poemCount]
		);

		res.status(200).json(jsonResponse(true, JSON.stringify(artPoemsFromCollection)));
	} catch (e) {
		console.log(e);

		res.status(404).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the artPoems!",
				})
			)
		);
	}
};
