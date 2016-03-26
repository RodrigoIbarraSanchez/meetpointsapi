// Dependencias
var express = require("express");
var router = express.Router();

// Servicios de meetpoints
var meetpointsService = require("../infrastructure/meetpointsService");

// RUTAS

// Crear nuevo meetpoint
router.post("/meetpoints", meetpointsService.create)

// Obtener meetpoints según el filtro pasado
router.get("/meetpoints", function (req, res) {
	// Genera un mapa de meetpoints basado en coordenadas de origen
	if (req.query.filter === 'map')
		meetpointsService.generateMap(req, res)
	// Obtiene la lista completa de todos los meetpoints registrados en pack&pack
	else
		meetpointsService.list(req, res)
});

// Exportar archivo
module.exports = router;