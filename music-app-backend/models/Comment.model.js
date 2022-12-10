const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    theComments: {
      type: String
    },
    user: { type: 
        [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    songs: { type: 
        [{type: Schema.Types.ObjectId, ref: 'Song'}]
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;