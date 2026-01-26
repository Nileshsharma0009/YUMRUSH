import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
   cors: {
      origin: "http://localhost:1234", // Frontend URL
      methods: ["GET", "POST"]
   }
});

// Store io instance in app to use in routes
app.set("io", io);

io.on("connection", (socket) => {
   console.log("⚡ New Client Connected:", socket.id);
   socket.on("disconnect", () => console.log("❌ Client Disconnected"));
});

const startServer = async () => {
   try {
      console.log("⏳ Connecting to MongoDB...");
      await connectDB();

      console.log("🚀 Starting server...");
      // Listen on 'server', not 'app'
      server.listen(PORT, () => {
         console.log(`✅ Server running on http://localhost:${PORT}`);
      });

      // Handle Port Errors gracefully
      server.on("error", (error) => {
         if (error.code === "EADDRINUSE") {
            console.error(`❌ Port ${PORT} is already in use. Try these steps:`);
            console.error(`   1. Run 'netstat -ano | findstr :${PORT}'`);
            console.error(`   2. Run 'taskkill /F /PID <PID>' with the number found.`);
         } else {
            console.error("❌ Server Error:", error.message);
         }
         process.exit(1);
      });

   } catch (error) {
      console.error("❌ Failed to start server:", error.message);
      process.exit(1);
   }
};

startServer();