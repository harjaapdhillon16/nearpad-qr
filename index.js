const express = require("express");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
const app = express();
const qrcode = require("qrcode");

app.use(urlencoded({ extended: false }));
app.use(express.json({ extended: true }));
app.use(json());
app.use(cors({ origin: true, methods: ["POST"] }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.path);
  next();
});

app.get("/getbase64image?", (req, res) => {
  const { data } = req.query;
  qrcode.toDataURL(
    data,
    { errorCorrectionLevel: "H", quality: 1 },
    (err, base64QRCode) => {
      if (err) throw err;
      console.log(base64QRCode);
      res.send({ qrcodedata: base64QRCode });
    }
  );
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app running on port " + port);
});
