const mysql = require('mysql2/promise');
const fs = require('fs');
const tunnel = require('tunnel-ssh');

const sshConfig = {
  host: 'ec2-3-108-64-222.ap-south-1.compute.amazonaws.com',
  port: 22,
  username: 'ubuntu',
  privateKey: fs.readFileSync('A:/LEPAKSHI/DbKey.ppk') // Ensure correct path
};

const dbConfig = {
  user: 'sagnik',
  password: 'sagnik_das',
  database: 'dev_amigo_db',
  host: 'ec2-3-108-64-222.ap-south-1.compute.amazonaws.com', // MySQL accessed via SSH tunnel
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, // Max connections in the pool
  queueLimit: 0
};

let pool; // Connection pool

async function initDB() {
  try {
    pool = await mysql.createPool(dbConfig);
    console.log('✅ MySQL Connection Pool Created');
  } catch (err) {
    console.error('❌ Database Pool Initialization Failed:', err);
  }
}

async function queryDatabase(sql, params = []) {
  if (!pool) {
    console.error('❌ Database Connection Not Ready');
    throw new Error('Database Connection Not Ready');
  }

  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error('❌ Query Execution Failed:', err);
    throw err;
  }
}

module.exports = { initDB, queryDatabase };