import express from "express";
import {postCommentController} from "../controllers/comment/postCommentController";
import {getCommentsController} from "../controllers/comment/getCommentsController";
import {deleteCommentsController} from "../controllers/comment/deleteCommentsController";
import {editCommentController} from "../controllers/comment/editCommentController";

const commentsRouter = express.Router();

commentsRouter.get("/get", getCommentsController);
commentsRouter.post("/post", postCommentController);
commentsRouter.put("/edit", editCommentController);
commentsRouter.delete("/delete", deleteCommentsController);

export default commentsRouter;
