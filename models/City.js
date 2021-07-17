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

const City = mongoose.model("City", citySchema);

export default City;