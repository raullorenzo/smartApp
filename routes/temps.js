/**
 * Created by raul on 5/12/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Temp = require('../models/temp.js');

    //GET - Obtener todos los usuarios de la colecccion usuarios de la BBDD
    GetTemp = function (req, res) {
        Temp.find(function (err, temps) {
            if (err) res.send(500, err.message);

            console.log('GET /temps')
            res.status(200).jsonp(temps);
        });
    };

    //POST - Agregar temp
    AddTemp =  function(location, temperature){
        var temp = new Temp();
        temp.location = location;
        temp.temperature = temperature; 
        temp.save(function(err, temp){
            if(err){console.log('error:',err);}
            console.log('POST /temp/' + temp.location +' | '+ temp.temperature);
            console.log('##############################################################');
        })
    };

    //GET - Obtner post a partir de el ID
    GetTempbyID = function (req, res) {
        Temp.findById(req.params.id, function (err, temp) {
            if (err) return res.send(500, err.message);
            console.log('GET /temp/' + req.params.id);
            res.status(200).jsonp(temp);
        });
    };

    //GET - Obtner usuario a partir de el login
    GetTempbyLoc = function (req, res) {
        Temp.find({location: req.params.location}, function (err, temps) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(temps);
        });
    };

    // //PUT Modificar datos de un post existente por ID
    // ModTemp = function (req, res) {
    //     Temp.findById(req.params.id, function (err, temp) {
    //         console.log('PUT /temp/');
    //         console.log(req.body);
    //             temp.location       =  req.body.location,
    //             post.temperature    =  req.body.temperature
    //         temp.save(function (err) {
    //             if (err) return res.send(500, err.message);
    //             res.status(200).jsonp(temp);
    //         });
    //     });
    // };

    //DELETE - Eliminar post v2
    DelTempbyID = function(req, res){
        console.log('DELETE temp');
        console.log(req.params.id);
        Temp.findByIdAndRemove(req.params.id, function(err){
            if(err){res.send(err)}
            res.json({message: 'Temperature delete correctly'});
        })
    };

    //GET Obtener todas las posts de la colecccion posts paginado
    GetTempP = function (req, res){
        console.log('GET /TempPAG');

        var sort;
        var sortObject = {};
        var count  = req.query.count || 5;
        var page   = req.query.page || 1;

        var filter = {
            filters:
            {
                mandatory:
                {
                    contains: req.query.filter
                }
            }
        };
        var pagination =
        {
            start: (page - 1) * count,
            count: count
        };

        if (req.query.sorting) {
            var sortKey = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject['desc'] = '_id';
        }

        sort = {
            sort: sortObject
        };

        Temp
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, temps) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(temps);
                }
            });

    };

    //GET Obtener todas las posts de la colecccion posts paginado
    GetTempbyLocP = function (req, res){
        console.log('GET /TempPAG');
        var count  = req.query.count || 5;
        var page   = req.query.page || 1;

        var filter = {
            filters:
            {
                mandatory:
                {
                    contains: req.query.filter
                }
            }
        };
        var pagination =
        {
            start: (page - 1) * count,
            count: count
        };

        var sort =
        {
            sort:
            {
                desc: '_id'
            }
        };

        Temp
            .find({location: req.params.location}, function (err, temps) {
                if (err) return res.send(500, err.message);
            })
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, temps) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(temps);
                }
            });

    };


    //ENDPOINTS
    app.post('/temp/AddTemp', AddTemp);
    app.get('/temp/GetTemp', GetTemp);
    app.get('/temp/GetTempP', GetTempP);
    app.get('/temp/GetTempbyID/:id', GetTempbyID);
    app.get('/temp/GetTempbyLoc/:location', GetTempbyLoc);
    app.get('/temp/GetTempbyLocP/:location', GetTempbyLoc);
    app.delete('/temp/DelTempbyID/:id', DelTempbyID);
    // app.put('/temp/ModTemp/:id', ModTemp);

}
