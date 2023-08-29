const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer();
dotenv.config();

const cafesRouter = require("./routes/cafe");
const employeesRouter = require("./routes/employee");
const Logger = require("./logger");

const app = express();
const logger = Logger(path.basename(__filename));
const port = 3000;

let corsOptions = {
  origin: "*",
};
app.use(cors({ options: corsOptions }));

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded
app.use(upload.any());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/cafes", cafesRouter);
app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});
