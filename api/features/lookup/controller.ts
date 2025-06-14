import { Request, Response } from "express";

import { lookupSchema } from "./schema";
import { response } from "./../../utils";
import { scrapePlateNumber, scrapePossibleVehicleImages } from "./scraper";

export default class LookupController {
  public static async getPlateNumberInfo(req: Request, res: Response) {
    const values = await lookupSchema.validateAsync(req.body);
    const result = await scrapePlateNumber(values.plateNumber);

    if (result.isFailure) {
      return response(res, 400, result.errors[0].message);
    }

    const vehicleInfo = result.value as { make: string; color: string };

    const imagesResult = await scrapePossibleVehicleImages(
      vehicleInfo.make,
      vehicleInfo.color
    );

    if (imagesResult.isFailure) {
      return response(res, 400, imagesResult.errors[0].message);
    }

    return response(res, 200, "Plate number info retrieved successfully", {
      vehicleInfo,
      images: imagesResult.value,
    });
  }
}
