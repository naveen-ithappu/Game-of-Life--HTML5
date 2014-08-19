/**
 * This function contains various Game Of Life patterns
 * @param {type} $win
 * @param {type} $
 */
/*jshint -W030*/
!function($win, $) {
    var _patterns = {};

    var _stillLifes = _patterns["Still lifes"] = {};

    _stillLifes.Block = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: true,
        speed: 6,
        pattern: [[false, false, false, false, false, false, false, false, false, false], [false, true, true, false, false, false, false, true, true, false], [false, true, true, false, false, false, false, true, true, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, true, true, false, false, false, false, false, false, false], [false, true, true, false, false, false, true, true, false, false], [false, false, false, false, false, false, true, true, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false]]
    };

    _stillLifes.Beehive = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: true,
        speed: 6,
        pattern: [[false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, false, false, true, true, false, false, false, false], [false, false, false, true, false, false, true, false, false, false], [false, false, false, false, true, true, false, false, false, false], [false, false, false, false, false, false, false, false, false, false], [false, false, true, true, false, false, false, false, false, false], [false, true, false, false, true, false, false, false, false, false], [false, false, true, true, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false]]
    };
    
    _stillLifes.Loaf = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: true,
        speed: 6,
        pattern: [[false,false,false,false,false,false,false,false,false,false],[false,true,true,false,false,false,false,false,false,false],[true,false,false,true,false,false,false,false,false,false],[false,true,false,true,false,false,false,false,false,false],[false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,true,false,false],[false,false,false,false,false,true,false,false,true,false],[false,false,false,false,false,false,true,false,true,false],[false,false,false,false,false,false,false,true,false,false]]
    };
    
    
    var _oscillators = _patterns.Oscillators = {};
    
    _oscillators.Toad = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: false,
        speed: 6,
        pattern: [[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,true,true,false,false,false],[false,false,false,true,true,true,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false]]
    };
    
    _oscillators.Beacon = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: true,
        speed: 6,
        pattern: [[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,true,true,false,false,false,false,false,false],[false,false,true,true,false,false,false,false,false,false],[false,false,false,false,true,true,false,false,false,false],[false,false,false,false,true,true,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false]]
    };
    
    
    var _spaceShips = _patterns.Spaceships = {};
    
    
    _spaceShips.Glider = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: true,
        speed: 6,
        pattern: [[false,false,false,false,false,false,false,false,false,false],[false,false,true,false,false,false,false,false,false,false],[false,false,false,true,false,false,false,false,false,false],[false,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,true,false,false],[false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false]]
    };
    
    _spaceShips['Lightweight spaceship'] = {
        nXCells: 10,
        nYCells: 10,
        cellW: 15,
        cellH: 15,
        enableGuides: true,
        speed: 6,
        pattern: [[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,true,false,false,true,false,false,false],[false,false,false,false,false,false,false,true,false,false],[false,false,false,true,false,false,false,true,false,false],[false,false,false,false,true,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false]]
    };
    
    $win.golPatterns = {
        //Clone and return the configuration and pattern matching the name and category.
        //Clone require to avoid any changes made to pattern by user.
        getByName : function(cat, name){
            var _ret = _patterns[cat] && _patterns[cat][name];
            if(_ret){ //Clone
                _ret = $.extend({},_ret);
            }
            return _ret;
        },
        //Returns all the registered patterns by category
        //  {
        //      'Still Lifes' : ['Block' ........]
        //      ...
        //      ..
        //      .
        //  }
        getNames: function() {
            var _cats = Object.keys(_patterns), _ret = {};
            _cats.forEach(function(catName) {
                _ret[catName] = Object.keys(_patterns[catName]);
            });
            return _ret;
        }
    };

}(window, window.jQuery);
/*jshint +W030*/