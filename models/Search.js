import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
  hashtag: {
    type: String,
  },
  searchcount: {
    type: Number,
    default: 0
  },
  likecount: {
    type: Number,
    default: 0
  },
  synonym: {
    type: String
  },
  forbidden: {
    type: String
  }
});

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const Search = mongoose.model("Search", searchSchema);

export default Search;