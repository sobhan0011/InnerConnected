import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Postgres {
	constructor({ postgresConfig }) {
		console.log(postgresConfig);
		this.config = postgresConfig;
		this.pool = null;
		this.pool = new Pool(this.config);
	}

	async initialize() {
		await this.checkConnectivity();
		await this.createShema();
	}

	async checkConnectivity() {
		try {
			await this.pool.query('SELECT 1');
			console.log('✅ Connected to PostgreSQL database');
		} catch (error) {
			console.error('❌ Failed to connect to PostgreSQL:', error.message);
			throw error;
		}
	}

	async createShema() {
		try {
			const schemaDir = path.join(__dirname, 'schema');
			const files = fs.readdirSync(schemaDir).filter((file) => {
				return file.endsWith('.sql');
			});
			for (const file of files) {
				const sql = fs.readFileSync(path.join(schemaDir, file), 'utf-8');
				await this.pool.query(sql);
				console.log(`✅ Initializaed: ${file}`);
			}
			console.log('✅ Connected to PostgreSQL database');
		} catch (error) {
			console.error('❌ Failed to connect to PostgreSQL:', error.message);
			throw error;
		}
	}

	async query(text, params) {
		if (!this.pool) {
			throw new Error('PostgresAdapter not connected. Call connect() first.');
		}

		return this.pool.query(text, params);
	}
}

export default Postgres;
