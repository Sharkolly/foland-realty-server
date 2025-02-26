const { Schema, model } = require("mongoose");

const newsLetterSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email has been subscribed already"],
  },
}, {timestamps: true});

const NewsLetter = model("NewsLetter", newsLetterSchema);

module.exports = NewsLetter;
