"use strict";
var canvas = /** @class */ (function () {
    function canvas(element, config) {
        var _this = this;
        this.images = [];
        this.imgs = [];
        this.restore = function () {
            _this.canvas.clearRect(0, 0, _this.canvas.canvas.width, _this.canvas.canvas.height);
            _this.imgs.forEach(function (img) {
                _this.showimage(img);
            });
            requestAnimationFrame(_this.restore);
        };
        var canvas = document.createElement('canvas');
        this.config = config;
        this.canvas = canvas.getContext('2d');
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        element.appendChild(canvas);
        this.resize(element, canvas);
        this.loadimage();
        requestAnimationFrame(this.restore);
    }
    canvas.prototype.resize = function (element, canvas) {
        addEventListener('resize', function () {
            canvas.width = element.offsetWidth;
            canvas.height = element.offsetHeight;
        });
    };
    canvas.prototype.loadimage = function () {
        var _this = this;
        this.config.images.forEach(function (img) {
            var image = new Image();
            image.src = img;
            _this.images.push(image);
        });
        for (var index = 0; index < parseInt((innerWidth / 5 + innerHeight / 5).toFixed()); index++) {
            var rerotate = Math.random() - .5 > 0 ? 1 : -1;
            this.imgs.push({
                rotate: Math.PI / 180 * Math.random(),
                rerotate: (Math.random() / 20 + .008) * rerotate,
                scale: Math.random() / 8 + .2,
                imgnum: Math.round(Math.random() * (this.images.length - 1)),
                x: Math.random() * innerWidth * 2 - .5 * innerWidth,
                rex: Math.random() / 3 - 1 / 6,
                y: Math.random() * innerHeight * 3 - innerHeight,
                rey: Math.random() / 2 + 1
            });
        }
    };
    canvas.prototype.showimage = function (config) {
        this.canvas.save();
        config.rotate += config.rerotate;
        config.x += config.rex;
        config.y += config.rey;
        if (config.x > 2 * innerWidth) {
            config.x = -innerWidth;
            config.imgnum = Math.round(Math.random() * (this.images.length - 1));
        }
        if (config.y > 2 * innerHeight) {
            config.y = -innerHeight;
            config.x = Math.random() * innerWidth * 2 - .5 * innerWidth;
            config.imgnum = Math.round(Math.random() * (this.images.length - 1));
        }
        this.canvas.translate(config.x + this.images[config.imgnum].width / 2, config.y + this.images[config.imgnum].height / 2);
        this.canvas.scale(config.scale, config.scale);
        this.canvas.rotate(config.rotate);
        this.canvas.translate(-(config.x + this.images[config.imgnum].width / 2), -(config.y + this.images[config.imgnum].height / 2));
        this.canvas.drawImage(this.images[config.imgnum], config.x, config.y);
        this.canvas.restore();
    };
    return canvas;
}());
