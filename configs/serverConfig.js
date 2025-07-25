import dotenv from 'dotenv';
dotenv.config();

const serverConfig = {
	PORT: process.env.PORT || 4000,
	ENV: process.env.ENV || 'dev',
	JWT_SECRET: process.env.JWT_SECRET,
};

export default serverConfig;
