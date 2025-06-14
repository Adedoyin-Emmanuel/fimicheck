import axios from "axios";
import * as cheerio from "cheerio";
import { ok, fail } from "tsfluent";

export const scrapePlateNumber = async (plateNumber: string) => {
  try {
    const url = process.env.PLATENUMBER_VERIFICATION_URL as string;

    const formData = new FormData();
    formData.append("plateNumber", plateNumber);

    const resposne = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const $ = cheerio.load(resposne.data);

    const table = $("#print");

    const makeText = table
      .find("tr:contains('Vehicle Make') td:last-child span")
      .text()
      .trim();
    const colorText = table
      .find("tr:contains('Vehicle Color') td:last-child span")
      .text()
      .trim();

    if (!makeText || !colorText) {
      return fail("Vehicle details not found in response");
    }

    return ok({
      make: makeText,
      color: colorText,
    });
  } catch (error: unknown) {
    return fail("Failed to retrieve plate number info");
  }
};
