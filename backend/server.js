const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/substitute", (req, res) => {
  const subject = req.query.subject;
  const query = "SELECT * FROM sub_candidates WHERE subjects = ?";
  db.query(query, [subject], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
