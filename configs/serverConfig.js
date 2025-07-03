import dotenv from 'dotenv';
dotenv.config();

const serverConfig = {
	PORT: process.env.PORT || 4000,
	ENV: process.env.ENV || 'dev',
};

export default serverConfig;
