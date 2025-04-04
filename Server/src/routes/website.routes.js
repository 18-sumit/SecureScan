import express from "express";
import { analyzeWebsite } from "../services/scraper.js";
import ApiError from "../utils/ApiError.utils.js"
import ApiResponse from "../utils/ApiResponse.utils.js";


export const analyzeRouter = express.Router();


//API Route : Analyze Website
router.post("/analyze", async (req, res) => {
    const { url } = req.body;
    if (!url) {
        throw new ApiError(400, "URL is required");
    }

    const result = await analyzeWebsite(url);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { result },
                "Successfully analyzed the website"
            )
        )
})
