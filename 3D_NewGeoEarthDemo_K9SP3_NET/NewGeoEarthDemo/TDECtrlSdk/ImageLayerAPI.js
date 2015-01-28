/**   
* @fileOverview 三维控件影像、矢量图层接口
* @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
* @version 1.0 
*/

/**
* 图层操作接口
*/
function ImageLayerAPI() {
};

/**
* 图层操作对象
*/
var ImageLayerOpObj = new ImageLayerAPI();


/**
* 创建影像图层
*/
ImageLayerAPI.prototype.CreateImageLayer = function (name, parent) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = parent;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "CreateImageLayer", param);
    }
};

/**
* 创建文件夹图层
*/
ImageLayerAPI.prototype.CreateForderLayer = function (name, parent) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = parent;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "CreateForderLayer", param);
    }
};

/**
* 删除图层
*/
ImageLayerAPI.prototype.RemoveLayer = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "RemoveLayer", param);
    }
};

/**
* 删除所有图层
*/
ImageLayerAPI.prototype.RemoveAll = function () {
    if (HasTDECtrl()) {
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "RemoveAll", null);
    }
};

/**
* 关联数据
*/
ImageLayerAPI.prototype.OpenData = function (name, dataType, openStr) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = dataType;
        param[2] = openStr;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "OpenData", param);
    }
};

/**
* 获取关联数源类型
*/
ImageLayerAPI.prototype.GetType = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetType", param);
    }
};

/**
* 获取关联数据源字符串标识
*/
ImageLayerAPI.prototype.GetOpenString = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetOpenString", param);
    }
};

/**
* 获取最高显示比例
*/
ImageLayerAPI.prototype.GetTopScale = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetTopScale", param);
    }
};

/**
* 刷新图层，清除本地缓存
*/
ImageLayerAPI.prototype.Update = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "Update", param);
    }
};

/**
* 设置是否可见
*/
ImageLayerAPI.prototype.SetVisible = function (name, visible, cascade) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = visible;
        param[2] = cascade;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "SetVisible", param);
    }
};

/**
* 获取是否可见
*/
ImageLayerAPI.prototype.IsVisible = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "IsVisible", param);
    }
};

/**
* 设置透明度
* 取值范围[0, 1]，0为全透明，1为不透明
*/
ImageLayerAPI.prototype.SetTransparent = function (name, opacity) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = opacity;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "SetTransparent", param);
    }
};

/**
* 获取透明度
*/
ImageLayerAPI.prototype.GetTransparent = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetTransparent", param);
    }
};

/**
* 设置透明色
* 
*/
ImageLayerAPI.prototype.SetTransparentColor = function (name, color, enable) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = color;
        param[2] = enable;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "SetTransparentColor", param);
    }
};

/**
* 获取透明色
*
* @return 返回透明色设置
*
* 返回值格式："true|false,color";
*/
ImageLayerAPI.prototype.GetTransparentColor = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetTransparentColor", param);
    }
};

/**
* 设置显示等级
*/
ImageLayerAPI.prototype.SetDispLevel = function (name, startlevel, endlevel) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = startlevel;
        param[2] = endlevel;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "SetDispLevel", param);
    }
};

/**
* 获取现示等级
*/
ImageLayerAPI.prototype.GetDispLevel = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetDispLevel", param);
    }
};

/**
* 设置显示范围
*/
ImageLayerAPI.prototype.SetVisibleRange = function (name, enable, minx, miny, maxx, maxy) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = enable;
        param[2] = minx;
        param[3] = miny;
        param[4] = maxx;
        param[5] = maxy;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "SetVisibleRange", param);
    }
};

/**
* 获取现示范围
*
* @return 范围信息
*      格式 "minx,miny,maxx,maxy"
*/
ImageLayerAPI.prototype.GetVisibleRange = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetVisibleRange", param);
    }
};

/**
* 设置显示多边形区域
*/
ImageLayerAPI.prototype.SetVisiblePolygon = function (name, enable, polygon) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        param[1] = enable;
        param[2] = polygon;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "SetVisiblePolygon", param);
    }
};

/**
* 创建通用影像数据图层
* 
* @param name, 名称
*
*/
ImageLayerAPI.prototype.CreateCommonImageLayer = function (name, parent, url) {
    var inname = this.CreateImageLayer(name, parent);
    this.OpenData(inname, "CommonNetImageSource", url);
}

/**
* 创建地图文档数据图层
*
* 该方法适用于IGS发布的地图文档数据
*/
ImageLayerAPI.prototype.CreateMapImageLayer = function (name, parnet, server, docName, layers, format, filters, style) {
    var urltemp = "http://{server}/igs/rest/mrms/docs/{docName}?f={f}&w={w}&h={h}&layers={layers}&filters={filters}&bbox={xmin},{ymin},{xmax},{ymax}&style={style}";
    urltemp.replace(/\{server\}/, server);
    urltemp.replace(/\{docName\}/, docName);
    urltemp.replace(/\{layers\}/, layers)
    urltemp.replace(/\{f\}/, format);
    urltemp.replace(/\{filters\}/, filters)
    urltemp.replace(/\{style\}/, style);
    urltemp.replace(/\{w\}/, "512");
    urltemp.replace(/\{h\}/, "512");
    var inname = this.CreateImageLayer(name, parent);
    this.OpenData(inname, "CommonNetImageSource", urltemp);
}

/**
* 创建矢量数据图层
*
* 该方法适用于IGS发布的矢量数据
*/
ImageLayerAPI.prototype.CreateVectorImageLayer = function (name, parnet, server, gdbps, format, filters, style) {
    // url template
    //var urltemp = "http://{server}/igs/rest/mrms/layer?f={f}&gdbps={gdbps}&style={style}&filters={filters}&bbox={xmin},{ymin},{xmax},{ymax}&w={w}&h={h}";
      var urltemp = "http://{server}/igs/rest/mrms/layer?f={f}&gdbps={gdbps}&filters={filters}&bbox={xmin},{ymin},{xmax},{ymax}&w={w}&h={h}";

    urltemp = urltemp.replace(/\{server\}/, server);
    urltemp = urltemp.replace(/\{gdbps\}/, gdbps);
    urltemp = urltemp.replace(/\{f\}/, format);
    urltemp = urltemp.replace(/\{filters\}/, filters)
    urltemp = urltemp.replace(/\{style\}/, style);
    urltemp = urltemp.replace(/\{w\}/, "512");
    urltemp = urltemp.replace(/\{h\}/, "512");

    var inname = this.CreateImageLayer(name, parent);
    this.OpenData(inname, "CommonNetImageSource", urltemp);
}

/**
* 创建瓦片图层
*
* 该方法适用于IGS发布的HDF缓存数据
*/
ImageLayerAPI.prototype.CreateTiltImageLayer = function (name, parnet, server, cacheName, compress, rate) {
   // var urltemp = "http://{server}/igs/rest/mrms/tile/{cacheName}/{level}/{row}/{col}?compress={compress}&rate={rate}";
    var urltemp = "http://" + server + "/igs/rest/mrms/tile/"+cacheName+"/{level}/{row}/{col}?compress="+compress+"&rate="+rate;
    //    urltemp.replace(/\{server\}/, server);
    //    urltemp.replace(/\{cacheName\}/, cacheName);
    //    urltemp.replace(/\{compress\}/, compress);
    //    urltemp.replace(/\{rate\}/, rate
    var inname = this.CreateImageLayer(name, parent);
    this.OpenData(inname, "CommonNetImageSource", urltemp);
}