import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

const app=express();
const server=createServer(app);
const io=connectToSocket(server);
const uri=process.env.MONGO_URL;
app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);
// app.use("/api/v2/users",newUserRoutes);

const start =async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://purvaahirrao02_db_user:cay6FRYsL9ZrCT2T@apnavideocall.s4fi44r.mongodb.net/?appName=ApnaVideoCall");
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("listening to the port");
    });
}

start();