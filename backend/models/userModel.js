const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'JobPortal',
});

// User schema
const userSchema = {
  firstName: {
    type: 'VARCHAR(32)',
    allowNull: false,
  },
  lastName: {
    type: 'VARCHAR(32)',
    allowNull: false,
  },
  email: {
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true,
  },
  password: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  role: {
    type: 'INT',
    defaultValue: 0,
  },
};

// Function to execute SQL queries
async function executeQuery(query, values = []) {
  const [rows] = await connection.execute(query, values);
  return rows;
}

// Function to encrypt password before saving
async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Function to compare user password
async function comparePassword(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}

// Function to return a JWT token
function getJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
}

module.exports = {
  userSchema,
  executeQuery,
  encryptPassword,
  comparePassword,
  getJwtToken,
};

