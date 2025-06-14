import { Request, Response } from "express";
import { response } from "./../../utils";

class BaseController {
  static async Hello(req: Request, res: Response) {
    return response(res, 200, "Hello from the base controller!");
  }
}

export default BaseController;
