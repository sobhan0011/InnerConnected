import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Postgres {
	constructor({ logger, postgresConfig }) {
		this.config = postgresConfig;
		this.pool = new Pool(this.config);
	}

	async init() {
		await this.checkConnectivity();
		await this.createShema();
		return this;
	}

	async checkConnectivity() {
		try {
			await this.pool.query('SELECT 1');
			logger.log('✅ Connected to PostgreSQL database');
		} catch (error) {
			logger.error('❌ Failed to connect to PostgreSQL:', error.message);
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
				logger.log(`✅ Initializaed: ${file}`);
			}
			logger.log('✅ Connected to PostgreSQL database');
		} catch (error) {
			logger.error('❌ Failed to connect to PostgreSQL:', error.message);
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
