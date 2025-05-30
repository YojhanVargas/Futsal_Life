const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Ruta base para autenticación


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

// o más seguro:
app.use(cors({
  origin: 'http://127.0.0.1:5500/frontend_Futsal/views/login.html' // <-- Donde corre tu frontend
}));
});