import mongoose from "mongoose";

const postingSchema = mongoose.Schema({
  userId: {
    type: String,
    maxLength: 50,
  },
  image: {
    type: Object,
  },
  content: {
    type: String,
  },
  hashtag: {
    type: Array,
  },
  likes: {
    type: Number,
    default: 0
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  }
});

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const Posting = mongoose.model("Posting", postingSchema);

export default Posting;