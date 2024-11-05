// importData.js
const fs = require('fs');
const { Pool } = require('pg');
const csv = require('csv-parser');
require('dotenv').config();
const path = require('path');
const folderPath = path.join(__dirname, '../data');

// Set up PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DB_HOST,
});

// Function to import CSV data into a table
const importCSV = (filePath, tableName, columns) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    // Read CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');

          for (const row of results) {
            const values = columns.map((col) => row[col]);
            const placeholders = columns.map((_, idx) => `$${idx + 1}`).join(', ');
            
            const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
            await client.query(query, values);
          }

          await client.query('COMMIT');
          console.log(`Data successfully imported into ${tableName}`);
          resolve();
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(`Error importing data into ${tableName}:`, error);
          reject(error);
        } finally {
          client.release();
        }
      });
  });
};

// Import users and recommendations data
const importData = async () => {
  try {
    // Import users.csv
    const usersPath = path.join(folderPath, 'users.csv');
    await importCSV(usersPath, 'users', [
      'id',
      'fname',
      'sname',
      'profile_picture',
      'bio',
      'created_at',
    ]);

    // Import recommendations.csv
    const recommendationPath = path.join(folderPath, 'recommendations.csv');
    await importCSV(recommendationPath, 'recommendations', [
      'id',
      'user_id',
      'title',
      'caption',
      'category',
      'created_at',
    ]);

    console.log('Data import complete');
  } catch (error) {
    console.error('Data import failed:', error);
  } finally {
    pool.end();
  }
};

// Run the import
importData();
