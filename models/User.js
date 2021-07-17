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
// userSchema.methods.dudify = () => {
//     this.name = this.name + '-dude';
//     return this.name;
// }
userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);
// 모델의 이름과 스키마를 이용해 모델의 정의함.
export default User;
