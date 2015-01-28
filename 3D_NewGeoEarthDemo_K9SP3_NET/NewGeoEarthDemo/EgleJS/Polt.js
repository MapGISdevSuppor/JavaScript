function Polt() {
	this.container = null;
	//原点x
	this.ox = 500;
	//原点y
	this.oy = 300;
	//坐标颜色
	this.baseLineColor = "black";
	//画笔颜色
	this.brushColor = "red";
	//画笔粗细
	this.brushWeight = 1;
	//baseLineX，baseLineY保存坐标线，用于坐标移位
	this.baseLineX = null;
	this.baseLineY = null;
}

//var PoltObjRect = new Polt();
//var PlotObjPolygon = new Polt();

//初始化方法，设置画布，原点位置，坐标线颜色，画笔颜色，画笔粗细
Polt.prototype.init = function(containerId, ox, oy, baseLineColor, brushColor, brushWeight) {
	if (document.getElementById(containerId)) {
		this.container = document.getElementById(containerId);
	} else {
		alert('You should specify an element in which you can draw plot!');
		return;
	}
	if ((typeof ox) == 'number') {
		this.ox = ox;
	}
	if ((typeof oy) == 'number') {
		this.oy = oy;
	}
	this.baseLineColor = baseLineColor;
	this.brushColor = brushColor;
	this.brushWeight = brushWeight;
	this.drawCoordinate();
}

//设置原点函数
Polt.prototype.setOPoint = function(ox, oy) {
	this.ox = ox;
	this.oy = oy;
	this.container.removeChild(this.baseLineX);
	this.container.removeChild(this.baseLineY);
	this.drawCoordinate();
}

//设置画笔粗细函数
Polt.prototype.setBrushWeight = function(weight) {
	this.brushWeight = weight;
}
Polt.prototype.setBrushColor = function(color) {
	this.brushColor = color;
}

//画坐标线
Polt.prototype.drawCoordinate = function() {
	var baseLineX = document.createElement('div');
	baseLineX.style.position = "absolute";
	baseLineX.style.left = 0;
	baseLineX.style.top = this.oy;
	baseLineX.style.fontSize = '1px';
	baseLineX.style.height = '1px';
	baseLineX.style.width = '100%';
	baseLineX.style.overflow = 'hidden'
	baseLineX.style.backgroundColor = this.baseLineColor;
	this.container.appendChild(baseLineX);
	this.baseLineX = baseLineX;
	var baseLineY = document.createElement('div');
	baseLineY.style.position = "absolute";
	baseLineY.style.left = this.ox;
	baseLineY.style.top = 0;
	baseLineY.style.fontSize = '1px';
	baseLineY.style.height = '100%';
	baseLineY.style.width = '1px';
	baseLineY.style.overflow = 'hidden'
	baseLineY.style.backgroundColor = this.baseLineColor;
	this.baseLineY = baseLineY;
	this.container.appendChild(baseLineY);
}

//清理画布，移走所有对象
Polt.prototype.clean = function () {
    this.container.innerHTML = "";
    this.drawCoordinate();
},
//画点，相对原点
Polt.prototype.drawDot = function (x, y) {
    var dot = document.createElement('div');
    if (this.ox && this.oy) {
        dot.style.left = this.ox + x + 'px';
        dot.style.top = this.oy - y + 'px';
        dot.style.height = this.brushWeight;
        dot.style.width = this.brushWeight;
        dot.style.position = 'absolute';
        dot.style.fontSize = '1px';
        dot.style.backgroundColor = this.brushColor;
        dot.style.overflow = "hidden";
        this.container.appendChild(dot);
        dot = null;

    }

},
//sin函数曲线，传入角度，比如90，180，360
Polt.prototype.sin = function (angle) {
    for (var i = 0; i < angle; i++) {
        this.drawDot(i, Math.sin(i / 180 * Math.PI) * 100);
    }
},
//tan函数曲线
Polt.prototype.tan = function () {
    for (var i = 0; i < 720; i++) {
        if (Math.tan(i / 180 * Math.PI) * 100 > this.oy) {
            continue;
        }
        this.drawDot(i, Math.tan(i / 180 * Math.PI) * 50);
    }
},
//cos 函数曲线，传入角度，比如90，180，360
Polt.prototype.cos = function (angle) {
    for (var i = 0; i < angle; i++) {
        this.drawDot(i, Math.cos(i / 180 * Math.PI) * 100);
    }
},
//画线从(x0,y0)到(x1,y1)
Polt.prototype.line = function (x0, y0, x1, y1) {
    //竖线
    if ((x1 - x0) == 0) {
        for (var i = ((y1 > y0) ? y0 : y1); i < ((y1 > y0) ? y1 : y0); i++) {
            this.drawDot(x1, i);
        }
        return;
    }
    //横线
    if ((y1 - y0) == 0) {
        for (var i = ((x1 > x0) ? x0 : x1); i < ((x1 > x0) ? x1 : x0); i++) {
            this.drawDot(i, y1);
        }
        return;
    }
    //斜线
    //k=斜率，直线方程为y= kx + b
    var k = (y1 - y0) / (x1 - x0);
    if (k <= 1) {
        for (var i = ((x1 > x0) ? x0 : x1); i < ((x1 > x0) ? x1 : x0); i++) {
            this.drawDot(i, k * i + y1 - k * x1);
        }
    } else {
        for (var i = ((y1 > y0) ? y0 : y1); i < ((y1 > y0) ? y1 : y0); i++) {
            this.drawDot((i - y1 + k * x1) / k, i);
        }
    }
    return;
},
//画圆，radius是半径，(xi, yi)为圆心
Polt.prototype.circle = function (radius, xi, yi) {
    if ((typeof xi) == 'undefined') {
        xi = 0;
    }
    if ((typeof yi) == 'undefined') {
        yi = 0;
    }
    //i为角度，从0到360
    var i = 0;
    while (i < 360) {
        var _x0 = Math.sin(i / 180 * Math.PI) * radius;
        var _y0 = Math.cos(i / 180 * Math.PI) * radius;
        var step = radius / 100;
        //随着半径的增大，划出来的圆周断断续续,下面的做法
        //使画圆周的点数随着半径的增大而增大，使画出来的圆周更圆润.
        if (1 / step > 1) {
            step = 1;
        } else if (1 / step < 0.2) {
            step = 0.2;
        } else {
            step = 1 / step;
        }
        this.drawDot(_x0 + xi, _y0 + yi);
        i = i + step;
    }

},
//画多边形，传入一个点列
Polt.prototype.polygon = function (dots) {
    if (typeof dots == 'undefined') {
        alert('you should specify some dots to draw!');
        return;
    }
    if (dots.constructor != Array) {
        alert('you should specify some dots to draw!');
        return;
    }
    for (var i = 0; i < dots.length - 1; i++) {
        this.line(dots[i].x, dots[i].y, dots[i + 1].x, dots[i + 1].y);
        if (i == 1 && dots.length == 2) {
            break;
        }
    }
    this.line(dots[0].x, dots[0].y, dots[dots.length - 1].x,
	dots[dots.length - 1].y);
}