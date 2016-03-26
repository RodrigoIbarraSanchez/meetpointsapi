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

/*
var payload = {
    name: "City Express Finsa Autopista",
    coordinates: {
        lat: 19.112262,
        lng: -98.249770
    },
    address: "Guerrero 117, San Juan Cuautlancingo, 72730 San Juan Cuautlancingo, Pue.",
    schedules: "Nunca cierra"
}
*/

/*
var payload = {
    name: "New York Wings, Lomas de Angelópolis",
    coordinates: {
        lat: 18.999043,
        lng: -98.273123
    },
    address: "Lomas de Angelópolis,Pue.",
    schedules: "No indicado"
}
*/

/*
var payload = {
    name: "Oficina Pack&Pack Col. Anzures",
    coordinates: {
        lat: 19.025064,
        lng: -98.198702
    },
    address: "Calle 39 Ote. 1204-A, Anzures, 72530 Puebla, Pue.",
    schedules: "Lunes a Viernes 13:00 a 01:00"
}
*/

var payload = {
    name: "City Express la Noria",
    coordinates: {
        lat: 19.034250,
        lng: -98.225564
    },
    address: "Cto Juan Pablo II 1755,La Noria,72410 Puebla, Pue.",
    schedules: "Nunca cierra"
}

//MeetpointRepository.removeAll()

MeetpointRepository.create(payload, function (err, meetpoint) {
	if (err) console.log('Error: ' + err)
	console.log(JSON.stringify(meetpoint))
})