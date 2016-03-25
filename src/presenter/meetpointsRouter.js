// Dependencias
var express = require("express");
var router = express.Router();

// Servicios de meetpoints
var meetpointsService = require("../infrastructure/meetpointsService");

// RUTAS

// Genera un mapa de meetpoints basado en coordenadas de origen
router.get("/meetpoints", meetpointsService.generateMap);

// Exportar archivo
module.exports = router;