import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const checkAPI = async () => {
    try {
        console.log('Testing Tables endpoint...');
        const tables = await axios.get(`${API_URL}/tables`);
        console.log(`✅ Tables: Found ${tables.data.length} tables`);
        if (tables.data.length > 0) {
            console.log('Sample Table:', tables.data[0]);
        }

        console.log('\nTesting Bookings endpoint...');
        const bookings = await axios.get(`${API_URL}/bookings`);
        console.log(`✅ Bookings: Found ${bookings.data.length} bookings`);
        if (bookings.data.length > 0) {
            console.log('Sample Booking:', bookings.data[0]);
        }

    } catch (error) {
        console.error('❌ API Check Failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
};

checkAPI();
