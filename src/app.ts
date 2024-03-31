import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerJSDocs = YAML.load('./src/api.yaml');


export class App {
    private app: Express;
    private DB_URI: string;
    
    constructor() {
        this.app = express();
        dotenv.config();  
        this.config();
        this.DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb'; 
        this.setupRoutes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDocs))
        this.app.use('/api/v1', router);
    }

    
    private setupRoutes(): void {
        this.app.get('/', (req, res) => {
            res.send('Hello, World!').status(200);
        });
    }

    // Method to connect to MongoDB for serving
    public async connectDBForServing(): Promise<void> {
        const servingURI = process.env.MONGODB_SERVING_URI || 'mongodb://localhost:27017/mydb_serving';
        try {
            await mongoose.connect(servingURI);
            console.log('MongoDB connected successfully on serving');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    // Method to connect to MongoDB for testing
    public async connectDBForTesting(): Promise<void> {
        const testingURI = process.env.MONGODB_TESTING_URI || 'mongodb://localhost:27017/mydb_testing';

        try {
            await mongoose.connect(testingURI);
            console.log('MongoDB connected successfully on testing');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    public getApp(): Express {
        return this.app;
    }
}
