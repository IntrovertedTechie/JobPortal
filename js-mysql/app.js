const mysql = require("mysql");

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"password",
});

// Database Connection Test
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL");
  }

  // Close the connection after testing
  connection.end();
});
