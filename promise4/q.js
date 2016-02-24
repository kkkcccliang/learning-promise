var Deferred = function () {
    var _pending = [], _result, _reason;
    var _this = {
        resolve: function (result) {
            if (_this.promise.status !== 'pending') {
                return;
            }
            _this.promise.status = 'resolved';
            _result = result;
            for (var item, r, i = 0, l = _pending.length; i < l; i++) {
                item = _pending[i];
                r = item[1](_result);
                // 如果回调的结果返回的是promise(有then方法), 则调用then方法并将resolve方法传入
                if (r && typeof r.then === 'function') {
                    r.then.call(r, item[0].resolve, item[0].reject);
                } else {
                    item[0].resolve(_result);
                }
            }
        },
        reject: function (reason) {
            if (_this.promise.status !== 'pending') {
                return;
            }
            _this.promise.status = 'rejected';
            _reason = reason;
            for (var item, r, i = 0, l = _pending.length; i < l; i++) {
                item = _pending[i];
                r = item[2](_reason);
                if (r && typeof r.then === 'function') {
                    r.then.call(r, item[0].resolve, item[0].reject);
                } else {
                    item[0].reject(_reason);
                }
            }
        },
        promise: {
            then: function (onResolved, onRejected) {
                // 创建一个新的defer并返回, 并且将defer和callback同时添加到当前的pending中。
                var defer = Deferred();
                var status = _this.promise.status;
                if (status === 'pending') {
                    _pending.push([defer, onResolved, onRejected]);
                } else if (status === 'resolved') {
                    onResolved(_result);
                } else if (status === 'rejected') {
                    onRejected(_reason);
                }
                return defer.promise;
            },
            status: 'pending'
        }
    };



    return _this;
};

module.exports = Deferred;