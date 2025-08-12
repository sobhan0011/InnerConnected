import cors from 'cors';
import express from 'express';
import { scopePerRequest } from 'awilix-express';
import setupRoutes from './interfaces/http/routes.js';
import config from './configs/serverConfig.js';
import errorHandler from './interfaces/http/common/middlewares/errorHandler.js';

class App {
	constructor() {
		this.PORT = config.PORT;
		this.app = express();
		this.app.use(express.json());
		this.app.use(
			cors({
				origin: 'http://localhost:5173',
				credentials: true,
			}),
		);
	}

	setup(container) {
		this.app.use('/uploads', express.static('uploads'));
		this.app.use(scopePerRequest(container));
		setupRoutes(this.app);
		this.app.use(errorHandler);
	}
}

export default App;
