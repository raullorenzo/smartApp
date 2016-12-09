/**
 * Created by raul on 5/12/16.
 */

module.exports = function (app) {

    // var mongoose = require('mongoose');
    // var Tag = require('../models/distancia.js');
    // var io = require('socket.io').listen(server);
    // var serialport = require('serialport');

    // var app = express();
    // var server = require('http').Server(app);

    // io.on('connection', function(socket){
    //   console.log("Se ha conectado un Arduino");
    // });

    // var portName = '/dev/tty.wchusbserialfd130';
    // var myPort = new serialport(portName, {
    //     baudRate: 9600,
    //     // dataBits: 8,
    //     // parity: 'none',
    //     // stopBits: 1,
    //     // flowControl: false,
    //     parser: serialport.parsers.readline("\r\n")
    // });

    // myPort.on('open', onOpen);
    // myPort.on('data', onData);

    // function onData(dato){
    //   // console.log("");
    //   // console.log("Distancia: ",dato,"cm.");
    //   io.sockets.emit('lectura', dato);
    // }

    // function onOpen(){
    //   console.log("Arduino Conectado en el puerto, ",portName);
    // };

    // // app.get('/', function(req,res){
    // //   res.sendfile(__dirname+'/public/index.html');
    // // });


    // // //GET - Listar usuarios
    // // router.get('/dist', function(req, res, next){
    // //     Usuarios.find(function(err, usuarios){
    // //         if(err){return next(err)}

    // //         res.json(usuarios)
    // //     })
    // // })

    // // //GET - Obtener Datos de distancia del arduino
    // // ObtenerDistancia = function (data, res) {
    // //     console.log('GET /dist');
    // //     res.status(200).jsonp(data);
    // // };

    // // myPort.on('open', onOpen);
    // // myPort.on('data', ObtenerDistancia);

    // // function onOpen(){
    // //     console.log("Arduino Conectado en el puerto, ",portName);
    // // };

    // // // function onData(dato){
    // // //     console.log("");
    // // //     console.log("Distancia: ",dato,"cm.");
    // // // }

    // //GET - Obtener todas las posts de la colecccion posts de la BBDD
    // ObtenerDistancia = function (req, res) {
    
    //     io.sockets.emit('lectura', dato);
    //     res.send(JSON.stringify(dato));
    //     // Post.find(function (err, posts) {
    //     //     if (err) res.send(500, err.message);
    //     //     console.log('GET /posts');
    //     //     res.status(200).jsonp(posts);
    //     // });
    // };

    


    // //ENDPOINTS
    // app.get('/dist/ObtenerDistancia', ObtenerDistancia);
    
}
