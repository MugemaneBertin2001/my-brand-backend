import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 

class Server {
    private app: Express;
    private PORT = 3000 ;
    private DB_URI = "mongodb+srv://bertinm2001:Mine123@cluster0.ntjgbl1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0rs";
    
    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.connectDB();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cors());
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
