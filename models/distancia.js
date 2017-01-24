/**
 * Created by raul on 5/12/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var distanciaEsquema = new Schema({
    loc:       { 
    	type: String 
    },
    dato: 	{
    	type: Number,
    	default: 0
    },
    created:    {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Distancia', distanciaEsquema);