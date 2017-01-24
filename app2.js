/**
 * Created by raul on 5/12/16.
 */
// process.env.TZ = 'UTC+2';
var chariot         = 'ws://192.168.0.195:1337';

var tiempo;
var location;
var resp;
var result;
var place;

const MIRE          = 'Mire\'s bedroom';
const RAUL          = 'Raul\'s bedroom';
const DADS          = 'Dad\'s bedroom';
const KITCHEN       = 'Kitchen';
const CHARIOT       = 'coap://chariot.';
const SOURCE        = 'c352';
const DEST          = '.local/';
const SENSOR        = 'sensors/tmp275-c?get';
const MAX_SENDS     = 8;

var app             = require("express")();
var express         = require("express"),// Express: Framework HTTP para Node.js
    http            = require("http").Server(app);
var io              = require("socket.io")(http);
var WebSocketClient = require('websocket').client;
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');  // Mongoose: Libreria para conectar con MongoDB
    logger          = require('morgan');
    path            = require('path');
    favicon         = require('serve-favicon');
    crypto          = require('crypto');
    formidable      = require('formidable'),
    cookieParser    = require('cookie-parser');
    passport        = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
    cors            = require('cors');
//var io              = require('socket.io').listen(server);
    serialport      = require('serialport');
var sleep           = require('sleep');
var Temp            = require('./models/temp.js');
var moment          = require('moment-timezone');

moment().tz("Europe/Madrid").format();

var c26 = 0;
var c27 = 0;
var c28 = 0;
var c29 = 0;
var countSend = 0;

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

mongoose.Promise = global.Promise;
// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://localhost/sensors', function(err, res) {
  if(err) throw err;
  console.log('Conectado correctamente a la Base de Datos, sensors');
  console.log("--------------------------------------------------------------");
  console.log("");
});

// Iniciamos la aplicación Express
// var app = express();
var server = require('http').Server(app);

function start(){
    console.log('send0:',countSend);
    var client = new WebSocketClient();
    client.connect(chariot);
     
    client.on('connectFailed', function(error) {
        console.log('Connect Error: ' + error.toString());
        sleep.sleep(5);
        start();
    });
    client.on('connect', function(connection) {
        console.log('______________________________________________________________');
        console.log('');
        console.log('WebSocket Client Connected');
        //sleep.sleep(5);
        connection.on('error', function(error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function() {
            console.log('');
            console.log('______________________________________________________________');
            console.log('');
            console.log('WebSocket Client Closed');
            console.log('');
        });
        connection.on('message', function(message) {
            countSend++;
            console.log('countSend1:',countSend);
            if (message.type === 'utf8') {
                console.log('');
                console.log("Received:",message.utf8Data);
                var aux = message.utf8Data;
                console.log('length:',aux.length);
                if (aux.length < 15){
                    console.log('aux:',aux);
                    tiempo = aux;
                    console.log('tiempo:',tiempo);
                    console.log('location:',location);
                }else{
                    location = message.utf8Data.substring(0,13);
                    resp = message.utf8Data;
                    result = message.utf8Data.substring(35,39);
                    if(result == '    '){
                        result = 'NOT FOUND';
                        location = 'NOT FOUND';
                    }
                    if(location == 'chariot.c3526'){
                        c26 = 1;
                        console.log('*** c26',c26);
                    }
                    if(location == 'chariot.c3527'){
                        c27 = 1;
                        console.log('*** c27',c27);
                    }
                    if(location == 'chariot.c3528'){
                        c28 = 1;
                        console.log('*** c28',c28);
                    }
                    if(location == 'chariot.c3529'){
                        c29 = 1;
                        console.log('*** c29',c29);
                    }
                    console.log('result:',result);
                    console.log('location:',location);
                    console.log('resp:',resp);
                    sleep.sleep(1);
                    AddTemp(location, result);
                }
                console.log('');
                console.log('RESULTADO:',result);
                console.log('______________________________________________________________');
                console.log('______________________________________________________________');
                console.log('');
                //function close websocket
                //connection.close();
            }
            //sleep.sleep(1);
            if (countSend == MAX_SENDS){
                console.log('Closing WebSocket Client...');
                c26 = 0;
                c27 = 0;
                c28 = 0;
                c29 = 0;
                countSend = 0;
                console.log('countSendClose:',countSend);
                connection.close();
                // closeWS();
            }
        });
        // function closeWS() {
        //     // if ((c26*c27*c28*c29)==1){
        //     if (countSend == MAX_SENDS){
        //         console.log('Closing WebSocket Client...');
        //         c26 = 0;
        //         c27 = 0;
        //         c28 = 0;
        //         c29 = 0;
        //         countSend = 0;
        //         console.log('countSendClose:',countSend);
        //         connection.close();
        //     }
        // }
        function sendTemp26() {
            if (connection.connected) {
                var msg26 = CHARIOT+SOURCE+6+DEST+SENSOR;
                console.log('______________________________________________________________');
                console.log('');
                console.log('msg26:',msg26);
                console.log('______________________________________________________________');
                connection.sendUTF(msg26);
                // sleep.sleep(1);
                // setTimeout(sendTemp, 10000);
            }
        }
        function sendTemp27() {
            if (connection.connected) {
                var msg27 = CHARIOT+SOURCE+7+DEST+SENSOR;
                console.log('');
                console.log('msg27:',msg27);
                console.log('______________________________________________________________');
                connection.sendUTF(msg27);
                // sleep.sleep(1);
                // setTimeout(sendTemp, 10000);
            }
        }
        function sendTemp28() {
            if (connection.connected) {
                var msg28 = CHARIOT+SOURCE+8+DEST+SENSOR;
                console.log('');
                console.log('msg28:',msg28);
                console.log('______________________________________________________________');
                connection.sendUTF(msg28);
                // sleep.sleep(1);
                // setTimeout(sendTemp, 10000);
            }
        }
        function sendTemp29() {
            if (connection.connected) {
                var msg29 = CHARIOT+SOURCE+9+DEST+SENSOR;
                console.log('');
                console.log('msg29:',msg29);
                console.log('______________________________________________________________');
                console.log('');
                connection.sendUTF(msg29);
                // sleep.sleep(1);
                // setTimeout(sendTemp, 10000);
            }
        }
        sendTemp26();
        sleep.sleep(1);
        sendTemp27();
        sleep.sleep(1);
        sendTemp28();
        sleep.sleep(1);
        sendTemp29();
        sleep.sleep(1);
    });
    //setTimeout(start, 10000);
}

start();

setInterval(start, 150000);
//setTimeout(start, 10000);

/** End WebSocket Client **/

/** SerialPort **/

// var serialport = require('serialport');
// var portName = '/dev/cu.wchusbserialfd120';
// //var portName = '/dev/cu.usbmodemFA141';
// var myPort = new serialport(portName, {
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false,
//     parser: serialport.parsers.readline("\r\n")
// });

// myPort.on('open', showPortOpen);
// myPort.on('data', sendSerialData);
// myPort.on('close', showPortClose);
// myPort.on('error', showError);

// function showPortOpen() {
//   console.log("------------------------------------------------------------------------");
//   console.log('puerto abierto: '+portName+'; Data rate: ' + myPort.options.baudRate);
//   console.log("------------------------------------------------------------------------");
// }
 
// function sendSerialData(data) {
//   io.emit("lectura", {
//     valor: data
//   });
//   console.log(data);

//   // myPort.write("4\r");
//   // readData = data.toString();
//   // if(readData.indexOf('5') == -1){
//   //  io.emit('some',{
//   //    data:readData
//   //  });
//   // }
// }

 
// function showPortClose() {
//   console.log("");
//   console.log("------------------------------------------------------------------------");
//   console.log('port closed.');
//   console.log("------------------------------------------------------------------------");
//   console.log("");

// }
 
// function showError(error) {
//   console.log("");
//   console.log("------------------------------------------------------------------------");
//   console.log('Serial port error: ' + error);
//   console.log("------------------------------------------------------------------------");
//   console.log("");

// }

// io.on('connection', function(socket){
//   console.log("");
//   console.log("------------------------------------------------------------------------");
//   console.log("Se ha conectado un Arduino");
//   console.log("------------------------------------------------------------------------");
//   console.log("");

// });

/** End SerialPort **/

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
routes = require('./routes/temps')(app);
routes = require('./routes/usuarios')(app);

var PORT = 3000;
http.listen(PORT, function() {
  console.log("");
  console.log("--------------------------------------------------------------");
  console.log("Servidor escuchando en, http://localhost:"+PORT);
});

