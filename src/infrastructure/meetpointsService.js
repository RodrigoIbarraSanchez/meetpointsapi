var meetpointsMap = require("../application/meetpointsMap");

exports.generateMap = function (req, res) {
	var coords = {
		lat: req.query.lat,
		lng: req.query.lng
	};
	
	meetpointsMap(coords, function (map) {
		res.json({success: true, map: map});
	});
}