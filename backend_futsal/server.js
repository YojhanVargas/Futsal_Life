const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const rutaProtegida = require ('./routes/protegida.routes');
const perfilRoutes = require('./routes/perfil.routes');
const equipoRoutes = require('./routes/equipo.routes');
const jugadorRoutes = require('./routes/jugador.routes');

require('dotenv').config();
const app = express();
app.use(cors());
// Middleware para entender JSON
app.use(express.json());

// --- Tus Rutas ---
app.use('/api/protegida', rutaProtegida);
app.use('/api/auth', authRoutes); // Ruta base para autenticación
app.use('/api/perfil', perfilRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/jugadores', jugadorRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});