/**
 * This file containes methods to support Game of Life Jquery Plugin
 * @author Naveen I
 * @param {window} $win
 * @param {jQuery} $
 * @returns {undefined}
 */
/*jshint -W030*/
!function($win, $) {
    "use strict";
    /**
     * Method to detect support to canvas
     */
    !function() {
        $win.canvasSupported = !! $win.HTMLCanvasElement;
        $win.canvas2DSupported = !! $win.CanvasRenderingContext2D;
        if (!$win.canvasSupported) {
            var _cnv = document.createElement("canvas");
            $win.canvasSupported = !! (_cnv.getContext && _cnv.getContext('2d'));
            $win.canvas2DSupported = $win.canvasSupported;
        }
    }();