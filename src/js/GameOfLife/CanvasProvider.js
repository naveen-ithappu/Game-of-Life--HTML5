/*Factory method created encapsulate the creation of canvas object for drawing*/
var CanvasProvider = {
    getCanvas: function() {
        return $win.canvasSupported ? new NativeCanvas() : new PolyCanvas();
    }
};