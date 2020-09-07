import express from "express";
import {postLikeController} from "../controllers/like/postLikeController";
import {postUnlikeController} from "../controllers/like/postUnlikeController";
import {getLikesByPoemController} from "../controllers/like/getLikesByPoemController";

const likesRouter = express.Router();

likesRouter.get("/get", getLikesByPoemController);
likesRouter.post("/post", postLikeController);
likesRouter.delete("/delete", postUnlikeController);

export default likesRouter;
