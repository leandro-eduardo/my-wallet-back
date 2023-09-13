import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DB_URL);
let db;

try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('✅ Connected to the database!');
} catch (error) {
    console.log('❌ Database connection error', error);
}

export default db;
