import { asyncHandler } from "../utils/asyncHandler.utils.js"
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import logger from "../utils/logger.js"
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh Token"
        )
    }
}


const registerUser = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // logger.info(req.body);
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(
            409,
            "User with emailId already exists"
        )
    }

    const user = await User.create(
        {
            name,
            email,
            password
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        )
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "User created successfully"
            )
        )
});


const loginUser = asyncHandler(async (req, res) => {

    logger.info(req.body);
    const { email, password } = req.body;

    if (!email && !password) {
        throw new ApiError(
            400,
            "Please provide email or password"
        )
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(
            404,
            "User does not exists"
        )
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid credentials"
        )
    }

    const { accessToken, refreshToken } = generateAccessRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        )
});


export {
    registerUser,
    loginUser
}