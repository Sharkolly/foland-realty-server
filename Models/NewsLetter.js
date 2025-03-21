import { Schema, model } from "mongoose";

const newsLetterSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email has been subscribed already"],
  },
}, {timestamps: true});

const NewsLetter = model("NewsLetter", newsLetterSchema);

export default NewsLetter;
