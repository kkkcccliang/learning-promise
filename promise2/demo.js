var Deferred = require('./q');

function asyncJob1(param) {
    var defer = Deferred();
    setTimeout(function () {
        var result = param + ' with job1';
        defer.resolve(result);
    }, 100);
    return defer.promise;
}

asyncJob1('monkey').then(function (result) {
    console.log('we are done', result);
});