var MeetpointRepository = require("../domain/MeetpointRepository");

module.exports = function (coords, callback) {

	MeetpointRepository.findClosest(coords, function (closest, distance) {

		MeetpointRepository.findByRadio(coords, distance, function (meetpoints) {
			
			callback({
				center: coords,
				distance: distance,
				closest: closest,
				meetpoints: meetpoints
			});

		});

	});

};