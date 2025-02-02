import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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
            required: () => {
                return !this.googleId; // If Google OAuth is used, password is not required
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
        googleId: {
            type: String,
            unique: true,
            sparse: true // Allows either email-based or Google login
        },
        isVerified: {
            type: Boolean,
            default: false, // set to true after email is verified
        },
        loginAttempts: {
            type: Number,
            default: 0, // helps to track brute force attack
        },
        //lockUntill : {
        // type: Date
        // }
        lastLogin: {
            type: Date // Track when the user last logged in
        },
        resetPasswordToken: String,
        restePasswordExpires: Date // Expiry time for password reset token
    },
    {
        timestamps: true
    },
);

// Indexing for faster search queries
UserSchema.index({ email: 1 });
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



export const User = mongoose.models.User || mongoose.model("User", UserSchema)