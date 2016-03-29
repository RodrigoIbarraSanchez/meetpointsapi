var meetpointsMap = require("../application/meetpointsMap");
var MeetpointRepository = require("../domain/MeetpointRepository");

exports.create = function (req, res) {

	res.json(req.query)

	/*
	MeetpointRepository.create(req.body, function (err, meetpoint) {
		if (err) res.send({success: false, message: err})
		res.json({success: true, meetpoint: meetpoint})
	})
	*/
}

exports.list = function (req, res) {
	MeetpointRepository.list(function (err, meetpoints) {
		if (err) res.send(err)
		res.json({success: true, meetpoints: meetpoints})
	})
}

exports.generateMap = function (req, res) {
	var coords = {
		lat: Number(req.query.lat),
		lng: Number(req.query.lng)
	};
	
	meetpointsMap(coords, function (map) {
		res.json({success: true, map: map});
	});
}
