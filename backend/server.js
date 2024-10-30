const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "substitute",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

app.get("/api/substitute", (req, res) => {
  db.query(
    "SELECT * FROM sub_candidates WHERE first_name = Alisa",
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
