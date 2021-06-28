import mongoose from "mongoose";

  const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    favorite: {
        type: Array,
    },
    profileImage: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    }
})
// userSchema.methods.dudify = () => {
//     this.name = this.name + '-dude';
//     return this.name;
// }
const User = mongoose.model("User", userSchema);
// 모델의 이름과 스키마를 이용해 모델의 정의함.
export default User;
