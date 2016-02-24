var Promise = function () {
    var _callback, _result;

    return {
        resolve: function (result) {
            _result = result;
            if (_callback) {
                _callback(result);
            }
            _callback = null;
        },
        then: function (callback) {
            _callback = callback;
        }
    }
};

module.exports = Promise;