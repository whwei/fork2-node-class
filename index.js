var Class = function(o) {
    
};

Class.create = function(prop, parent) {
    var value,
        proto,
        init;

    prop = prop || {};
    parent = parent || Object;

    init = prop.initialize;

    function f() {
        parent.apply(this, arguments);

        if (this.constructor === f && init) {
            init.apply(this, arguments);
        }
    }

    if (parent) {
        for (var p in parent) {
            if (parent.hasOwnProperty(p)) {
                f[p] = parent[p];
            }
        }
    }

    function ctor(){
    }

    ctor.prototype = parent.prototype;
    proto = ctor.prototype;

    var c  = new ctor();

    for (var k in prop) {
        if (k !== 'initialize') {
            value = prop[k];
            c[k] = value;
            // c[k] = isFn(value) && isFn(proto[k]) ? 
            //     (function(name, subFn) {

            //         return function() {
            //             var ret,
            //                 tmp;

            //             tmp = this.super;

            //             // this.super('method', ...) => this.super(...) 
            //             this.super = function() {
            //                 var args = [].slice.call(arguments, 1);
            //                 return ctor.prototype[name].apply(this, args);
            //             };
                        
            //             ret = subFn.apply(this, arguments);

            //             this.super = tmp;

            //             return ret;
            //         };
            //     })(k, value)
            //     : value;
        };
        
    }

    c.super = function (method) {
        var ret,
            tmp = this.super;

        this.super = function () {
          return proto.__proto__[method].apply(this, [].slice.call(arguments, 1));
        };

        ret = proto[method].apply(this, [].slice.call(arguments, 1));

        this.super = tmp;

        return ret;
    };

    c.constructor = f;

    f.prototype = c;

    f.__super__ = parent;

    return f;
};

// helper
function isFn(v) {
    return Object.prototype.toString.call(v) === '[object Function]';
}

module.exports = Class.create;