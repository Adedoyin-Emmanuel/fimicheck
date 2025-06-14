import express from "express";
import BaseController from "./controller";

const baseRouter = express.Router();

baseRouter.get("/", BaseController.Hello);

export default baseRouter;
