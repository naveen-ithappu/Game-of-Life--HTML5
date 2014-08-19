/**
 * Detect IE
 * @param {Window} win
 * @param {Navigator} navigator
 */
/*jshint -W030 */
!function (win, navigator){
    "use strict";
    var myNav = navigator.userAgent.toLowerCase();
    win.isIE = (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
}(window, navigator);
/**
 * Fixing Height problem in IE < 8
 * @param {Window} win
 * @param {JQuery} $
 */
!function (win, $){
    "use strict";
    var _mainDiv, _body, _navBarHeight = 50;
    function resize(){
        _mainDiv = _mainDiv || $('#main');
        _body = _body || $('body');
        _mainDiv.height(_body.height()-_navBarHeight);
    }
    if(win.isIE<8){
        $('html').addClass('ielt8');
    } else if(win.isIE<9){
        $('html').addClass('ielt9');
    }
    
    if(win.isIE && win.isIE<8) {
        resize();
        $(win).resize(resize);
    }
}(window, window.jQuery);
/*jshint +W030 */