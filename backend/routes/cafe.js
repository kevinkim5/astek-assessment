const express = require("express");
const path = require("path");
const router = express.Router();
const cafes = require("../services/cafes");
const Logger = require("../logger");
const logger = Logger(path.basename(__filename));

router.get("/", async function (req, res, next) {
  try {
    logger.info("GET: Fetching cafes");
    let location = "";
    if ("location" in req.query) {
      location = req.query.location;
    }

    res.json(await cafes.getCafes(location));
  } catch (err) {
    logger.error("Error", err.message);
    next(err);
  }
});

router.post("/add", async function (req, res, next) {
  logger.info("POST: Adding new cafe");
  try {
    res.json(await cafes.postCafes(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

router.post("/delete", async function (req, res, next) {
  logger.info("POST: Deleting cafe");
  try {
    res.json(await cafes.deleteCafe(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

router.put("/", async function (req, res, next) {
  logger.info("PUT: Updating cafe");
  try {
    res.json(await cafes.updateCafe(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

module.exports = router;
