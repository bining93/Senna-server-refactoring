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

const Posting = mongoose.model("Posting", postingSchema);

export default Posting;