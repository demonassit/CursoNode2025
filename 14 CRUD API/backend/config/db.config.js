// import dotenv from 'dotenv';
import mysql from 'mysql2';
// import path from 'path';
import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ 
//    path: path.resolve(__dirname, '../../.env') 
// });
dotenv.config();

const config = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'cursos',
    
    connectionLimit: 10,
    acquireTimeout: 30000,
    idleTimeoutMillis: 10000
});

config.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    // console.log('Config', config);
    connection.release();
});

export default config;