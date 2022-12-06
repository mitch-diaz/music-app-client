const { Schema, model } = require("mongoose");

const songSchema = new Schema(
  {
    songTitle: String,
    user: { type: 
        [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    comments: { type: 
        [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
  },
  {
    timestamps: true,
  }
);

const Song = model("Song", songSchema);

module.exports = Song;