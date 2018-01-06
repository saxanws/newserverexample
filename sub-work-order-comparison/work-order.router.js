const express = require('express');
const workOrderModule = require('./work-order.module');
const WorkOrderRouter = express.Router();
const JobSchema = require('../models/jobs.model');
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const url = require('../config/database').database;
var assert = require('assert');
var jobCol;
var t = require('mongodb'); // This variable is to convert the id string to ObjectID

// THE CONNECTION HAPPPEN HERE TO THE DATABASE
MongoClient.connect(url, function ( err, db ) {
    if(!err)
        jobCol = db.db('eliteRoofingLocal').collection('jobs'); // you can use the variable jobCol anywhere in this file to write MongoDB query
    else
        throw err;
})


// Please ignore this block of comment
// WorkOrderRouter.get('/load/all', (req, res, next) => {
//
//     try {
//         ids = {
//             job: "5a341c4bdfdeb3a0dc1f456d",
//             order: "5a2b1e7d3822a813e05fe671",
//             workOrder: "5a2b1eb93822a813e05fe672"
//         }
//         console.log('heheheheh')
//         // jobCol.find({}).toArray((err, docs) => {
//         //             console.log(docs);
//         //             res.json(docs);
//         // })
//
//         // jobCol.findOne({"_id": t.ObjectID("5a341c4bdfdeb3a0dc1f456d")}, function ( err, docs ) {
//         //     console.log(docs);
//         //     res.json(docs);
//         // })
//
//         // jobCol.aggregate(
//         //     [
//         //         // {
//         //         //     '$match': {"_id": t.ObjectID("5a341c4bdfdeb3a0dc1f456d")}
//         //         // },
//         //         { $group: { "_id": "$_id", "orders": { $sum: 1 } } }
//         //     ]
//         // ).toArray((err, docs) => {
//         //     console.log(docs);
//         //     res.json( docs);
//         // })
//
//         // jobCol.aggregate([
//         //     {
//         //         '$match': {"_id": t.ObjectID("5a341c4bdfdeb3a0dc1f456d")}
//         //     },
//         //     {
//         //         $project:
//         //             {
//         //                 name: 1,
//         //                 orders: "$orders",
//         //             }
//         //     },
//         // ])
//         //     .toArray((err, orders) => {
//         //     if (!err)
//         //         res.json(orders)
//         //     else
//         //         res.json({msg: "NOt well done"});
//         // })
//
//         // Update elements worked perfectly
//         // jobCol.update(
//         //     {"_id": t.ObjectID("5a341c4bdfdeb3a0dc1f456d"),
//         //         "orders":{
//         //             "$elemMatch":{
//         //                 "_id": t.ObjectID("5a39759b81a9b68ac8ccceae"),
//         //                 "workOrders":{
//         //                     "$elemMatch":{
//         //                         "_id": t.ObjectID("5a39763f81a9b68ac8ccceaf")
//         //                     }
//         //                 }
//         //             }
//         //         }
//         //     },
//         //     {
//         //         $set: {"orders.$[element].workOrders.$[element2].title": "This is Axan here freaking 2"}
//         //         // $set: {"orders.$.title" : "Sucess yeah ert3209iol"}
//         //     },
//         //     {
//         //         arrayFilters :  [   {"element._id" : t.ObjectID("5a39759b81a9b68ac8ccceae")},
//         //             {"element2._id": t.ObjectID("5a39763f81a9b68ac8ccceaf")}
//         //         ],
//         //         multi : true
//         //     }
//         // ).then(data => {
//         //     console.log(data)
//         //     res.json(data);
//         // })
//
//
//
//         // trying ***************************************************************
//         // jobCol.aggregate([
//         //     {
//         //             '$match': {"_id": t.ObjectID("5a341c4bdfdeb3a0dc1f456d")}
//         //         },
//         //         {
//         //             $project:
//         //                 {
//         //                     orders_id: "$orders._id",
//         //                     orders_workOrd:"$orders.workOrders.labors"
//         //                 }
//         //         },
//         // ])
//         //     .toArray((err, data) => {
//         //         if (!err)
//         //             res.json(data)
//         //         else
//         //             res.json("Not done well");
//         //     })
//
//
//         // Official query to return the labors list and information.
//         // jobCol.aggregate([
//         //     {
//         //         '$match': {"_id": t.ObjectID("5a341c4bdfdeb3a0dc1f456d")}
//         //     },
//         //     {
//         //         $unwind: {path: '$orders'}
//         //     },
//         //     {
//         //         $match: {
//         //             'orders._id' : {
//         //                 $eq: t.ObjectID("5a2b1e7d3822a813e05fe671")
//         //             }
//         //         }
//         //     },
//         //     {
//         //         $unwind: {path: '$orders.workOrders'}
//         //     },
//         //     {
//         //         $match: {
//         //             'orders.workOrders._id' : {
//         //                 $eq: t.ObjectID("5a2b1eb93822a813e05fe672")
//         //             }
//         //         }
//         //     },
//         //
//         //     {
//         //         $lookup: {
//         //             from: "reps",
//         //             localField: "_salesRepId",    // field in the orders collection
//         //             foreignField: "_id",  // field in the items collection
//         //             as: "axan"
//         //         }
//         //     },
//         //     {
//         //         $project:
//         //             {
//         //                 _salesRepId: "$_salesRepId",
//         //                 orders_id: "$orders._id",
//         //                 labors:"$orders.workOrders.labors",
//         //                 salesRep:"$axan"
//         //             }
//         //     }
//         // ])
//         //     .toArray((err, data) => {
//         //         if (!err && data.length < 2)
//         //             res.json(data[0])
//         //         else
//         //             res.json("Not done well");
//         //     })
//
//
//         workOrderModule.getJobInfo(ids, (data) => {
//             res.json(data);
//         })
//
//
//     } catch (error) {
//         result = {
//             msg: error.message,
//             success: false,
//             data: {}
//         }
//         res.json(result);
//     }
// });


WorkOrderRouter.get('/load/labors/:jobId/:orderId/:workOrderId', (req, res, next) => {
    try {
        var ids = {
            job: req.params.jobId,
            order: req.params.orderId,
            workOrder: req.params.workOrderId
        };

        workOrderModule.getLaborList(ids, (data) => {
            res.json(data);
        });
    } catch (error) {
        next(error);
    }
});



WorkOrderRouter.put('/labor/update/:jobId/:orderId/:workOrderId', (req, res) => {
    try {
        var ids = {
            job: req.params.jobId,
            order: req.params.orderId,
            workOrder: req.params.workOrderId
        }

        var labors = req.body;
        workOrderModule.updateLabarListQtySub(ids, labors, data => {
            res.json(data);
        })

    } catch (err) {
        res.json(err);
}
});



module.exports = WorkOrderRouter;