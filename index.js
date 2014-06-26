var Class = function(o) {
    
};

Class.create = function(prop, parent) {
    prop = prop || {};
    parent = parent || Object;

    function f() {
        parent.apply(this, arguments);

        if (this.constructor === f && this.initialize) {
            this.initialize.apply(this, arguments);
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

    var c  = new ctor();

    for (var k in prop) {
        c[k] = prop[k];
    }

    c.super = function () {
        // argument.callee.caller
    }

    c.constructor = f;

    f.prototype = c;

    f.__super__ = parent;

    return f;
};

module.exports = Class.create;