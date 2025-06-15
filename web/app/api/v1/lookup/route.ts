import { z } from "zod";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

const lookupSchema = z.object({
  plateNumber: z.string(),
});

const scrapePlateNumber = async (plateNumber: string) => {
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
      throw new Error("Vehicle details not found in response");
    }

    return {
      make: makeText,
      color: colorText,
    };
  } catch {
    throw new Error("Failed to retrieve plate number info");
  }
};

const scrapePossibleVehicleImages = async (make: string, color: string) => {
  try {
    const url = "https://www.bing.com/images/search";
    const query = `${make} ${color} Nigeria`;

    const response = await axios.get(url, {
      params: {
        q: query,
        mkt: "en-NG",
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; Infinix X650C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
        "Accept-Language": "en-NG,en;q=0.9",
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
        } catch {}
      }
    });

    if (imageResults.length === 0) {
      throw new Error("No images found");
    }

    return imageResults;
  } catch {
    throw new Error("Failed to retrieve possible vehicle images");
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plateNumber } = lookupSchema.parse(body);

    const vehicleInfo = await scrapePlateNumber(plateNumber);
    const images = await scrapePossibleVehicleImages(
      vehicleInfo.make,
      vehicleInfo.color
    );

    return NextResponse.json({
      status: "success",
      message: "Plate number info retrieved successfully",
      data: {
        vehicleInfo,
        images,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid request body",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 400 }
    );
  }
}
