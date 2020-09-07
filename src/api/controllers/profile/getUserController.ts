import {Request, Response} from "express-serve-static-core";
import {jsonResponse} from "../../utils/utils";
import {getConnection} from "typeorm";
import {User} from "../../../db/entities/User";

export const getUserController = async (req: Request, res: Response) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

	const id = req.params.id;

	try {
		const user = await userRepo.findOne(id);

		res.json(jsonResponse(true, JSON.stringify({user})));
	} catch (e) {
		console.log(e);
		res.status(401).json(jsonResponse(false));
	}
};
