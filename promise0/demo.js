var Promise = require('./q');

function asyncJob1(param) {
    var promise = Promise();
    setTimeout(function monkey() {
        var result = param + ' with job1';
        promise.resolve(result);
    }, 100);
    return promise;
}

asyncJob1('monkey').then(function (result) {
    console.log('we are done', result);
});
