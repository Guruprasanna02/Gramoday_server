import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import {router as reportRouter} from "./routers/reports.router";
import cors from "cors";

dotenv.config({
	path: __dirname.replace("dist", ".env"),
});

const app: Express = express();

mongoose
	.connect("mongodb://localhost:27017/gramoday")
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(err));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/", reportRouter);


app.listen(3000, (): void =>
	console.log(`Server running at http://127.0.0.1:3000`)
);