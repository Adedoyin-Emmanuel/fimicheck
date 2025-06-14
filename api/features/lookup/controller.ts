import { Request, Response } from "express";

import { lookupSchema } from "./schema";
import { response } from "./../../utils";
import { scrapePlateNumber } from "./scraper";

export default class LookupController {
  public static async getPlateNumberInfo(req: Request, res: Response) {
    const values = await lookupSchema.validateAsync(req.body);
    const result = await scrapePlateNumber(values.plateNumber);

    if (result.isFailure) {
      return response(res, 400, result.errors[0].message);
    }

    return response(
      res,
      200,
      "Plate number info retrieved successfully",
      result.value
    );
  }
}
