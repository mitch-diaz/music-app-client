const { Schema, model } = require("mongoose");

const songSchema = new Schema(
  {
    songTitle: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: { type: 
        [{type: Schema.Types.ObjectId, ref: 'Comment'}] // !! CHECK THIS SYNTAX
    },
  },
  {
    timestamps: true,
  }
);

const Song = model("Song", songSchema);
module.exports = Song;