var MeetpointEntity = require("./MeetpointEntity");

exports.create = function (meetpointPayload, callback) {
	var meetpoint = new MeetpointEntity()

	meetpoint.name = meetpointPayload.name
	meetpoint.coordinates = meetpointPayload.coordinates
	meetpoint.address = meetpointPayload.address
	meetpoint.schedules = meetpointPayload.schedules

	meetpoint.save(function (err, meetpoint) {
		callback(err, meetpoint)
	})
}

exports.removeAll = function () {
	MeetpointEntity.find({}, function (err, meetpoints) {
		if (err) throw err
		meetpoints.forEach(function (meetpoint) {
			meetpoint.remove(function(err, meetpoint){
				if (err) throw err
				console.log("Eliminado: "+meetpoint.name)
			})
		})
	})
}

exports.list = function (callback) {
	MeetpointEntity.find({}, function (err, meetpoints) {
		callback(err, meetpoints)
	})
}

exports.findClosest = function(coords, callback){
	callback({}, 0)
}

exports.findByRadio = function(coords, distance, callback){
	callback([])
}