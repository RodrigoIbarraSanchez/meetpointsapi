var MeetpointRepository = require("../domain/MeetpointRepository");

module.exports = function (coords, callback) {

	coords = {
		lat: Number(coords.lat),
		lng: Number(coords.lng)
	}

	MeetpointRepository.findClosest(coords, function (closest, distance) {

		MeetpointRepository.findByRadio(coords, distance, function (meetpoints) {
			
			callback({
				center: coords,
				distance: distance,
				closest: closest,
				meetpoints: meetpoints
			})

		})

	})

}