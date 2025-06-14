import { Request, Response } from "express";
import { response } from "./../../utils";

class BaseController {
  static async Hello(req: Request, res: Response) {
    return response(res, 200, "Hi, I'm Mr MeeSeeks, Look at me 🫣");
  }
}

export default BaseController;
