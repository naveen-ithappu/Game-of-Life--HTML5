var old = $.fn.gol;

/*Function added to JQuery object to make it avail to be used on any Jquery wrapped DOM Element*/
$.fn.gol = function(options) {
    var returnValue, _eles, _args = Array.prototype.slice.call(arguments, 1);
    _eles = this.each(function() {
        var $this = $(this),
                data = $this.data('atv.gol'),
                _opts = $.extend({}, GameOfLife.DEFAULTS, typeof options === 'object' && options),
                action = typeof options === 'string' && options;
        if (!data) {
            $this.data('atv.gol', (data = new GameOfLife($this, _opts)));
        }
        if (action && action.indexOf('_') !== 0 && typeof data[action] === 'function') {

            returnValue = data[action].apply(data, _args);
        }
    });
    return  returnValue === undefined ? _eles : returnValue;
};

$.fn.gol.Constructor = GameOfLife;

// NO CONFLICT
// ====================

$.fn.gol.noConflict = function() {
    $.fn.gol = old;
    return this;
};