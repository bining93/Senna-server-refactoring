import mongoose from "mongoose";

const citySchema = mongoose.Schema({
    city: {
      type: String
    },
    searchcount: {
      type: Number,
      default: 0
    },
    synonym: {
      type: Array
    }
});

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const City = mongoose.model("City", citySchema);

export default City;