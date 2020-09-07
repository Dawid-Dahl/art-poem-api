import express from "express";
import {deleteUserAccountAndDataController} from "../controllers/account/deleteUserAccountAndDataController";
import {deleteEveryUserGSCFile} from "../middleware/deleteEveryUserGSCFile";
import {deleteAllMainServerUserData} from "../middleware/deleteAllMainServerUserData";

const accountRouter = express.Router();

accountRouter.delete(
	"/delete-account-data",
	deleteEveryUserGSCFile,
	deleteAllMainServerUserData,
	deleteUserAccountAndDataController
);

export default accountRouter;
