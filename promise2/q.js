var Deferred = function () {
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
        promise: {
            then: function (callback) {
                if (_pending) {
                    _pending.push(callback);
                } else {
                    callback(_result);
                }
            }
        }
    }
};

module.exports = Deferred;