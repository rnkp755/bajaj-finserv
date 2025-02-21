import { Router } from "express";
import { handlePost, handleGet } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/").post(handlePost);
userRouter.route("/").get(handleGet);

export default userRouter;
