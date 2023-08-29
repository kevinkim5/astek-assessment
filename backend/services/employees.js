const path = require("path");
const db = require("./db");
const helper = require("../helper");
const Logger = require("../logger");
const logger = Logger(path.basename(__filename));

const addEmployee = async (employeeData) => {
  logger.info("Adding new employee");

  try {
    // get the max ID first
    const idLength = 7;
    let maxIdQuery = `SELECT MAX(REPLACE(id, "UI", "")) as max_id FROM employee;`;
    const id = await db.query(maxIdQuery);
    const data = helper.emptyOrRows(id);

    let maxId = 0;
    if (data.length > 0) {
      maxId = parseInt(data[0]["max_id"]);
    }

    let newId = "UI" + (maxId + 1).toString().padStart(idLength, "0");

    let addQuery = `
    INSERT INTO employee (id, name, email_address, phone_number, gender)
    VALUES (
      "${newId}",
      "${employeeData.Name}",
      "${employeeData["Email Address"]}",
      "${employeeData["Phone Number"]}",
      "${employeeData.Gender}"
    )
    `;

    await db.query(addQuery);

    let workQuery = `
    INSERT INTO work_assignment (employee_id, cafe_id, start_date)
    VALUES ("${newId}", "${employeeData["Assigned Cafe"]}", CURDATE());
    `;
    await db.query(workQuery);

    logger.info("Added new employee!");
    return data;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const deleteEmployee = async (employeeData) => {
  logger.info("Deleting employee");
  logger.info(JSON.stringify(employeeData));
  let deleteAssign = `
  DELETE FROM work_assignment
  WHERE employee_id = "${employeeData["Employee ID"]}";
  `;
  let deleteEmployee = `
  DELETE FROM employee
  WHERE id = "${employeeData["Employee ID"]}";
  `;

  try {
    logger.info("Deleting assignment");
    await db.query(deleteAssign);

    logger.info("Deleting employee");
    await db.query(deleteEmployee);
    logger.info("Deleted employee data!");
    return { messaage: "Deleted employee" };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const getEmployees = async (cafe) => {
  let query = `
    SELECT
      e.id as "Employee ID",
      e.name as "Name",
      e.email_address as "Email Address",
      e.phone_number as "Phone Number",
      c.name as "Cafe Name",
      cafe_id as "Assigned Cafe",
      gender as "Gender",
      DATEDIFF(curdate(), start_date) as "Days Worked"
    FROM employee e
    LEFT JOIN work_assignment wa
    ON e.id = wa.employee_id
    LEFT JOIN cafe c
    ON c.id = wa.cafe_id
  `;

  if (cafe !== "") {
    query += `
      WHERE c.name = "${cafe}"
    `;
  }

  query += `ORDER BY "Days Worked" DESC`;

  try {
    const rows = await db.query(`${query};`);
    const data = helper.emptyOrRows(rows);
    logger.info("Retrieved employee data!");
    return { data };
  } catch (err) {
    logger.error(err);
  }
};

const updateEmployees = async (employeeData) => {
  try {
    let updateWorkQuery = `
    INSERT INTO work_assignment (employee_id, cafe_id, start_date)
    VALUES (
      "${employeeData["Employee ID"]}",
      "${employeeData["Assigned Cafe"]}",
      CURDATE()
    )
    ON DUPLICATE KEY UPDATE
    cafe_id = "${employeeData["Assigned Cafe"]}",
    start_date = CURDATE();
    `;

    let updateEmpQuery = `
    UPDATE employee
    SET
      name = "${employeeData["Name"]}",
      email_address = "${employeeData["Email Address"]}",
      phone_number = "${employeeData["Phone Number"]}",
      gender = "${employeeData["Gender"]}"
    WHERE id = "${employeeData["Employee ID"]}";
    `;

    await db.query(updateWorkQuery);
    await db.query(updateEmpQuery);

    logger.info("Updated employee data!");
    return { message: "Updated employee data!" };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

module.exports = {
  addEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployees,
};
