/**
 * Created by raul on 5/12/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var tempEsquema = new Schema({
    location:        {
        type: String
    },
    temperature:       {
        type: String
    },
    created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Temp', tempEsquema);