const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'JobPortal',
});

// Function to execute SQL queries
async function executeQuery(query, values = []) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(query, values);
    return rows;
  } finally {
    connection.release();
  }
}

// Function to encrypt password
async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Function to create sample data
async function createSampleData() {
  try {
    // Create users
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: await encryptPassword('password1'),
        role: 0,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: await encryptPassword('password2'),
        role: 1,
      },
    ];

    // Insert users into the database
    const userInsertQuery = 'INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)';
    for (const user of users) {
      await executeQuery(userInsertQuery, [user.firstName, user.lastName, user.email, user.password, user.role]);
    }

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    // End the connection pool
    pool.end();
  }
}

// Call the createSampleData function to populate the database
createSampleData();

