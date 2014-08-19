/**
 * This file contains 
 * - all the methods required to query and change the state of the dom elements.
 * - Usage of Game Of Life Plugin
 * - Configurations Parsing from dom
 * - Loading presets and apply to stage
 * - Utils to convert date object
 */
/*jshint -W030*/
!function ($win, $){
    "use strict";
    
    /**Utils*/
    !function() {
        var second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24,
                week = day * 7,
                month = week * 30,
                year = month * 365;
        /**
         * Returns object contains y, M, d, h, m, s from milli secs
         * @param {Number} msecs milli secs
         * @param {boolean} includeSecs return object to include secs or not
         * @param {boolean} includeZeros return object to include zero values
         * @returns {Object}
         */
        Object.toTimeParts = function(msecs, includeSecs, includeZeros) {
            var res = {}, _mSign = 1,
                    _diff = msecs;
            if (_diff < 0) {
                _mSign = -1;
                _diff = _diff * _mSign;
            }
            res.y = Math.floor(_diff / year) * _mSign;
            _diff = _diff % year;
            res.M = Math.floor(_diff / month) * _mSign;
            _diff = _diff % month;
            res.d = Math.floor(_diff / day) * _mSign;
            _diff = _diff % day;
            res.h = Math.floor(_diff / hour) * _mSign;
            _diff = _diff % hour;
            res.m = Math.floor(_diff / minute) * _mSign;
            if (includeSecs) {
                res.s = Math.floor((_diff % minute) / second) * _mSign;
            }
            if (!includeZeros) {
                Object.keys(res).forEach(function(key) {
                    if (res[key] === 0) {
                        delete res[key];
                    }
                });
            }
            return res;
        };
    }();
    /**/
    
    
    
    var Page = {}; //Page Object 
    
    /**
     * Thsi function validates the configuration modification. Reset invalid configuratiions.
     * Return value of this function will be feeded GameOfLife plugin
     * @returns 
     *      nXCells - Number of cells in x direction
            nYCells - Number of cell sin y direction
            cellW   - Each cell's width
            cellH   - Each cell's height
            enableGuides    - Toggles the visibility of guide lines on canvas
            speed   - Time delay between two stage of game. Min 1 (~=100ms), Max 10 (~=1s)
     */
    function getValidConf(){
        var cnfg = {};
        $.each(Page.ele.configFrm.serializeArray(), function(ind, obj){
            cnfg[obj.name] = obj.value;
        });
        
        if (isNaN(cnfg.cells)) {
            cnfg.cells = 5;
        } else {
            cnfg.cells = parseInt(cnfg.cells, 10);
            cnfg.cells = cnfg.cells < 0 ? 0 : cnfg.cells > 50 ? 50 : cnfg.cells;
        }
        Page.ele.cells.val(cnfg.cells);

        if (isNaN(cnfg.cellW)) {
            cnfg.cellW = 15;
        } else {
            cnfg.cellW = parseInt(cnfg.cellW, 10);
            cnfg.cellW = cnfg.cellW < 1 ? 1 : cnfg.cellW > 50 ? 50 : cnfg.cellW;
        }
        Page.ele.cellW.val(cnfg.cellW);

        if (isNaN(cnfg.cellH)) {
            cnfg.cellH = 15;
        } else {
            cnfg.cellH = parseInt(cnfg.cellH, 10);
            cnfg.cellH = cnfg.cellH < 1 ? 1 : cnfg.cellH > 50 ? 50 : cnfg.cellH;
        }
        Page.ele.cellH.val(cnfg.cellH);

        if (isNaN(cnfg.speed)) {
            cnfg.speed = 6;
        } else {
            cnfg.speed = parseInt(cnfg.speed, 10);
            cnfg.speed = cnfg.speed < 1 ? 1 : cnfg.speed > 10 ? 10 : cnfg.speed;
        }
        Page.ele.speed.val(cnfg.speed);
        
        return {
            nXCells: cnfg.cells,
            nYCells: cnfg.cells,
            cellW: cnfg.cellW,
            cellH: cnfg.cellH,
            enableGuides: !!cnfg.showGuides,
            speed: cnfg.speed
        };
    }
    
    /**
     * This method invokes plugin functions to stop current execution and 
     * apply new configurations.
     * @param {Object} state 
     *      nXCells - Number of cells in x direction
            nYCells - Number of cell sin y direction
            cellW   - Each cell's width
            cellH   - Each cell's height
            enableGuides    - Toggles the visibility of guide lines on canvas
            speed   - Time delay between two stage of game. Min 1 (~=100ms), Max 10 (~=1s)
            pattern - (optional) initial state of cells 2D array
     **/
    Page.setGameState = function(state){
        Page.ele.canvasCntr.gol('stop');
        Page.ele.canvasCntr.gol('applyPreset', state);
        Page.ele.genNum.html(0);
        Page.ele.alive.html(0);
        Page.ele.dead.html(0);
        Page.ele.timeElapsed.html(0);
    };
    
    /*
     * Applies preset values into Configuration panel DOM fields
     * and call setGameState function to apply preset loaded to game
     */
    Page.applyPreset = function(preset){
        Page.ele.cells.val(preset.nXCells);
        Page.ele.cellW.val(preset.cellW);
        Page.ele.cellH.val(preset.cellH);
        Page.ele.speed.val(preset.speed);
        Page.ele.showGuides.prop('checked', preset.enableGuides);
        Page.setGameState(preset);
    };
    
    /**
     * This function binds events to listeners
     *  - all Game Config / State controling DOM elemnts 
     *  - canvas container for game state related events
     * 
     */
    Page.bindEvents = function(){
        Page.ele.btnStep.click(function(){
            Page.ele.canvasCntr.gol('step');
        });
        Page.ele.btnStart.click(function(){
            Page.ele.canvasCntr.gol('start');
        });
        Page.ele.btnStop.click(function(){
            Page.ele.canvasCntr.gol('stop');
        });
        Page.ele.btnApply.click(function(){
            var _props = getValidConf(), _val;
            _val = Page.ele.golPresets.val();
            if(_val) {
                _val = _val.split(',');
                _val = $win.golPatterns.getByName.apply(null, _val);
            }
            _props.pattern = _val && _val.pattern;
            Page.setGameState(_props);
        });
        
        Page.ele.canvasCntr.on('steped.gol', function(ev, genInfo, inst){
            var _timeElapsed = genInfo.genNo * inst.cnfg.speed*100, _ts='';
            _timeElapsed = Object.toTimeParts(_timeElapsed, true);
            
            $.each(_timeElapsed, function(name, val){
                _ts += ' '+val+name;
            });
            _timeElapsed = _ts.split(' ');
            _ts = _timeElapsed.pop();
            if(_timeElapsed.length){
                _ts = _timeElapsed.pop()+ ' ' +_ts;
            }
            Page.ele.genNum.html(genInfo.genNo);
            Page.ele.alive.html(genInfo.alive);
            Page.ele.dead.html(genInfo.dead);
            Page.ele.timeElapsed.html(_ts || '0');
        });
        Page.ele.canvasCntr.on('stopped.gol', function(){
            Page.ele.configBtnsWrp.removeClass('started');
        });
        Page.ele.canvasCntr.on('alldead.gol', function(){
        });
        Page.ele.canvasCntr.on('started.gol', function(){
            Page.ele.configBtnsWrp.addClass('started');
        });
        Page.ele.on('click.accordion', '[data-toggle-class]', function(e){
            var _this = $(this), _data = _this.data(), _cls = _data.toggleClass, _target = _data.target;
            _this.closest(_target).toggleClass(_cls);
        });
        Page.ele.golPresets.on('change', function(){
            var _val = Page.ele.golPresets.val();
            Page.ele.golPresetsHint[_val?'hide':'show']();
            if(_val) {
                _val = _val.split(',');
                _val = $win.golPatterns.getByName.apply(null, _val);
            }
            if(!_val) {
                _val = {
                    nXCells: 10,
                    nYCells: 10,
                    cellW: 15,
                    cellH: 15,
                    enableGuides: true,
                    speed: 6
                };
            }
            Page.applyPreset(_val);
        });
    };
    
    /**
     * This method gets the name of preses defined in patterns.js  and creates
     * a dropdown box to allow user to choose from
     */
    Page.loadPrsesets = function(){
        if($win.golPatterns && $win.golPatterns.getNames) {
            var _opts = $win.golPatterns.getNames();
            Object.keys(_opts).forEach(function(catName){
                var _grp = $('<optgroup label="'+catName+'"></optgroup>').appendTo(Page.ele.golPresets);
                _opts[catName].forEach(function (name){
                    _grp.append('<option value="'+catName+','+name+'">'+name+'</option>');
                });
            });
        }
    };
    
    /**
     * This is the main method. Invoked when DOM is ready.
     *  - Queries dom using ng-query attribute and maintians the refernce of tragetted dom elements
     *  - Initiates Game Of Life plugin on canvas container
     *  - Binds events
     * @param {Jquery-DOM} pageEle - Div with #main
     */
    Page.init = function(pageEle){
        Page.ele = pageEle;
        Page.ele.find('[ng-query]').each(function(){
            var _thisEle = $(this);
            Page.ele[_thisEle.attr('ng-query')] = _thisEle;
        });
        Page.ele.canvasCntr.gol();
        Page.loadPrsesets();
        Page.bindEvents();
    };
    
    
    $(function(){
        Page.init($('#main'));
    });
}(window, window.jQuery);
/*jshint +W030*/