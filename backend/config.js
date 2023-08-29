const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "astek_assess",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
