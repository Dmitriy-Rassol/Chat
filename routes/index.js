var express = require("express");
var router = express.Router();
const redis = require("../database/redis");
let runnung = false;
/* GET home page. */
router.get("/", async function (req, res, next) {
let count = 0;
    count = await redis.get("count", count);
    count++;
    await redis.set("count", count);

    res.send({count})
});

router.get("/stop", async function (req, res, next) {
  runnung = false;
  res.send({ title: "Express" });
});

module.exports = router;
