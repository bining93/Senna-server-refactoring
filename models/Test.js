import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    nation: {
      type: String,
      required: true,
      unique: true,
    },
    continent: {
      type: String,
    },
    searchcount: {
      type: Number,
      default: 0
    },
    city: {
      type: Array
    }
});

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const Test = mongoose.model("Test", testSchema);

export default Test;