var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//model and schema of the reps collection
//It guarantees the structure and definition of the collection

var salesRepSchema = new Schema({
    firstName: {type: String, required: false, unique: true},
    middleName: {type: String, required: false, unique: false},
    lastName: {type: String, required: false, unique: true},
    phoneNumber: {type: String, required: false, unique: false},
    email: {type: String, required: false, unique: false},
    address: {
        address: {type: String, required: false, unique: false},
        countryCode: {type: String, required: false, unique: false},
        city: {type: String, required: false, unique: false},
        state: {type: String, required: false, unique: false},
        country: {type: String, required: false, unique: false},
    },
    active: {type: Boolean, required: false, unique: false},// True if the sales rep is still active in the company
});

var Reps = mongoose.model('Rep', salesRepSchema);

module.exports = Reps;