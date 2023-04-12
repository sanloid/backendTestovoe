const express = require("express");
const axios = require("axios");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "ldygrtzf",
  host: "surus.db.elephantsql.com",
  database: "ldygrtzf",
  password: "7SEu6b0kzSD_tGObhbq35Jk0NBEKzsaT",
  port: 5432,
});

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const results = response.data.results;

    for (let result of results) {
      const { gender, name, location, email, login } = result;

      await pool.query(
        "INSERT INTO users (gender, first_name, last_name, street_number, street_name, city, state, country, postcode, email, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [
          gender,
          name.first,
          name.last,
          location.street.number,
          location.street.name,
          location.city,
          location.state,
          location.country,
          location.postcode,
          email,
          login.username,
          login.password,
        ]
      );
    }

    res.send("Data inserted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting users from database");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
