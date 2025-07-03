import express from 'express';
import { scopePerRequest } from 'awilix-express';
import setupRoutes from './routes/index.js';
import config from './configs/serverConfig.js';
import errorHandler from './middlewares/errorHandler.js';

class App {
	constructor() {
		this.PORT = config.PORT;
		this.app = express();
	}

	setup(container) {
		this.app.use(scopePerRequest(container));
		this.app.use(express.json());
		setupRoutes(this.app);
		this.app.use(errorHandler);
	}

	run() {
		return this.app.listen(this.PORT, () => {
			console.log(`Server running on http://localhost:${this.PORT}`);
		});
	}
}

export default App;
