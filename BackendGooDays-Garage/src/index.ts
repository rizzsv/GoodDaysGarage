import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import catalogRouter from './Product/catalogRouter';
import authRouter from './Login/auth.Routes';

dotenv.config();
const app = express();

// Gunakan middleware cors sebelum mendefinisikan rute
app.use(cors()); // Memungkinkan semua origin, sesuaikan jika perlu
app.use(express.json());

// Rute untuk katalog produk
app.use('/api', catalogRouter);

// Rute untuk autentikasi
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});