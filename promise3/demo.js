var Deferred = require('./q');

function asyncJob1(param) {
    //console.log('asyncJob1 enter with', param);
    var defer = Deferred('pJob1');
    setTimeout(function () {
        var result = param + ' with job1';
        defer.resolve(result);
    }, 100);
    return defer.promise;
}

function asyncJob2(param) {
    //console.log('asyncJob2 enter with', param);
    var defer = Deferred('pJob2');
    setTimeout(function () {
        var result = param + ' with job2';
        defer.resolve(result);
    }, 100);
    return defer.promise;
}

asyncJob1('monkey').then(function cbForJob1(job1Result) {
    //console.log('cbForJob1 enter with', job1Result);
    return asyncJob2(job1Result);
}).then(function cbForJob2(job2Result) {
    //console.log('cbForJob2 enter with', job2Result);
    console.log('we are all done!', job2Result);
});