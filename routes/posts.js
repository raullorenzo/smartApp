/**
 * Created by raul on 5/12/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Post = require('../models/post.js');

    //GET - Obtener todas las posts de la colecccion posts de la BBDD
    ObtenerPosts = function (req, res) {
        Post.find(function (err, posts) {
            if (err) res.send(500, err.message);
            console.log('GET /posts');
            res.status(200).jsonp(posts);
        });
    };

    //POST - Agregar post
    CrearPost =  function(req, res, next){
        var post = new Post(req.body);
        post.save(function(err, post){
            if(err){return next(err)}
            res.json(post);
            console.log('POST /post/' + req.body.tittle);
        })
    };

    //POST - Agregar post login v2
    //Creartag = function(req, res){
    //    resultado = res;
    //    var login = req.body.login;
    //    //Comprueba si exite el login en la BD
    //    Usuario.find({login:login},function(err,usuario){
    //        //Si no exite
    //        if(usuario == "") {
    //            console.log('usuario no existente, OK');
    //            var usuario = new Usuario(req.body);
    //            usuario.save(function(err, usuario){
    //                if (err) return resultado.send(500, err.message);
    //                console.log('POST /user/' + req.body.nombre);
    //                resultado.status(200).jsonp(usuario);
    //            });
    //        } else {
    //            console.log('usuario ya existente');
    //            return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
    //        }
    //    });
    //};

    //POST - Añadir usuario en coleccion usuarios
    // CrearUsuario = function (req, res) {
    //     resultado = res;
    //     var login = req.body.login;
    //     //Comprueba si exite el login en la BD
    //     Usuario.find({login:login},function(err,usuario){
    //         //Si no exite
    //         if(usuario == ""){
    //             console.log('usuario no existente, OK');
    //             var usuario = new Usuario({
    //                 nombre:     req.body.nombre,
    //                 apellidos:  req.body.apellidos,
    //                 email:      req.body.email,
    //                 telefono:   req.body.telefono,
    //                 login:      req.body.login,
    //                 password:   req.body.password,
    //                 saldo:      req.body.saldo
    //             })
    //             usuario.save(function (err, usuario) {
    //                 if (err) return resultado.send(500, err.message);
    //                 resultado.status(200).jsonp(usuario);
    //                 console.log('POST /user/' + req.body.nombre);
    //             });
    //         }
    //         //Si existe
    //         else{
    //             console.log('usuario ya existente');
    //             return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
    //         }
    //     });
    // };

    //GET - Obtner post a partir de el ID
    ObtenerPostporID = function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            if (err) return res.send(500, err.message);
            console.log('GET /post/' + req.params.id);
            res.status(200).jsonp(post);
        });
    };

    //PUT Modificar datos de un post existente por ID
    ModificarPost = function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            console.log('PUT');
            console.log(req.body);
                post.tag       =  req.body.tag,
                post.tittle    =  req.body.tittle,
                post.text      =  req.body.text,
                post.followers =  req.body.followers,
                post.response  =  req.body.response
            post.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(post);
            });
        });
    };

    //DELETE - Eliminar post v2
    EliminarPostporID = function(req, res){
        console.log('DELETE post');
        console.log(req.params.id);
        Post.findByIdAndRemove(req.params.id, function(err){
            if(err){res.send(err)}
            res.json({message: 'Post eliminada correctamente'});
        })
    };


    //DELETE Eliminar usuario por ID
    // EliminarUsuarioporID = function (req, res) {
    //     console.log('DELETE usuario');
    //     console.log(req.params.id);
    //
    //     Usuario.findById(req.params.id, function (err, usuario) {
    //         usuario.remove(function (err) {
    //             if (!err)
    //                 console.log('Removed');
    //             else {
    //                 console.log('ERROR' + err);
    //             }
    //         })
    //     });
    //
    //     res.send('Usuario borrado');
    // };



    //GET Obtener todas las posts de la colecccion posts paginado
    ObtenerPostsP = function (req, res){
        console.log('post /obtenertagsP');
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

        Post
            .find({gender: req.params.gender})
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, posts) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(posts);
                }
            });

    };


    //ENDPOINTS
    app.post('/post/CrearPost', CrearPost);
    app.get('/post/ObtenerPosts', ObtenerPosts);
    app.get('/post/ObtenerPostsPaginados', ObtenerPostsP);
    app.get('/post/ObtenerPostporID/:id', ObtenerPostporID);
    app.put('/post/ModificarPost/:id', ModificarPost);
    app.delete('/post/EliminarPostporID/:id', EliminarPostporID);
}
