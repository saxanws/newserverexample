var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobsSchema = new Schema({
    jobNumber: {type: String, required: false, default: null},
    jobType: {type: String, required: false, default: null},
    _salesRepId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rep'
    },
    orders: [{
        title: {type: String, default: null, required: false},
        workOrders: [{
            specialIntruction:{type: String, default: null, required: false},
            title: {type: String, default: null, required: false},
            _subId: {type: String, default: null, required: false},
            nameSubcontractor: {type: String, default: null, required: false},
            totalAmount: {type: Number, default: null, required: false},
            startDate: {type: Date, default: null, required: false},
            endDate: {type: Date, default: null, required: false},
            status: {type: Date, default: null, required: false},
            paidInfull: {type: Date, default: null, required: false},
            labors: [{
                _laborId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Work-order-labor'
                },
                name: {type: String, default: null, required: false},
                per: {type: String, default: null, required: false},
                qty: {type: Number, default: null, required: false},
                price: {type: Number, default: null, required: false},
                subtotal: {type: Number, default: null, required: false}
            }],
        }],
    }]
});

var jobs = mongoose.model('Job', JobsSchema);

module.exports = jobs;