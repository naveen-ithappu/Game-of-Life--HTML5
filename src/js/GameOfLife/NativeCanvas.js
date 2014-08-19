/**
 * This class creates warpper method to perform action on native HTML5 Canvas
 * HTML5 canvas object will be created when an instance is created.
 */
function NativeCanvas() {
    this.ele = $('<canvas>').css('background', '#fff');
    this.grahic = this.ele[0].getContext('2d');
}
/*Append the CANVAS element to container*/
NativeCanvas.prototype.appendTo = function(cntr) {
    this.ele.appendTo(cntr);
};
/*This method is usefull to accomidate more cell.*/
NativeCanvas.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    this.ele.attr({'width': width, 'height': height});
};

/*Draws vertical and horizontal lines using lineTo method of canvas object.*/
NativeCanvas.prototype.drawGuids = function(xGuids, yGuids, xGap, yGap, color) {
    this.grahic.lineWidth = 1;
    this.grahic.strokeStyle = color || "#000000";
    this.grahic.beginPath();
    for (var i = 0; i <= xGuids; i++) {
        this.grahic.moveTo(i * xGap, 0);
        this.grahic.lineTo(i * xGap, this.height);
    }
    for (var j = 0; j <= yGuids; j++) {
        this.grahic.moveTo(0, j * yGap);
        this.grahic.lineTo(this.width, j * yGap);
    }
    this.grahic.stroke();
};
/*Creates a cell at specified location. filled with balck when cell is alive*/
NativeCanvas.prototype.drawRect = function(x, y, width, height, fill, color, stroke) {
    if (fill) {
        if (color) {
            this.grahic.fillStyle = color;
        }
        this.grahic.fillRect(x, y, width, height);
    } else {
        this.grahic.clearRect(x, y, width, height);
    }
    if (stroke) {
        this.grahic.stroke();
    }
};

/*wipes all cells and guides to recreate the new set of cells for current settings*/
NativeCanvas.prototype.clear = function() {
    this.drawRect(0, 0, this.ele.width(), this.ele.height());
};