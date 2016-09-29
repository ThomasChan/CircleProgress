/**
 * Circle Progress
 *
 * Author: Thomas Chan (http://chenjunhao.cn)
 * Homepage: https://github.com/ThomasChan/CircleProgress
 * Issue Tracker: https://github.com/ThomasChan/CircleProgress/issues
 * License: MIT
*/
(function() {

    var BACKGROUND_LINE_WIDTH = 2.0
    var CIRCLE_LINE_WIDTH = 6.0
    var PROGRESS_END_RADIUS = 16
    var PROGRESS_END_WIDTH = 52
    var PROGRESS_END_HEIGHT = 24

    /**
     * [CircleProgress draw circle progress use canvas]
     * @param  object config = {
     *      element: dom element, canvas
     *      width: canvas width
     *      height: canvas height
     *      radius: circle radius
     *      startAngle: [0 - 360]
     *      endAngle: [0 - 360]
     *      current: [0 - 1], ep: 0.1/0.01/0.25/0.5
     *      backgroundColor: '#fff'/'red'
     *      circleColor: '#fff'/'black'
     * }
     */
    var CircleProgress = function (config) {
        if (!config.element) {
            throw new Error('Error: CircleProgress must have dom element')
        }
        if (config.element.tagName.toLowerCase() !== 'canvas') {
            var _ele = document.createElement('canvas')
            _ele.id = '_ele_cirle_progress_' + Math.ceil(Math.random() * 1000)
            _ele.width = config.element.clientWidth
            _ele.height = config.element.clientHeight
            config.element.appendChild(_ele)
            this.ctx = _ele.getContext('2d')
        } else {
            this.ctx = config.element.getContext('2d')
        }
        this.width = config.width || config.element.clientWidth
        this.height = config.height || config.element.clientHeight
        this.centerCoordinate = (this.width >= this.height) ? (this.width / 2) : (this.height / 2)
        this.backgroundLineWidth = config.backgroundLineWidth || BACKGROUND_LINE_WIDTH
        this.circleLineWidth = config.circleLineWidth || CIRCLE_LINE_WIDTH
        this.radius = config.radius || (this.centerCoordinate - this.backgroundLineWidth - PROGRESS_END_RADIUS) // 半径
        this.startAngle = config.startAngle || Math.PI / 2
        this.endAngle = config.endAngle || 360
        this.current = config.current > 1 ? 1 : config.current || 0
        this.progressEndRadius = config.progressEndRadius || PROGRESS_END_RADIUS
        this.progressEndWidth = config.progressEndWidth || PROGRESS_END_WIDTH
        this.progressEndHeight = config.progressEndHeight || PROGRESS_END_HEIGHT
        this.backgroundColor = config.backgroundColor || '#e5f1fd'
        this.circleColor = config.circleColor || '#77ccf4'
        this.textColor = config.textColor || '#fff'
        this.textEnd = config.textEnd || '已投满'
        this.font = config.font || '12px Helvetica Neue'

        this._shadow_current = 0
        this.draw()
        return this
    }

    CircleProgress.prototype.drawId = undefined
    CircleProgress.prototype.draw = function(current) {
        if (Number(current) >= 0) {
            this.current = current > 1 ? 1 : current
        }
        if (this._shadow_current < Math.floor(this.current * 1000 / 10)) {
            window.cancelAnimationFrame(this.drawId)
            this.drawId = undefined
        }
        var _this = this
        var _draw = function() {
            if (_this.current === 0) {
                _this._shadow_current = 0
                _this.ctx.clearRect(0, 0, _this.width, _this.height)
                _this.drawBackground().drawCircle().drawText()
                window.cancelAnimationFrame(_this.drawId)
                _this.drawId = undefined
                return false;
            }
            if (_this._shadow_current == Math.floor(_this.current * 1000 / 10)) {
                window.cancelAnimationFrame(_this.drawId)
                _this.drawId = undefined
                return false;
            } else if (_this._shadow_current > Math.floor(_this.current * 1000 / 10)) {
                _this._shadow_current -= 1
            } else if (_this._shadow_current < Math.floor(_this.current * 1000 / 10)) {
                _this._shadow_current += 1
            }
            _this.ctx.clearRect(0, 0, _this.width, _this.height);
            _this.drawBackground().drawCircle().drawText()
            _this.drawId = window.requestAnimationFrame(_draw)
        }
        _draw()
    }

    CircleProgress.prototype.restart = function() {
        this._shadow_current = 0
        this.draw()
    }

    /**
     * [drawBackground]
     */
    CircleProgress.prototype.drawBackground = function () {
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.backgroundColor
        this.ctx.lineWidth = this.backgroundLineWidth
        this.ctx.arc(
            this.centerCoordinate,
            this.centerCoordinate,
            this.radius,
            -this.startAngle,
            this.endAngle,
            false
        )
        this.ctx.stroke()
        this.ctx.closePath()
        return this
    }

    /**
     * [drawCircle]
     */
    CircleProgress.prototype.drawCircle = function() {
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.circleColor
        this.ctx.lineWidth = this.circleLineWidth
        this.ctx.arc(
            this.centerCoordinate,
            this.centerCoordinate,
            this.radius - 2,
            -this.startAngle,
            Math.PI * 2 * (this._shadow_current / 100) - this.startAngle,
            false
        )
        this.ctx.stroke()
        this.ctx.closePath()
        return this
    }

    /**
     * [drawText]
     */
    CircleProgress.prototype.drawText = function () {
        var progressEndX = this.centerCoordinate + this.radius * Math.cos(
            (((this._shadow_current / 100) * 360) * Math.PI / 180) - this.startAngle
        )
        var progressEndY = this.centerCoordinate + this.radius * Math.sin(
            (((this._shadow_current / 100) * 360) * Math.PI / 180) - this.startAngle
        )
        if (this._shadow_current < 100) {
            this.ctx.beginPath()
            this.ctx.fillStyle = this.circleColor
            this.ctx.arc(progressEndX, progressEndY, this.progressEndRadius, 0, 360, false)
            this.ctx.fill()
            this.ctx.closePath()
        } else if (this._shadow_current >= 100) {
            this.roundRect(progressEndX - this.progressEndWidth / 2, progressEndY - this.progressEndHeight / 4, 
                this.progressEndWidth, this.progressEndHeight, 4, this.circleColor, false)
        }
        this.ctx.fillStyle = this.textColor
        this.ctx.lineWidth = this.textLineWidth
        this.ctx.textAlign = 'center'
        this.ctx.font = this.font
        if (this._shadow_current < 100) {
            this.ctx.fillText(this._shadow_current + '%', progressEndX, progressEndY + 5)
        } else if (this._shadow_current >= 100) {
            this.ctx.fillText(this.textEnd, progressEndX, progressEndY + 10)
        }
        return this
    }

    /**
     * [roundRect draw round rect]
     * @param  number x      [x coordinate]
     * @param  number y      [y coordinate]
     * @param  number width  [rect width]
     * @param  number height [rect height]
     * @param  number radius [fillet radius]
     * @param  number fill   [background color]
     * @param  number stroke [border color]
     */
    CircleProgress.prototype.roundRect = function(x, y, width, height, radius, fill, stroke) {  
        var radius = radius || 5;
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        if (stroke) {
            this.ctx.strokeStyle = stroke;
            this.ctx.stroke();
        }
        if (fill) {
            this.ctx.fillStyle = fill;
            this.ctx.fill();
        }
        this.ctx.closePath();
    }

    /**
     * requestAnimationFrame polyfill
     */
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = new Date().getTime();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    window.CircleProgress = CircleProgress

})();
