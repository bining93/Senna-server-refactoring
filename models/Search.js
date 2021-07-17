import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
    hashtag: {
      type: String,
      required: true,
      unique: true,
      minlength: 2
    },
    searchcount: {
      type: Number,
      default: 1
    },
 
    likecount: {
      type: Number,
      default: 1
    },

    synonym: {
      type: Array
    },
    forbidden: {
      type: Boolean,
      default: false
    },

});

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const Search = mongoose.model("Search", searchSchema);

export default Search;