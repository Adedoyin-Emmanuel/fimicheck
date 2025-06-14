import axios from "axios";
import * as cheerio from "cheerio";
import { ok, fail } from "tsfluent";

export const scrapePlateNumber = async (plateNumber: string) => {
  try {
    const url = process.env.PLATENUMBER_VERIFICATION_URL as string;

    const formData = new FormData();
    formData.append("plateNumber", plateNumber);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const $ = cheerio.load(response.data);

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

    return ok<{ make: string; color: string }>({
      make: makeText,
      color: colorText,
    });
  } catch (error: unknown) {
    return fail("Failed to retrieve plate number info");
  }
};

export const scrapePossibleVehicleImages = async (
  make: string,
  color: string
) => {
  try {
    const url = "https://www.bing.com/images/search";
    const query = `${make} ${color}`;

    const response = await axios.get(url, {
      params: {
        q: query,
      },
    });

    const $ = cheerio.load(response.data);

    const imageResults: { url: string; title: string }[] = [];

    $(".iusc").each((_, element) => {
      const $element = $(element);
      const mData = $element.attr("m");

      if (mData) {
        try {
          const data = JSON.parse(mData);
          const imageUrl = data.murl;
          const title = $element.find(".infpd a").attr("title") || data.t || "";

          if (imageUrl) {
            imageResults.push({
              url: imageUrl,
              title: title,
            });
          }
        } catch (e) {}
      }
    });

    if (imageResults.length === 0) {
      return fail("No images found");
    }

    return ok(imageResults);
  } catch (error: unknown) {
    return fail("Failed to retrieve possible vehicle images");
  }
};
