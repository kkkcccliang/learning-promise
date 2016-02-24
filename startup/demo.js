function asyncJob1(param) {
    var result = param + ' with job1';
    return {
        then: function (callback) {
            return callback(result);
        }
    }
}

function asyncJob2(param) {
    var result = param + ' with job2';
    return {
        then: function (callback) {
            return callback(result);
        }
    }
}

function asyncJob3(param) {
    var result = param + ' with job3';
    return {
        then: function (callback) {
            return callback(result);
        }
    }
}

asyncJob1('monkey').then(function (job1Result) {
    return asyncJob2(job1Result);
}).then(function (job2Result) {
    return asyncJob3(job2Result);
}).then(function (job3Result) {
    console.log('finally we are done:', job3Result);
});