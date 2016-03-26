var MeetpointRepository = require("../domain/MeetpointRepository")
var config = require("../../config")

module.exports = function (coords, callback) {

	coords = {
		lat: Number(coords.lat),
		lng: Number(coords.lng)
	}

	var radio = config.minimumRadioDistance
	var meetpoints = []
	var closest = null

	var findClosestReady = false
	var findByRadioReady = false
	var callbackSent = false

	MeetpointRepository.findClosest(coords, function (theClosest, distance) {

		closest = theClosest

		findClosestReady = true

		if (findByRadioReady && !callbackSent){
			//console.log('terminó al final el find closest')
			ready()
		}
	})

	MeetpointRepository.findByRadio(coords, radio, function (theMeetpoints, theRadio) {
		
		meetpoints = theMeetpoints
		radio = theRadio

		findByRadioReady = true

		if (findClosestReady && !callbackSent){
			//console.log('terminó al final el find by radio')
			ready()
		}

	})

	function ready() {
		callbackSent = true
		callback({
			center: coords,
			radio: radio,
			closest: closest,
			meetpoints: meetpoints
		})
	}

}
