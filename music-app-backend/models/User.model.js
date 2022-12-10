const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    creatorTitle: {
      type: String
    },
    creatorProfile: {
      type: String
    },
    profilePic: {
      type: String
    },
    songs: { type: 
      [{type: Schema.Types.ObjectId, ref: 'Song'}]
    },
    videos: { type: 
      [{type: Schema.Types.ObjectId, ref: 'Video'}]
    },
    // following: { type: 
    //  [{type: Schema.Types.ObjectId, ref: 'User'}]
    // },
    // likes: { type: 
    //  [{type: Schema.Types.ObjectId, ref: 'Song'}]
    // },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;