var mongoose = require('mongoose');

var meetpointsSchema = new mongoose.Schema({
	name: String,
	coordinates: {
		lat: Number,
		lng: Number
	},
	address: String,
	schedules: String
})

// Éste método por ahora no hace nada, pero sirve como ejemplo de cómo deben ser los métodos
meetpointsSchema.methods.updateCoordinates = function(coordinates, callback) {
	callback(coordinates)
}

module.exports = mongoose.model('Meetpoints', meetpointsSchema)