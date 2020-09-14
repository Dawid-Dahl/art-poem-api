import crypto from "crypto";
import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {replaceSpacesInString, jsonResponse} from "../utils/utils";
import path from "path";

export const uploadGCSProfileImageFile = (req: Request, res: Response, next: NextFunction) => {
	const keyFile = path.join("./", process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

	if (!keyFile) throw new Error("Google Cloud Storage keyfile was not generated properly.");

	const gcs = new Storage({
		keyFilename: keyFile,
		projectId: "poem-art",
	});

	const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

	if (!req.file) {
		console.log("No file was supplied, returning a 400 error.");
		res.status(400).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "No file was supplied!",
				})
			)
		);
		return;
	}

	const sanitizedFileName = req.file.originalname.includes(" ")
		? replaceSpacesInString(req.file.originalname, "_")
		: req.file.originalname;

	const fileName = `${req.user}/profile-image/${Date.now()}-${crypto
		.randomBytes(3)
		.toString("hex")}-${sanitizedFileName}`;

	const file = bucket.file(fileName);

	file.createWriteStream({
		resumable: false,
		metadata: {
			contentType: req.file.mimetype,
		},
		gzip: true,
	})
		.on("error", err => next(err))
		.on("finish", () => {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

			req.gcsPublicUrl = publicUrl;
			req.gcsFileName = fileName;

			next();
		})
		.end(req.file.buffer);
};
