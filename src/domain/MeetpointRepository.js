var MeetpointEntity = require("./MeetpointEntity");
var meetpointDomainService = require('./meetpointDomainService')

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
		if (err) console.log(err)
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
	this.list(function (err, meetpoints) {
		if (err) throw err
		meetpointDomainService.findClosest(coords, meetpoints, function (closest, distance) {
			callback(closest, distance)
		})
	})
}

exports.findByRadio = function(coords, radio, callback){
	this.list(function (err, meetpoints) {
		if (err) throw err
		meetpointDomainService.findByRadio(coords, radio, meetpoints, function (closeMeetpoints, radio) {
			callback(closeMeetpoints, radio)
		})
	})
}