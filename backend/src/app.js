import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import loyaltyRoutes from './routes/loyaltyRoutes.js';
const app = express();
dotenv.config();


app.use(cors(
    {
        origin: [process.env.FRONTEND_URL, 'http://localhost:1234', 'https://restaurantyumrush.vercel.app/'],
        credentials: true,
    }
));


app.use(express.json());


app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });

})

app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/loyalty', loyaltyRoutes);




export default app;