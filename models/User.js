import mongoose from "mongoose";
import findOrCreate from 'mongoose-findorcreate';

  const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },
    password: {
        type: String,
        minlength: 5
    },
    profileImg: {
        type: String
    },
    favorite: {
        type: Array
    },
    status: {
        type: Boolean,
        default: true,
    },
    provider: {
        type: String
    },
    socialId: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at'}})

userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);

export default User;
