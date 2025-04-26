const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const { UrlModel } = require("./db/schema");
const { error } = require("console");

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

const app = express();
main();
app.use(cors());
app.use(express.json());

function generateUrl() {
  const shortrl = crypto.randomBytes(4).toString("hex");
  return shortrl;
}

app.post("/url", async function (req, res) {
  const { url } = req.body;
  const shortUrl = await generateUrl();
  try {
    if (url) {
      const urls = await UrlModel.create({
        url,
        shortUrl,
      });
      res.status(200).json({
        urls,
      });
    } else {
      res.status(400).json({
        msg: "not valid url",
      });
    }
  } catch (error) {
    res.json({
      msg: `the error is from post request ${error}`,
    });
  }
});

app.get("/:shorturl", async function (req, res) {
  const { shorturl } = req.params;

  try {
    if (!shorturl) {
      return res.status(400).json({ msg: "Please enter a valid short URL!" });
    }
    const urlData = await UrlModel.findOne({ shortUrl: shorturl });

    if (urlData) {
      return res.redirect(urlData.url); // Redirect to the original URL
    } else {
      return res.status(404).json({ msg: "URL not found!" });
    }
  } catch (error) {
    res.status(400).json({ msg: `error from get request ${error}` });
  }
});

async function main() {
  await mongoose.connect(mongoUri);
  app.listen(port, function (err) {
    if (err) console.log(error);
    console.log("listening on port 3000");
  });
}
