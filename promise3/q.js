var Deferred = function (name) {
    var _pending = [], _result;

    return {
        resolve: function (result) {
            //console.log('Defer of "' + name + '" method "resolve" enter with result:', result, 'pending:', _pending);
            _result = result;
            if (_pending) {
                for (var item, r, i = 0, l = _pending.length; i < l; i++) {
                    item = _pending[i];
                    r = item[1](_result);
                    // 如果回调的结果返回的是promise(有then方法), 则调用then方法并将resolve方法传入
                    if (r && typeof r.then === 'function') {
                        //console.log('calling defer "' + r.name + '" method "then" with defer "' + item[0].name + '" method "resolve"')
                        r.then.call(r, item[0].resolve);
                    } else {
                        //console.log('calling defer "' + item[0].name + '" method "resolve"');
                        item[0].resolve(_result);
                    }
                }
            }
            _pending = null;
        },
        promise: {
            then: function (callback) {
                //console.log('Defer of "' + name + '" method "then" enter with callback:', callback);
                // 创建一个新的defer并返回, 并且将defer和callback同时添加到当前的pending中。
                var defer = Deferred('p' + name);
                if (_pending) {
                    _pending.push([defer, callback]);
                } else {
                    callback(_result);
                }
                return defer.promise;
            },
            name: name
        },
        name: name
    }
};

module.exports = Deferred;