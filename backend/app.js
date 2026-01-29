import express from "express";
import cors from "cors";
import menuRoutes from "./src/routes/menuRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import tableRoutes from "./src/routes/tableRoutes.js";
import couponRoutes from "./src/routes/couponRoutes.js";
import loyaltyRoutes from "./src/routes/loyaltyRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:1234',
        'http://127.0.0.1:5173',
      ].filter(Boolean);

      if (!origin) return callback(null, true);

      // Allow exact match or any vercel subdomain (explicit check)
      if (allowedOrigins.includes(origin) || /(^https?:\/\/.*\.vercel\.app)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Health-check for deployments and easy debugging
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: {
      node_env: process.env.NODE_ENV || 'development',
      frontend_url: process.env.FRONTEND_URL || null,
      mongo_set: !!process.env.MONGO_URI,
    },
    timestamp: new Date().toISOString(),
  });
});
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("YumRush API is Running");
});

export default app;
