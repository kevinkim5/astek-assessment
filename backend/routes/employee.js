const express = require("express");
const path = require("path");
const router = express.Router();
const Logger = require("../logger");
const logger = Logger(path.basename(__filename));
const employees = require("../services/employees");

router.get("/", async function (req, res, next) {
  logger.info("GET: Fetching employees");
  try {
    let cafe = "";
    if ("cafe" in req.query) {
      cafe = req.query.cafe;
    }
    res.json(await employees.getEmployees(cafe));
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
});

router.post("/add", async function (req, res, next) {
  logger.info("POST: Add new employee");

  try {
    res.json(await employees.addEmployee(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

router.post("/delete", async function (req, res, next) {
  logger.info("POST: Deleting employee");

  try {
    res.json(await employees.deleteEmployee(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

router.put("/", async function (req, res, next) {
  logger.info("PUT: Updating employee details");

  try {
    res.json(await employees.updateEmployees(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

module.exports = router;
