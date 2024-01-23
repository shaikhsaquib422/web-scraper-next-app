import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../util";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData proxy information
  // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_07de195b-zone-frugalfox:ugzu482an7hh -k https://lumtest.com/myip.json

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const port = 22225;

  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: `brd.superproxy.io`,
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $("#productTitle").text().trim();

    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock = $("#availability span")
      .text()
      .trim()
      .toLowerCase()
      .includes("currently unavailable.");

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    const stars = $("#averageCustomerReviews span").text().trim().slice(0, 3);
    const reviewsCount = +$("#acrCustomerReviewLink span")
      .text()
      .trim()
      .split(" ")[0]
      .replace(/[^0-9]/g, "");

    console.log(reviewsCount);

    console.log(typeof reviewsCount);

    const description = extractDescription($);

    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: reviewsCount,
      stars: stars,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      average: Number(currentPrice) || Number(originalPrice),
    };

    return data;

    // console.log(data);

    // console.log(discountRate + "****");

    // console.log(currency);

    // console.log(imageUrls);

    // console.log(outOfStock + "\n");

    // console.log(`${title}\n${currentPrice}\n${originalPrice}`);
  } catch (error: any) {
    throw new Error(`Failed to scrape new product ${error.message}`);
  }
}
