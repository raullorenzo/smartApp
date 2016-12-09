/**
 * Created by raul on 5/12/16.
 */
var app             = require("express")();
var express         = require("express"),// Express: Framework HTTP para Node.js
    http = require("http").Server(app);
var io              = require("socket.io")(http);
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');  // Mongoose: Libreria para conectar con MongoDB
    logger          = require('morgan');
    path            = require('path');
    //favicon         = require('serve-favicon');
    crypto          = require('crypto');
    formidable      = require('formidable'),
    cookieParser    = require('cookie-parser');
    passport        = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
    cors            = require('cors');
//var io              = require('socket.io').listen(server);
    serialport      = require('serialport');

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

require('mongoose-middleware').initialize(mongoose);

// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://localhost/sensors', function(err, res) {
  if(err) throw err;
  console.log('Conectado correctamente a la Base de Datos, sensors');
});

// Iniciamos la aplicación Express
//var app = express();
//var server = require('http').Server(app);

var serialport = require('serialport');
var portName = '/dev/cu.wchusbserialfd130';
//var portName = '/dev/cu.usbmodemFA141';
var myPort = new serialport(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

function showPortOpen() {
   console.log('puerto abierto: '+portName+'; Data rate: ' + myPort.options.baudRate);
}
 
function sendSerialData(data) {
  io.emit("lectura", {
    valor: data
  });
  console.log("Dato: ",data);
  // myPort.write("4\r");
  // readData = data.toString();
  // if(readData.indexOf('5') == -1){
  //  io.emit('some',{
  //    data:readData
  //  });
  // }
}

 
function showPortClose() {
  console.log('port closed.');
}
 
function showError(error) {
  console.log('Serial port error: ' + error);
}

io.on('connection', function(socket){
  console.log("Se ha conectado un Arduino");
});

// app.get('/', function(dato){
//   // res.sendfile(__dirname+'/public');
//   io.sockets.emit('lectura', dato);
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// io.sockets.on('connection', function(socket){
//     console.log('Alguien ha abierto un socket')
//     socket.on('enviar mensaje', function (mensaje){
//         console.log('mensaje recibido');
//         io.sockets.emit('recibir mensaje', mensaje);
//         console.log('mensaje enviado');
//     });
//     socket.on('nuevo usuario', function (IDuser){
//         console.log('Nuevo usuario');
//         Usuario.findById(IDuser, function (err, usuario)
//         {
//             socket.usuario = usuario;
//             usuariosactivos.push(usuario);
//             mostrarlogin(usuariosactivos);
//             io.sockets.emit('actualizarusuariosactivos', usuariosactivos);
//             console.log('actualizarusuariosactivos 76');
//             console.log()
//         });
//     });
// });


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Middlewares de Express que nos permiten enrutar y poder realizar peticiones HTTP (GET, POST, PUT, DELETE)
//Funciones importantes para subir archivos
//app.use(bodyParser());
//app.use(bodyParser({uploadDir:'./images'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());


// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//API rutas
//routes = require('./routes/index')(app);
routes = require('./routes/dist')(app);
routes = require('./routes/users')(app);
routes = require('./routes/tags')(app);
routes = require('./routes/posts')(app);
routes = require('./routes/usuarios')(app);


http.listen(3000, function() {
  console.log("Servidor escuchando en, http://localhost:3000 ");

});