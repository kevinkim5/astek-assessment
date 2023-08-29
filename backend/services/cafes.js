const path = require("path");
const db = require("./db");
const helper = require("../helper");
const Logger = require("../logger");
const logger = Logger(path.basename(__filename));

const deleteCafe = async (cafeData) => {
  let deleteAssign = `DELETE FROM work_assignment WHERE cafe_id = "${cafeData.id}";`;
  let deleteCafe = `DELETE FROM cafe WHERE id = "${cafeData.id}";`;

  try {
    await db.query(deleteAssign);
    await db.query(deleteCafe);

    return { messaage: "Deleted cafe" };
  } catch (err) {
    logger.error(err);
    throw err;
  }
  x;
};

const getCafes = async (location) => {
  let query = `
  SELECT
    c.name as "Name",
    c.description as "Description",
    COUNT(wa.employee_id) as employees,
    c.location as "Location",
    c.id
  FROM cafe c
  LEFT JOIN work_assignment wa
  ON c.id = wa.cafe_id
  `;

  if (location !== "") {
    query += `WHERE c.id IN (SELECT id FROM cafe WHERE location = "${location}")`;
  }

  query += `
  GROUP BY c.name, c.description, c.location, c.id
  ORDER BY employees DESC;
  `;

  try {
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
    return { data };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const postCafes = async (cafeData) => {
  let requiredKeys = ["name", "description", "location"];
  if (requiredKeys.every((i) => i in cafeData)) {
    let query = `
    INSERT INTO cafe (id, name, description, location, logo)
    VALUES (
      uuid(),
      "${cafeData.Name}",
      "${cafeData.Description}",
      "${cafeData.Location}",
      ${"logo" in cafeData ? `"${cafeData.logo}"` : null}
      )
    `;

    try {
      await db.query(`${query};`);
      logger.info("Added cafe");
      return { message: "Added cafe" };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  } else {
    return { message: "Invalid data to add cafe" };
  }
};

const updateCafe = async (cafeData) => {
  let updateQuery = `
  UPDATE cafe
  SET
  name = "${cafeData.Name}",
  description = "${cafeData.Description}",
  location = "${cafeData.Location}"
  WHERE id = "${cafeData.id}";
  `;

  try {
    await db.query(`${updateQuery};`);
    logger.info("Updated cafe");
    return { message: "Updated cafe" };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

module.exports = {
  deleteCafe,
  getCafes,
  postCafes,
  updateCafe,
};
