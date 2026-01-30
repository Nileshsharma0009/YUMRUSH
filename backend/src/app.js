import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import loyaltyRoutes from './routes/loyaltyRoutes.js';
import mongoose from 'mongoose';
const app = express();
dotenv.config();


// const allowedOrigins = [ 'http://localhost:1234', 'https://restaurantyumrush.vercel.app'];
// const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:1234', 'https://restaurantyumrush.vercel.app'];

app.use(cors({
  origin: [
    "http://localhost:1234",              // Parcel dev
    "http://localhost:3000",              // fallback
    "https://restaurantyumrush.vercel.app" // production frontend
  ],
  credentials: true,
}));





// 🔥 Handle preflight

app.use(express.json());


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });

})

app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);

app.get("/api/db-health", (req, res) => {
  const state = mongoose.connection.readyState;
  const states = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };
  res.json({
    dbState: states[state] || "Unknown",
    timestamp: new Date().toISOString()
  });
});

app.use('/api/admin', adminRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/loyalty', loyaltyRoutes);




export default app;