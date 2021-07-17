import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
    hashtag: {
      type: String,
      unique: true,
      minlength: 2
    },
    searchcount: {
      type: Number,
      default: 0
    },
    synonym: {
      type: Array
    },
    city: {
        type: Array
    },
    continent: {
        type: String
    }
    
});

const Search = mongoose.model("Search", searchSchema);

export default Search;