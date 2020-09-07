import {Request, Response} from "express-serve-static-core";
import {jsonResponse} from "../../utils/utils";

export const deleteUserAccountAndDataController = (req: Request, res: Response) => {
	try {
		res.status(200).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: `User ${req.user} and all its data was successfully deleted from the Main server`,
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message:
						"Something went wrong while trying to delete the user and its data from the Main server!",
				})
			)
		);
	}
};
