const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    reviewsOfArtist: {
        type: String
    },
    user: { type: 
        [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);
module.exports = Review;