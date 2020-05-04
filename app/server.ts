import { Express, Request, Response } from 'express';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { MONGO_URI } from '../const';

export class Server {
    private app: Express;

    constructor(app: Express){
        this.app = app;

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(express.static(path.join(path.resolve('./'), "/build/frontend")));

        app.use('/api', require('./routes/index'))

        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.join(path.resolve('./'), '/build/frontend/index.html'));
        });
    }

        public start(port: number):void {
            mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
                if(err){
                    console.log(err);
                }
                this.app.listen(port, () => console.log(`Server listening on port ${port}`));
              });
            mongoose.set('useCreateIndex', true);
        }
}