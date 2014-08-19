/*This class acts as polyfill for native canvas. creates a div and uses as canvas*/
function PolyCanvas() {
    this.ele = $('<div class="polyCanvas">');
}
PolyCanvas.prototype.appendTo = function(cntr) {
    this.ele.appendTo(cntr);
};
PolyCanvas.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    this.ele.css({'width': width, 'height': height});
};
/*This method creates divs with absolute postion, top, left will be calculated based on x,y values
 *to show as guides 
 **/
PolyCanvas.prototype.drawGuids = function(xGuids, yGuids, xGap, yGap, color) {
    color = color || "#000000";
    for (var i = 0; i <= xGuids; i++) {
        $('<div class="guide"></div>').css({height: this.height, left: i * xGap, 'background-color': color}).appendTo(this.ele);
    }
    for (var j = 0; j <= yGuids; j++) {
        $('<div class="guide"></div>').css({width: this.width, top: j * yGap, 'background-color': color}).appendTo(this.ele);
    }
};
/**
 * This method creates small divs with width and height to look like cell.
 * Position absolute is used to locate at specified x,y location
 * For subsequent state change same div will be used and class will be changed to show
 * alive or dead states 
 */
PolyCanvas.prototype.drawRect = function(x, y, width, height, fill, color, stroke) {
    var _id = "#cell_" + [x, y, width, height].join('_'), _cell = this.ele.find(_id);
    if (!_cell.length) {
        _cell = $('<div class="cell" id="' + _id + '">').css({left: x, top: y, width: width, height: height}).appendTo(this.ele);
    }
    _cell[fill ? 'addClass' : 'removeClass']('alive');
};
/**
 * Delete all guides and cells crreated
 */
PolyCanvas.prototype.clear = function() {
    this.ele.empty();
};