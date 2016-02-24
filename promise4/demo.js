var Deferred = require('./q');

function asyncJob1(param, isOk) {
    var defer = Deferred();
    setTimeout(function () {
        var result = param + ' with job1';
        if (isOk) {
            defer.resolve(result);
        } else {
            defer.reject('job1 fail');
        }
    }, 100);
    return defer.promise;
}

function asyncJob2(param, isOk) {
    var defer = Deferred();
    setTimeout(function () {
        var result = param + ' with job2';
        if (isOk) {
            defer.resolve(result);
        } else {
            defer.reject('job2 fail');
        }
    }, 100);
    return defer.promise;
}

asyncJob1('monkey', true).then(function (job1Result) {
    return asyncJob2(job1Result, true);
}).then(function (job2Result) {
    console.log('we are all done!', job2Result);
});

asyncJob1('monkey', true).then(function (job1Result) {
    return asyncJob2(job1Result, false);
}, function (job1Reason) {
    return job1Reason;
}).then(function (job2Result) {
    console.log('we are all done!', job2Result);
}, function (reason) {
    console.log('we are fail!', reason);
});

asyncJob1('monkey', false).then(function (job1Result) {
    return asyncJob2(job1Result, false);
}, function (job1Reason) {
    return job1Reason;
}).then(function (job2Result) {
    console.log('we are all done!', job2Result);
}, function (reason) {
    console.log('we are fail!', reason);
});