const mysql = require('mysql2/promise');
const path = require('path');

const args = process.argv.slice(2)[0];

const envFile = args === 'test' ? '../.env.test' : '../.env'; 

//__dirname provides current directory of running module - in this case app is the running module
require('dotenv').config({
    path: path.join(__dirname, envFile)
});

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = async () => {
    try {
        const db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        });

        db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
        db.close();

    }
    catch (err) {
        console.error(
            `Your environment variables might be wrong. Please double check .env file`
        );
        console.error('Environment Variables are:', {
            DB_PASSWORD,
            DB_NAME,
            DB_USER,
            DB_HOST,
            DB_PORT,
        });
        console.error(err);
        };
};

setUpDatabase();