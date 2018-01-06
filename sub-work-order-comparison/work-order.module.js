const workOrderQueries = require('./work-order.queries');

module.exports = {
    // getAllJobs: function (next) {
    //     try {
    //         return workOrderQueries.getAllJobs(next)
    //     } catch (err) {
    //         next(err);
    //     }
    // },

    getLaborList: function ( ids, callback ) {
        try {
            workOrderQueries.getJobInfo(ids, data => {
                callback(data);
            });

        } catch (err) {
            result = {
                success: false,
                errMsg: err.message,
                data:{labors:null, salesRep: null, specialIntruction:null}
            };

            callback(result);
        }
    },

    updateLabarListQtySub: function ( id, labors, callback) {
        try {
            workOrderQueries.updateLabarListQtySub(id, labors, data => {
                callback(data)
            })
        } catch (err) {
            result = {
                success: false,
                errMsg: err.message,
                data:{labors:null, salesRep: null, specialIntruction:null}
            };
            callback(result);
        }
    },

    getJobInfo: function ( ids, callback ) {
        try {
            workOrderQueries.getJobInfo(ids, data => {
                callback(data);
            });

        } catch (err) {
            result = {
                success: false,
                errMsg: err.message,
                data:{labors:null, salesRep: null, specialIntruction:null}
            };

            callback(result);
        }
    }

};