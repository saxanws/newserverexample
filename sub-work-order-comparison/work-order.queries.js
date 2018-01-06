const mongoose = require('mongoose');
const JobModels = require('../models/jobs.model');
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/database').database;
var assert = require('assert');
var jobCol;
var t = require('mongodb');


MongoClient.connect(url, function ( err, db ) {
    if(!err)
        jobCol = db.db('eliteRoofingLocal').collection('jobs');
    else
        throw err;
})


module.exports = {
    // getAllJobs: function(next) {
    //     try {
    //         return JobModels.find({});
    //     } catch (error) {
    //          next(error);
    //     }
    // },


    // ************ aLL THE FUNCTIONS  DOWN HERRE ARE USING MONGODB 3.6
    updateLabarListQtySub: function ( ids, labors, callback ) {
        try {
            jobCol.update(
                {"_id": t.ObjectID(ids.job),
                    "orders":{
                        "$elemMatch":{
                            "_id": t.ObjectID(ids.order),
                            "workOrders":{
                                "$elemMatch":{
                                    "_id": t.ObjectID(ids.workOrder)
                                }
                            }
                        }
                    }
                },
                {
                    $set: {"orders.$[order].workOrders.$[workOrder].labors": labors}
                },
                {
                    arrayFilters :  [   {"order._id" : t.ObjectID(ids.order)},
                        {"workOrder._id": t.ObjectID(ids.workOrder)}
                    ],
                    multi : true
                }
            ).then(data => {
                var request1 = data.result
                this.getJobInfo(ids, data => {
                    if(request1.nModified !== 1){
                        data.success = false;
                        data.errMsg = "No changes were made in the database."
                    }

                    callback(data);
                })

            })

        } catch (error) {
            callback(error.message);
        }
    },

    getJobInfo: function(ids, callback){
        try {
            jobCol.aggregate([
                {
                    '$match': {"_id": t.ObjectID(ids.job)}
                },
                {
                    $unwind: {path: '$orders'}
                },
                {
                    $match: {
                        'orders._id' : {
                            $eq: t.ObjectID(ids.order)
                        }
                    }
                },
                {
                    $unwind: {path: '$orders.workOrders'}
                },
                {
                    $match: {
                        'orders.workOrders._id' : {
                            $eq: t.ObjectID(ids.workOrder)
                        }
                    }
                },

                {
                    $lookup: {
                        from: "reps",
                        localField: "_salesRepId",
                        foreignField: "_id",
                        as: "salesRepInfo"
                    }
                },
                {
                    $project:
                        {
                            labors:"$orders.workOrders.labors",
                            salesRep:"$salesRepInfo",
                            specialIntruction: "$orders.workOrders.specialIntruction",
                            startDate: "$orders.workOrders.startDate",
                            jobNumber: "$jobNumber",
                            jobType:"$jobType"

                        }
                }
            ]).toArray((err, data) => {
                    if (!err && data.length < 2 && data.length > 0){
                        callback({data: data[0], success: true, errMsg:""})
                    } else{
                        callback({data:{labors:null, salesRep: null, specialIntruction:null}, errMsg: "No data found", success: false});
                    }

                })

        } catch (err) {
            result = {
                errMsg: err.message,
                success: false,
                data:{labors:null, salesRep: null, specialIntruction:null}
            };

            callback(result);
        }
    }


};