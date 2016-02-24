var Promise = function () {
    var _pending = [], _result;

    return {
        resolve: function (result) {
            _result = result;
            if (_pending) {
                for (var i = 0, l = _pending.length; i < l; i++) {
                    _pending[i](_result);
                }
            }
            _pending = null;
        },
        then: function (callback) {
            _pending.push(callback);
        }
    }
};

module.exports = Promise;