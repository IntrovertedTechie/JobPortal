const express = require("express");
const app = express();
const mysql = require("mysql"); 
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require("cookie-parser"); const errorHandler = require("./middleware/error");

// MySQL Connection

  const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database:"JobPortal", 
  password:"",
});

// Database Connection Test
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL");
  }
});
//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));    app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//    res.send("Hello from Node Js");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// error middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

