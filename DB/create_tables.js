const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "samah",
  database: 'econome'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Create User table
const createUserTable = `
  CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    dateOfBirth DATE,
    phoneNumber VARCHAR(50),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Create IncomeSource table
const createIncomeSourceTable = `
  CREATE TABLE IF NOT EXISTS IncomeSource (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    initialAmount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id)
  )
`;

// Create Transaction table
const createTransactionTable = `
  CREATE TABLE IF NOT EXISTS Transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    incomeSourceId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    notes TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (incomeSourceId) REFERENCES IncomeSource(id)
  )
`;


// Execute table creation queries
connection.query(createUserTable, (err, results) => {
  if (err) throw err;
  console.log('User table created');
});

connection.query(createIncomeSourceTable, (err, results) => {
  if (err) throw err;
  console.log('IncomeSource table created');
});

connection.query(createTransactionTable, (err, results) => {
  if (err) throw err;
  console.log('Transaction table created');
});


// Close the connection
connection.end();
