import mongoose from "mongoose";

const postingSchema = mongoose.Schema({
  userId: {
    type: String,
    maxLength: 50,
  },
  image: {
    type: Array,
  },
  content: {
    type: String,
  },
  hashtag: {
    type: Array,
  },
  place: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0
  },
  likeUser: {
    type: Array,
    default: []
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: { createdAt: 'created_at'}});

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const Posting = mongoose.model("Posting", postingSchema);

export default Posting;