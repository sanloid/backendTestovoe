const { Pool } = require("pg");

const pool = new Pool({
  user: "ldygrtzf",
  host: "surus.db.elephantsql.com",
  database: "ldygrtzf",
  password: "7SEu6b0kzSD_tGObhbq35Jk0NBEKzsaT",
  port: 5432,
});

pool
  .query(
    "CREATE TABLE users (id SERIAL PRIMARY KEY, gender VARCHAR(10) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, street_number INTEGER NOT NULL, street_name VARCHAR(100) NOT NULL, city VARCHAR(50) NOT NULL, state VARCHAR(50) NOT NULL, country VARCHAR(50) NOT NULL, postcode VARCHAR(20) NOT NULL, email VARCHAR(100) NOT NULL, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL); "
  )
  .then(() => console.log("created table users"));
