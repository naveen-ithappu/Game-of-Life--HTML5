/*This class encapsulate the drawing operations on canvas object by providing
 * method names reflecting configuration / state modifications*/
var Stage = function(cntr, conf) {
    this.cntr = cntr;
    this.conf = conf;
    this.init();
}, _sProto = Stage.prototype;

_sProto.getCanvasEle = function() {
    return this.canvas.ele;
};

_sProto.drawCellAt = function(x, y, fill) {
    this.canvas.drawRect(x * this.conf.cellW, y * this.conf.cellH, this.conf.cellW, this.conf.cellH, fill, false, this.conf.enableGuides);
};

_sProto.drawCells = function(cellsArr) {
    var _rows = cellsArr.length, _cols, _y, _x;
    for (_y = 0; _y < _rows; _y += 1) {
        _cols = cellsArr[_y].length;
        for (_x = 0; _x < _cols; _x += 1) {
            this.drawCellAt(_x, _y, cellsArr[_y][_x]);
        }
    }
};

_sProto.toggleGuids = function(enable) {
    var color = enable ? '#000000' : '#ffffff';
    this.canvas.drawGuids(this.conf.nXCells, this.conf.nYCells, this.conf.cellW, this.conf.cellH, color);
    this.canvas.ele.css('border', enable ? 'none' : '1px solid #000000');
};
/*This method tries to align the stage to horizontally and vertically center in
 * container for better representation*/
_sProto.rePosition = function() {
    var _pH = this.ele.parent().height(), _eH = this.ele.height(), _top;
    if (_eH < _pH) {
        _top = Math.round((_pH - _eH - 80) / 2);
        this.ele.css({'position': 'relative', 'top': _top + 'px'});
    }
};
/*This method helps the user to change the grid size dynamically*/
_sProto.resize = function() {
    this.conf.width = this.conf.nXCells * this.conf.cellW;
    this.conf.height = this.conf.nYCells * this.conf.cellH;
    this.canvas.setSize(this.conf.width, this.conf.height);
    this.rePosition();
};

/*This method takes new configurations and repaints the stage with new set of cells*/
_sProto.repaint = function(cells, cnfg) {
    this.conf = cnfg;
    this.canvas.clear();
    this.resize();
    this.toggleGuids(this.conf.enableGuides);
    this.drawCells(cells);
};
/*Main method where all new container is creatde and canvas object is appended to it*/
_sProto.init = function() {
    this.ele = $('<div class="golStage"></div>').appendTo(this.cntr);
    this.canvas = CanvasProvider.getCanvas();
    this.canvas.appendTo(this.ele);
    this.resize();
};