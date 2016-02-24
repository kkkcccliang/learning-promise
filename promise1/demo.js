var Promise = require('./q');

function asyncJob1(param) {
    var promise = Promise();
    setTimeout(function monkey() {
        var result = param + ' with job1';
        promise.resolve(result);
    }, 100);
    return promise;
}

var job1 = asyncJob1('monkey');
job1.then(function (result) {
    console.log('we are done1:', result);
});

job1.then(function (result) {
    console.log('we are done2:', result);
});