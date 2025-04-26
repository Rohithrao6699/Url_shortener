const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UrlSchema = new schema({
  url: String,
  shortUrl: String,
});

const UrlModel = mongoose.model("urls", UrlSchema);

module.exports = {
  UrlModel,
};
