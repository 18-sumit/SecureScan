import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            // lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // email validation format
        },
        password: {
            type: String,
            required: function () {
                return !this.clerkId; // If clerk authentication is used, password is not required
            },
            select: false, //  prevent password from being fetched in queries
            validate: {
                validator: (v) => {
                    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v); // Password complexity validation
                },
                message:
                    "Password must be at least 8 characters long and contain at least one letter and one number.",
            },
        },
        clerkId: {
            type: String,
            unique: true,
            sparse: true // Allows either email-based or clerk login
        },
        isVerified: {
            type: Boolean,
            default: false, // set to true after email is verified
        },
        loginAttempts: {
            type: Number,
            default: 0, // helps to track brute force attack
        },
        lockUntill: {
            type: Date
        },
        lastLogin: {
            type: Date // Track when the user last logged in
        },
        resetPasswordToken: String,
        restePasswordExpires: Date, // Expiry time for password reset token
        preferences: {
            notifications: {
                type: Boolean,
                default: true
            }
        }
    },
    {
        timestamps: true
    },
);

// Indexing for faster search queries
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });


// Password hashing before saving

UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next(); // Skip hashing if password is not modified

    // Hash the password if it has been modified
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// method to check if account is locked due to failed logins :
UserSchema.methods.isLocked = function () {
    return this.lockUntill && this.lockUntill > Date.now();
}


// short lived tokens

UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// long lived tokens

UserSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.models.User || mongoose.model("User", UserSchema)