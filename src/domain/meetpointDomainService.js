var geolib = require('geolib')

exports.findClosest = function(centerCoords, meetpoints, callback) {

	var closestMeetpoint = null
	var closestDistance = 999999999

	meetpoints.forEach(function (meetpoint, index, meetpoints) {

		console.log(centerCoords)

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

exports.findByRadio = function(coords, meetpoints, callback) {

	var closeMeetpoints = meetpoints

	callback(closeMeetpoints)
}