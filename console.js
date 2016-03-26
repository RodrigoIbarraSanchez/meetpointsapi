var mongoose = require("mongoose")
var MeetpointRepository = require("./src/domain/MeetpointRepository")

mongoose.connect('mongodb://localhost:27017/meetpoints');

/*
var payload = {
    name: "Punta del Cielo Huexotitla",
    coordinates: {
        lat: 19.027134,
        lng: -98.207275
    },
    address: "Avenida 43 Oriente #21 Local B,Huexotitla,72534 Puebla, Pue.",
    schedules: "Lúnes a Sábado de 7:30 a 22:00 y Domingo de 9:30 a 22:00"
}
*/

/*
var payload = {
    name: "Cafe Punta del Cielo Juarez",
    coordinates: {
        lat: 19.050874,
        lng: -98.216354
    },
    address: "Av Juárez 2302, La Paz, 72160 Puebla, Pue.",
    schedules: "Lúnes a Sábado de 7:00 a 23:00. Domingo cerrado"
}
*/

var payload = {
    name: "Cafe Punta del Cielo Juarez",
    coordinates: {
        lat: 19.050874,
        lng: -98.216354
    },
    address: "Av Juárez 2302, La Paz, 72160 Puebla, Pue.",
    schedules: "Lúnes a Sábado de 7:00 a 23:00. Domingo cerrado"
}

//MeetpointRepository.removeAll()

MeetpointRepository.create(payload, function (err, meetpoint) {
	if (err) console.log('Error: ' + err)
	console.log(JSON.stringify(meetpoint))
})