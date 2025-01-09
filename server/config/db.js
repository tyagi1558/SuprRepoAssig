const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,      
  user: process.env.DB_USER,     
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT,    
  connectTimeout: Number(process.env.DB_TIMEOUT)});

con.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected to MySQL as id " + con.threadId);
});

module.exports = con;
