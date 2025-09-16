import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
} , { timestamps: true });

// Hash password before saving
UserSchema.pre("save" , async function(next) {
    if (!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password);
};

export default mongoose.model("User" , UserSchema);