import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import router from './routes';


class Server {
    private app: Express;
    private PORT :any ;
    private DB_URI : any;
    
    constructor() {
        this.app = express();
        this.config();
        this.connectDB();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cors());
        dotenv.config();
        this.PORT = process.env.PORT
        this.DB_URI = process.env.MONGODB_URI
        this.app.use('/api/v1', router);
    }

    private async connectDB(): Promise<void> {
        try {
            await mongoose.connect(this.DB_URI);
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}

const server = new Server();
server.start();
