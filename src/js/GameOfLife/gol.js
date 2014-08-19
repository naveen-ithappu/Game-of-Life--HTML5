/**
 * Constructor of plugin.
 */
var GameOfLife = function(ele, opts) {
    this.ele = ele;
    this.cnfg = opts;
    this.cellsArr = [];
    this._init();
}, _golProto = GameOfLife.prototype;

/*Default configuration*/
GameOfLife.DEFAULTS = {
    nXCells: 5, // Number of cells in x direction
    nYCells: 5, // Number of cell sin y direction
    cellW: 15, // Each cell's width
    cellH: 15, // Each cell's height
    guideWidth: 1, // Guide line width (Not in use yet)
    enableGuides: true, // Toggles the visibility of guide lines on canvas
    speed: 6 // Time delay between two stage of game. Min 1 (~=100ms), Max 10 (~=1s)
};

/*Function to realize the next generation of cells, based on the rules of the Game of Life
 *  For Each cell
 *      - Get all it's 8 neighbours 3 cells Top Row, 3 cells In Bottom Row, 2 adj cells
 *      - alive state cell
 *          - With less than 2 alive neighbours goes to dead state :underpopulation
 *          - With more than 3 alive neighbours goes to dead state :overpopulation
 *          - With only 2 alive or 3 alive neightbours remains in alive state
 *          
 *      - dead state cell
 *          - With 3 alive neighbours goes to alive state
 *  
 *  @return Object generationinfo
 *                      - alive  // Number of cell alive in current generation
 *                      - dead  // Number of cells dead
 *                      - cells // Cells in current genration alive, dead
 **/
_golProto._nextGeneration = function() {
    var _currGen = this.cellsArr, _nextGen = [], _yCells = _currGen.length,
            _xCells, _y, _x, _genStats, tr, br, lc, rc, _8Sides;

    for (_y = 0; _y < _yCells; _y += 1) {
        _xCells = _currGen[_y].length;
        _nextGen[_y] = [];
        for (_x = 0; _x < _xCells; _x += 1) {
            // Calculate above/below/left/right row/column values
            tr = (_y - 1 >= 0) ? _y - 1 : _yCells - 1; // Pick last row if current row is 1st row
            br = (_y + 1 <= _yCells - 1) ? _y + 1 : 0; // Pick first row if current row is last row
            lc = (_x - 1 >= 0) ? _x - 1 : _xCells - 1; // Pick cell in the last column if current cell is on first column
            rc = (_x + 1 <= _xCells - 1) ? _x + 1 : 0; // Pick cell in the first column if current cell is on last column

            _8Sides = {
                top_left: _currGen[tr][lc],
                top_center: _currGen[tr][_x],
                top_right: _currGen[tr][rc],
                left: _currGen[_y][lc],
                right: _currGen[_y][rc],
                bottom_left: _currGen[br][lc],
                bottom_center: _currGen[br][_x],
                bottom_right: _currGen[br][rc]
            };

            var alive_count = 0;
            var dead_count = 0;
            for (var side in _8Sides) {
                if (_8Sides[side]) {
                    alive_count++;
                } else {
                    dead_count++;
                }
            }

            var _currState = _currGen[_y][_x], _newState = false;
            if (_currState) {
                if (alive_count < 2 || alive_count > 3) {
                    // new state: dead, overpopulation/ underpopulation
                    _newState = false;
                } else if (alive_count === 2 || alive_count === 3) {
                    // lives on to next generation
                    _newState = true;
                }
            } else {
                if (alive_count === 3) {
                    // new state: live
                    _newState = true;
                }
            }
            _nextGen[_y][_x] = _newState;
        }
    }
    _genStats = {dead: 0, alive: 0};
    for (_y = 0; _y < _yCells; _y += 1) {
        for (_x = 0; _x < _xCells; _x += 1) {
            if (_nextGen[_y][_x]) {
                _genStats.alive += 1;
            } else {
                _genStats.dead += 1;
            }
        }
    }
    _genStats.cells = _nextGen;
    return _genStats;
};

/**
 * This function calculates one step to next genration buy calling _nextGeneration
 * function. Also, increments the generation number by 1 for current cells. 
 *  Triggers:
 *      - stepped.gol:  when step action is cempleted. calls the handler with two
 *                      arguments 
 *                          - generation info revceived from _nextGeneration
 *                               - alive  // Number of cell alive in current generation
 *                               - dead  // Number of cells dead
 *                               - cells // Cells in current genration alive, dead
 *                               - genNo // Current generation number
 *                               
 *                          - instance of GameOfLife class
 *                               
 *     - alldead.gol:   when all cells in current generation are in dead state. 
 *                      calls the handler with two arguments, same as stepped.gol
 */
_golProto.step = function() {
    if (isNaN(this.genrationCount)) {
        this.genrationCount = 0;
    }
    this.genrationCount += 1;
    var genInfo = this._nextGeneration();
    genInfo.genNo = this.genrationCount;
    this.cellsArr = genInfo.cells;
    this.stage.repaint(this.cellsArr, this.cnfg);
    this.ele.trigger('steped.gol', [genInfo, this]);
    if (!genInfo.alive) {
        this.ele.trigger('alldead.gol', [genInfo, this]);
        this.stop();
    }
};
/**
 * Stopes the execution of step function in loop. 
 * Triggers:
 *      - stopped.gol - calls handler with one argument. current instance
 *  
 */
_golProto.stop = function() {
    if (this.interval) {
        clearInterval(this.interval);
    }
    this.genrationCount = 0;
    this.ele.trigger('stopped.gol', this);
};

/**
 * Starts executing the step function in loop with the period based on speed 
 * configuration applied.
 * Triggers:
 *      - started.gol 
 */
_golProto.start = function() {
    this.genrationCount = 0;
    var _scope = this;
    this.ele.trigger('started.gol', this);
    this.interval = setInterval(function() {
        _scope.step();
    }, this.cnfg.speed * 100);
};

/**
 * This function prepares the seed for initial generation to start Game Of Life.
 * @param {2D-Array} initState a 2D array containing the state of each cell in the grid
 *                             (optional)
 * 
 */
_golProto._initCellsState = function(initState) {
    var _csArr = [], _y, _x;
    for (_y = 0; _y < this.cnfg.nYCells; _y += 1) {
        _csArr[_y] = [];
        for (_x = 0; _x < this.cnfg.nXCells; _x += 1) {
            _csArr[_y][_x] = (initState && initState[_y] && initState[_y][_x]) || false;
        }
    }
    this.cellsArr = _csArr;
};
/**
 * This method helps to load predefined persets representing the canvas size and 
 * Game of Life patterns
 */
_golProto.applyPreset = function(opts) {
    if (typeof opts === 'object' && opts) {
        var _initState = false;
        if (opts.pattern) {
            _initState = opts.pattern;
            delete opts.pattern;
        }
        this.cnfg = $.extend(this.cnfg, opts);
        this._initCellsState(_initState);
        this.stage.repaint(this.cellsArr, this.cnfg);
    }
};

/**
 * This method bind Mouse down, Mouse Up and Mouse drag events on Canvas object
 * to help user to define the custom patter / to provide seed to start Game Of Life.
 * User can click on cells to toggle its state between alive / dead
 */
_golProto._bindeEvents = function() {
    var _scope = this, _mouseDown, _state, _canVasEle = _scope.stage.getCanvasEle();
    function getXYPos(e) {
        var _offset = _canVasEle.offset(), _ret = {};
        _ret.x = Math.floor((e.pageX - _offset.left) / _scope.cnfg.cellW);
        _ret.y = Math.floor(((e.pageY - _offset.top) / _scope.cnfg.cellH));
        return _ret;
    }
    function onMouseMove(e) {
        if (_mouseDown) {
            var _xy = getXYPos(e);
            _scope.cellsArr[_xy.y][_xy.x] = _state;
            _scope.stage.drawCellAt(_xy.x, _xy.y, _state);
        }
    }

    _canVasEle.on('mousedown.gol', function(e) {
        var _xy = getXYPos(e), _pState;
        _mouseDown = true;
        _pState = _scope.cellsArr[_xy.y] && _scope.cellsArr[_xy.y][_xy.x];
        _state = !_pState;
        _scope.cellsArr[_xy.y][_xy.x] = _state;
        _scope.stage.drawCellAt(_xy.x, _xy.y, _state);

    });
    _canVasEle.on('mousemove.gol', onMouseMove);
    $('body').on('mouseup.gol', function() {
        //_canVasEle.off('mousemove.gol');
        _mouseDown = false;
    });
};

/*Main methos where all cells of grid are set to dead state and new stage object
 *is created
 */
_golProto._init = function() {
    this._initCellsState();
    this.stage = new Stage(this.ele, this.cnfg);
    this.stage.toggleGuids(this.cnfg.enableGuides);
    this.stage.drawCells(this.cellsArr);
    this._bindeEvents();
};