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
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:1234"];
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
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
