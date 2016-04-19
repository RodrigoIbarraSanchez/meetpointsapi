// Dependencias
var express = require("express")
var bodyParser = require("body-parser")
var morgan = require("morgan")
var mongoose = require("mongoose")
var path = require("path")
var cors = require("cors")
var config = require("./config")

var app = express()

// Configuraciones
var port = 3000
mongoose.connect(config.database)
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Public Folder
app.use(express.static(path.join(__dirname, "public")))

// Rutas
app.use("/api", require("./src/presenter/meetpointsRouter"))

// Start Server
app.listen(port)
console.log("Magic happens at http://localhost:" + port)
