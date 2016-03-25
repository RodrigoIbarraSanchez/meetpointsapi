var mongoose = require('mongoose');

var meetpointsSchema = new mongoose.Schema({
	name: String,
	coordinates: String,
	address: String,
	schedules: String
})

userSchema.methods.updateCoordinates = function(coordinates, done) {
	
}

module.exports = mongoose.model('Meetpoints', meetpointsSchema)