import crypto from "crypto";
import path from "path";
import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {replaceSpacesInString, resizeMulterImage} from "../utils/utils";

export const uploadGCSFile = async (req: Request, res: Response, next: NextFunction) => {
	const keyFile =
		process.env.NODE_ENV === "production"
			? path.join("./", process.env.GOOGLE_APPLICATION_CREDENTIALS as string)
			: path.join(__dirname, "../../../", "poem-art-40049b821725.json");

	if (!keyFile) throw new Error("Google Cloud Storage keyfile was not generated properly.");

	const gcs = new Storage({
		keyFilename: keyFile,
		projectId: "poem-art",
	});

	const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

	if (!req.file) {
		console.log("No file was supplied, bypassing replaceGCSFile middleware.");
		next();
		return;
	}

	const sanitizedFileName = req.file.originalname.includes(" ")
		? replaceSpacesInString(req.file.originalname, "_")
		: req.file.originalname;

	const fileName = `${req.user}/${Date.now()}-${crypto
		.randomBytes(3)
		.toString("hex")}-${sanitizedFileName}`;

	const resizedMulterFile = await resizeMulterImage(req.file, 1920);

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
		.end(resizedMulterFile.buffer);
};
