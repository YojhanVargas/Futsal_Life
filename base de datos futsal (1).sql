-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.5.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para futsal
CREATE DATABASE IF NOT EXISTS `futsal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `futsal`;

-- Volcando estructura para tabla futsal.acudiente
CREATE TABLE IF NOT EXISTS `acudiente` (
  `Id_Acudiente` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Jugador` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Acudiente`),
  KEY `Id_Jugador` (`Id_Jugador`),
  CONSTRAINT `acudiente_ibfk_1` FOREIGN KEY (`Id_Jugador`) REFERENCES `jugador` (`Id_Jugador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.acudiente: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.asistencia
CREATE TABLE IF NOT EXISTS `asistencia` (
  `Id_Asistencia` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Jugador` int(11) DEFAULT NULL,
  `Id_Partido` int(11) DEFAULT NULL,
  `Asistio` tinyint(1) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  PRIMARY KEY (`Id_Asistencia`),
  KEY `Id_Jugador` (`Id_Jugador`),
  KEY `Id_Partido` (`Id_Partido`),
  CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`Id_Jugador`) REFERENCES `jugador` (`Id_Jugador`),
  CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`Id_Partido`) REFERENCES `partido` (`Id_Partido`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.asistencia: ~10 rows (aproximadamente)
INSERT INTO `asistencia` (`Id_Asistencia`, `Id_Jugador`, `Id_Partido`, `Asistio`, `Fecha`) VALUES
	(1, 3, NULL, 1, '2025-06-19'),
	(4, 1, NULL, 1, '2025-06-19'),
	(5, 2, NULL, 0, '2025-06-19'),
	(6, 3, NULL, 1, '2025-06-19'),
	(7, 1, NULL, 1, '2025-06-19'),
	(8, 2, NULL, 0, '2025-06-19'),
	(9, 3, NULL, 1, '2025-06-19'),
	(10, 4, NULL, 1, '2025-06-19'),
	(11, 4, NULL, 1, '2025-06-21'),
	(13, 5, NULL, 1, '2025-06-21');

-- Volcando estructura para tabla futsal.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `Id_Categoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_Categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.categoria: ~4 rows (aproximadamente)
INSERT INTO `categoria` (`Id_Categoria`, `Nombre_Categoria`) VALUES
	(1, 'Iniciación'),
	(2, 'Prejuvenil'),
	(3, 'Juvenil'),
	(4, 'Única/Mayores');

-- Volcando estructura para tabla futsal.convocatoria
CREATE TABLE IF NOT EXISTS `convocatoria` (
  `Id_Convocatoria` int(11) NOT NULL AUTO_INCREMENT,
  `Posicion` varchar(255) DEFAULT NULL,
  `Id_Partido` int(11) DEFAULT NULL,
  `Id_Jugador` int(11) DEFAULT NULL,
  `Respuesta` enum('Sí','No','Pendiente') DEFAULT 'Pendiente',
  PRIMARY KEY (`Id_Convocatoria`),
  KEY `Id_Partido` (`Id_Partido`),
  KEY `Id_Jugador` (`Id_Jugador`),
  CONSTRAINT `convocatoria_ibfk_1` FOREIGN KEY (`Id_Partido`) REFERENCES `partido` (`Id_Partido`),
  CONSTRAINT `convocatoria_ibfk_2` FOREIGN KEY (`Id_Jugador`) REFERENCES `jugador` (`Id_Jugador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.convocatoria: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.entrenador
CREATE TABLE IF NOT EXISTS `entrenador` (
  `Id_Entrenador` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Equipo` int(11) DEFAULT NULL,
  `Id_Torneo` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Entrenador`),
  KEY `Id_Equipo` (`Id_Equipo`),
  KEY `Id_Torneo` (`Id_Torneo`),
  CONSTRAINT `entrenador_ibfk_1` FOREIGN KEY (`Id_Equipo`) REFERENCES `equipo` (`Id_Equipo`),
  CONSTRAINT `entrenador_ibfk_2` FOREIGN KEY (`Id_Torneo`) REFERENCES `torneo` (`Id_Torneo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.entrenador: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.equipo
CREATE TABLE IF NOT EXISTS `equipo` (
  `Id_Equipo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.equipo: ~3 rows (aproximadamente)
INSERT INTO `equipo` (`Id_Equipo`, `Nombre`, `Categoria`) VALUES
	(1, 'Equipo MendezRojas', 'Fundamental'),
	(2, 'Equipo VargasChaparro', 'Adultos'),
	(3, 'Equipo RuizFigueroa', 'inicial');

-- Volcando estructura para tabla futsal.jugador
CREATE TABLE IF NOT EXISTS `jugador` (
  `Id_Jugador` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Usuario` int(11) DEFAULT NULL,
  `Id_Equipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Jugador`),
  KEY `Id_Usuario` (`Id_Usuario`),
  KEY `Id_Equipo` (`Id_Equipo`),
  CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuario` (`Id_Usuario`),
  CONSTRAINT `jugador_ibfk_2` FOREIGN KEY (`Id_Equipo`) REFERENCES `equipo` (`Id_Equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.jugador: ~5 rows (aproximadamente)
INSERT INTO `jugador` (`Id_Jugador`, `Id_Usuario`, `Id_Equipo`) VALUES
	(1, 4, 3),
	(2, 3, 2),
	(3, 7, 3),
	(4, 8, 2),
	(5, 9, 2);

-- Volcando estructura para tabla futsal.mensaje
CREATE TABLE IF NOT EXISTS `mensaje` (
  `Id_Mensaje` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Emisor` int(11) DEFAULT NULL,
  `Id_Receptor` int(11) DEFAULT NULL,
  `Contenido` text DEFAULT NULL,
  `FechaEnvio` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`Id_Mensaje`),
  KEY `Id_Emisor` (`Id_Emisor`),
  KEY `Id_Receptor` (`Id_Receptor`),
  CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`Id_Emisor`) REFERENCES `usuario` (`Id_Usuario`),
  CONSTRAINT `mensaje_ibfk_2` FOREIGN KEY (`Id_Receptor`) REFERENCES `usuario` (`Id_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.mensaje: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.partido
CREATE TABLE IF NOT EXISTS `partido` (
  `Id_Partido` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `Lugar` varchar(255) DEFAULT NULL,
  `Id_Entrenador` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Partido`),
  KEY `Id_Entrenador` (`Id_Entrenador`),
  CONSTRAINT `partido_ibfk_1` FOREIGN KEY (`Id_Entrenador`) REFERENCES `entrenador` (`Id_Entrenador`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.partido: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.perfil
CREATE TABLE IF NOT EXISTS `perfil` (
  `Id_Perfil` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Direccion` varchar(500) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Id_Usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Perfil`),
  KEY `Id_Usuario` (`Id_Usuario`),
  CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuario` (`Id_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.perfil: ~11 rows (aproximadamente)
INSERT INTO `perfil` (`Id_Perfil`, `Nombre`, `Direccion`, `Telefono`, `Id_Usuario`) VALUES
	(1, 'alejandro', 'san mateo #15 - 25 ', '3201234567', 3),
	(2, 'Julian', 'calle 7 # 12-9', '3125610322', 1),
	(3, 'Camila', 'Carrera 123', '3201234567', 4),
	(4, 'Sebastian', 'cra 15 #5-21', '3202123641', 5),
	(5, 'Yojhan', 'crr 10 # 12-9', '3124356608', 6),
	(6, 'Carlos', 'Calle 123', '3111234567', 7),
	(7, 'Sara', 'Calle 115', '3110002306', 8),
	(8, 'Santiago', 'Cra 45 # 9-21', '3124567890', 9),
	(9, 'samuel', 'dsgagsadgfsgas', '3154658741', 10),
	(10, 'andres', 'dsgagsadgfsgas', '3154448741', 11),
	(11, 'andres', 'dsgagsadgfsgas', '3154448741', 12),
	(12, 'maia', 'zxcvbnm', '3154448741', 13),
	(13, 'nicolas', 'zxcvbnm', '3129654789', 14),
	(14, 'Johan', 'qazserfvbnhjk', '3257419852', 15),
	(15, 'saray', 'pñiujmnhgfvc', '325698523', 16);

-- Volcando estructura para tabla futsal.resultados
CREATE TABLE IF NOT EXISTS `resultados` (
  `Id_Resultados` int(11) NOT NULL AUTO_INCREMENT,
  `Goles` varchar(255) DEFAULT NULL,
  `Tarjetas` varchar(255) DEFAULT NULL,
  `Id_Partido` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Resultados`),
  KEY `Id_Partido` (`Id_Partido`),
  CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`Id_Partido`) REFERENCES `partido` (`Id_Partido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.resultados: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Rol`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.rol: ~4 rows (aproximadamente)
INSERT INTO `rol` (`Id_Rol`, `Nombre`) VALUES
	(3, 'Acudiente'),
	(4, 'Administrador'),
	(1, 'Entrenador'),
	(2, 'Jugador');

-- Volcando estructura para tabla futsal.torneo
CREATE TABLE IF NOT EXISTS `torneo` (
  `Id_Torneo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Estado` enum('Activo','Finalizado','Suspendido') DEFAULT 'Activo',
  PRIMARY KEY (`Id_Torneo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.torneo: ~0 rows (aproximadamente)

-- Volcando estructura para tabla futsal.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `Id_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Id_Rol` int(11) DEFAULT NULL,
  `Id_Categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Correo` (`Correo`),
  KEY `Id_Rol` (`Id_Rol`),
  KEY `usuario_ibfk_2` (`Id_Categoria`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Id_Rol`) REFERENCES `rol` (`Id_Rol`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`Id_Categoria`) REFERENCES `categoria` (`Id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla futsal.usuario: ~16 rows (aproximadamente)
INSERT INTO `usuario` (`Id_Usuario`, `Nombre`, `Apellido`, `Correo`, `Contraseña`, `Id_Rol`, `Id_Categoria`) VALUES
	(1, 'Julian', 'Martinez', 'julian26@gmail.com', '$2b$10$leMg/9ab/wchRkPpU/NOpO2ZE0Id/C4ZaoDgUs8w1DhXk31AvfUvq', 1, NULL),
	(2, 'Samuel', 'Andres', 'samuel.python@example.com', '$2b$10$glApnekYOyuDZW7hSoOsOexTIjNV/Gu0W3NN82v8GJHrUjNWOVLb2', 1, NULL),
	(3, 'alejandro', 'Gómez', 'alejoGomez21@email.com', '$2b$10$O0ETGaSVdDfaEjK2HzuwaOTX3K9aLn8uJYITpTZ1Hl0sz7HuIHqLy', 1, NULL),
	(4, 'Camila', 'Gonzalez', 'camila123@email.com', '$2b$10$6iwcZrOfygSqALkMB6rmNuEV.lCrRfFWIt76QCZVYmeV9VPnjBMB.', 1, NULL),
	(5, 'Sebastian', 'Menzdez', 'Sbastian@gmail.com', '$2b$10$iG7DeLDjqpXXKd.bDnzNku/xUzz6U4gzAgiBGliowQnk3tCx896wS', 2, NULL),
	(6, 'Yojhan', 'Vargas', 'yojhanV12345@gmail.com', '$2b$10$oOnxgUbWZl32eYxPUh.tC.I/gOZMysrOvgPTVGQ/bVIj.Bws6Y/8O', 2, NULL),
	(7, 'Carlos', 'Sánchez', 'carlos.sanchez@example.com', '$2b$10$Hjtq3xSGrAith3V3GuCvbO6OxDxz9F3.Q03N3JN8QO2W/R1lx9Bk.', 1, NULL),
	(8, 'Sara', 'Sánchez', 'SARAsanchez@example.com', '$2b$10$OqWZgdF67fdmGyxC4lG4lujhuWRJK4fw12hZaYAkoKCHDsB40osUS', 1, NULL),
	(9, 'Santiago', 'Lopez', 'santi.lopez@example.com', '$2b$10$yejZ5QDQgV3g.9A6GcU3aOGapKcF/yaBka3VUz3zr7f5/DfQMEC6m', 1, NULL),
	(10, 'samuel', 'romero', 'samuel@ejemplo.com', '$2b$10$zrE8pCihdD/prsxK/hMuFOui2U4jDTKLmqsSz8dzfLOtLpkbhjKhy', 2, NULL),
	(11, 'andres', 'arias', 'andres@ejemplo.com', '$2b$10$l7/HeoLThIqNS4RnQQiVvOUG9IE8.N9X3LVbY.Z9ijx/lDZ225mYG', 2, NULL),
	(12, 'andres', 'arias', 'arias@ejemplo.com', '$2b$10$9IDe0BLwXFp5TAw/kdznZuI.WcXyHvqj9Ig2N/Hu5/Fbo3NYsNb7G', 2, NULL),
	(13, 'maia', 'obando', 'maia@ejemplo.com', '$2b$10$b3x7PfzyXET2KNGWCUh3euON4598eyHA6ER8kDVw4M4uCKqJC7uTO', 1, 1),
	(14, 'nicolas', 'perra', 'homosexual@ejemplo.com', '$2b$10$plKEzpszvm0W5AeCsJ8/Qe/TVC.4MaRghuOCouhTHIjGKGzIZlKCq', 2, 2),
	(15, 'Johan', 'montaña', 'montana@ejemplo.com', '$2b$10$VZRgO89Odmba.w54VuKXz.PTVTfblL.yRhq4BSvpjW0ImPRM0pjfC', 2, 4),
	(16, 'saray', 'hierro', 'saray@ejemplo.com', '$2b$10$z5HujFm8LSYQOt3x640r4.mBxoXeIMgKWmeKXyP5xglb640G3k.Yy', 1, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
