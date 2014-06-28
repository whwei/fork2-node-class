
var Class = function(prop, parent) {
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
        };
        
    }

    c.constructor = f;

    f.prototype = c;

    f.__super__ = parent;

    var current = f;
    c.super = function (method) {
	var ret;
	current = current.__super__;
        ret =  current.prototype[method].apply(this, [].slice.call(arguments, 1));
	current = f;
	return ret;
    };

    return f;
};

// helper
function isFn(v) {
    return Object.prototype.toString.call(v) === '[object Function]';
}

module.exports = Class;
