import mysql from "mysql2";
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} from "../config/config";

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database.");
});

export default db;
