const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/perfiles')); // Carpeta donde se guardan
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'perfil_' + Date.now() + ext);
  }
});

const upload = multer({ storage });

module.exports = upload;
