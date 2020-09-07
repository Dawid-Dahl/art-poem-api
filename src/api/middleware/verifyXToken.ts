import {Request, Response, NextFunction} from "express-serve-static-core";
import jwt from "jsonwebtoken";
import {removeBearerFromTokenHeader, extractPayloadFromBase64JWT} from "../utils/utils";

const verifyXToken = (req: Request, res: Response, next: NextFunction) => {
	const tokenWithoutBearer = removeBearerFromTokenHeader(req.get("x-token"));

	if (tokenWithoutBearer) {
		jwt.verify(tokenWithoutBearer, process.env.PUB_KEY as string, err => {
			if (err) {
				res.status(401).json({
					success: false,
					payload: {
						message:
							"You are not authorized to access this resource, log in and try again",
					},
				});
			} else {
				req.user = extractPayloadFromBase64JWT(tokenWithoutBearer)?.sub;
				next();
			}
		});
	} else {
		res.status(401).json({
			success: false,
			payload: {
				message: "You are not authorized to access this resource, log in and try again",
			},
		});
	}
};

export default verifyXToken;
