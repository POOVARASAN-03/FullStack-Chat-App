import express from 'express'
import authRouter from '../routes/auth.route.js';
import dotenv from 'dotenv'
import { connectDB } from '../lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import messageRoutes from '../routes/message.route.js'
import { app, server } from "../lib/socket.js";

import path from "path";

dotenv.config();
const __dirname = path.resolve();
// Enable CORS first
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Parse cookies
app.use(cookieParser());

// ✅ Set body size limits BEFORE routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/auth/", authRouter);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
server.listen(process.env.PORT, () => {
    console.log("server is running on port " + process.env.PORT);
    connectDB();
});
