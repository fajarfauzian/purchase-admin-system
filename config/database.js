const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: '',           
  database: 'purchase_system'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = connection.promise();