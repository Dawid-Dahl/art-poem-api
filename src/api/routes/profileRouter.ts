import express from "express";
import multer from "multer";
import {postProfileImageController} from "../controllers/profile/postProfileImageController";
import {uploadGCSProfileImageFile} from "../middleware/uploadGCSProfileImageFile";
import {deleteProfileImageFromGCSIfExists} from "../middleware/deleteProfileImageFromGCSIfExists";
import {getUserController} from "../controllers/profile/getUserController";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, change as needed.
	},
});

const profileRouter = express.Router();

profileRouter.get("/get/:id", getUserController);

profileRouter.post(
	"/post-profile-image",
	deleteProfileImageFromGCSIfExists,
	upload.single("profilePictureInput"),
	uploadGCSProfileImageFile,
	postProfileImageController
);

export default profileRouter;
