import mongoose from "mongoose";

  const userSchema = mongoose.Schema({
    userId: {
        type: String,
        maxLength: 50,
    },
    password: {
        type: String,
        minlength: 5,
    },
    profileImage: {
        type: String,
    },
    favorite: {
        type: Array,
    },
    status: {
        type: Boolean,
    }
})
const User = mongoose.model("User", userSchema);
// 모델의 이름과 스키마를 이용해 모델의 정의함.
export default User;
