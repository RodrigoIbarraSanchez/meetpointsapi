var geolib = require('geolib')

exports.findClosest = function(centerCoords, meetpoints, callback) {

	var closestMeetpoint = null
	var closestDistance = 999999999

	meetpoints.forEach(function (meetpoint, index, meetpoints) {

		var distance = geolib.getDistance(
		    {latitude: centerCoords.lat, longitude: centerCoords.lng},
		    {latitude: meetpoint.coordinates.lat, longitude: meetpoint.coordinates.lng}
		)

		console.log('Distance between center and '+meetpoint.name+': '+distance)

		if (distance <= closestDistance) {
			closestDistance = distance
			closestMeetpoint = meetpoint
		}

		if (index == meetpoints.length-1)
			callback(closestMeetpoint, closestDistance)
	})
}

exports.findByRadio = function(centerCoords, radio, meetpoints, callback) {

	var closeMeetpoints = []

	// Se buscan los meetpoints que están dentro del radio
	meetpoints.forEach(function (meetpoint, index, meetpoints) {

		var distance = geolib.getDistance(
		    {latitude: centerCoords.lat, longitude: centerCoords.lng},
		    {latitude: meetpoint.coordinates.lat, longitude: meetpoint.coordinates.lng}
		)

		console.log('Distance between center and '+meetpoint.name+': '+distance)

		// Si el meetpoint está dentro del radio se agrega al arreglo
		if (distance <= radio) {
			closeMeetpoints.push(meetpoint)
		}

		// Cuando se termina el foreach
		if (index == meetpoints.length-1){
			// Se envía el arreglo de meetpoints que están dentro del radio
			if (closeMeetpoints.length > 0)
				callback(closeMeetpoints, radio)
			// Si no hay meetpoints dentro del radio, entonces se busca el más cercano y se cambia el radio
			else{
				this.findClosest(centerCoords, meetpoints, function (closestMeetpoint, radio) {
					callback([closestMeetpoint], radio)
				})
			}
		}
	}, this)
}