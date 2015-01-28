/**   
* @fileOverview ��ά�ؼ�Ӱ��ʸ��ͼ��ӿ�
* @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
* @version 1.0 
*/

/**
* ͼ������ӿ�
*/
function ImageLayerAPI() {
};

/**
* ͼ���������
*/
var ImageLayerOpObj = new ImageLayerAPI();


/**
* ����Ӱ��ͼ��
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
* �����ļ���ͼ��
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
* ɾ��ͼ��
*/
ImageLayerAPI.prototype.RemoveLayer = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "RemoveLayer", param);
    }
};

/**
* ɾ������ͼ��
*/
ImageLayerAPI.prototype.RemoveAll = function () {
    if (HasTDECtrl()) {
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "RemoveAll", null);
    }
};

/**
* ��������
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
* ��ȡ������Դ����
*/
ImageLayerAPI.prototype.GetType = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetType", param);
    }
};

/**
* ��ȡ��������Դ�ַ�����ʶ
*/
ImageLayerAPI.prototype.GetOpenString = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetOpenString", param);
    }
};

/**
* ��ȡ�����ʾ����
*/
ImageLayerAPI.prototype.GetTopScale = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetTopScale", param);
    }
};

/**
* ˢ��ͼ�㣬������ػ���
*/
ImageLayerAPI.prototype.Update = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "Update", param);
    }
};

/**
* �����Ƿ�ɼ�
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
* ��ȡ�Ƿ�ɼ�
*/
ImageLayerAPI.prototype.IsVisible = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "IsVisible", param);
    }
};

/**
* ����͸����
* ȡֵ��Χ[0, 1]��0Ϊȫ͸����1Ϊ��͸��
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
* ��ȡ͸����
*/
ImageLayerAPI.prototype.GetTransparent = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetTransparent", param);
    }
};

/**
* ����͸��ɫ
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
* ��ȡ͸��ɫ
*
* @return ����͸��ɫ����
*
* ����ֵ��ʽ��"true|false,color";
*/
ImageLayerAPI.prototype.GetTransparentColor = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetTransparentColor", param);
    }
};

/**
* ������ʾ�ȼ�
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
* ��ȡ��ʾ�ȼ�
*/
ImageLayerAPI.prototype.GetDispLevel = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetDispLevel", param);
    }
};

/**
* ������ʾ��Χ
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
* ��ȡ��ʾ��Χ
*
* @return ��Χ��Ϣ
*      ��ʽ "minx,miny,maxx,maxy"
*/
ImageLayerAPI.prototype.GetVisibleRange = function (name) {
    if (HasTDECtrl()) {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("ImageLayerOper", "GetVisibleRange", param);
    }
};

/**
* ������ʾ���������
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
* ����ͨ��Ӱ������ͼ��
* 
* @param name, ����
*
*/
ImageLayerAPI.prototype.CreateCommonImageLayer = function (name, parent, url) {
    var inname = this.CreateImageLayer(name, parent);
    this.OpenData(inname, "CommonNetImageSource", url);
}

/**
* ������ͼ�ĵ�����ͼ��
*
* �÷���������IGS�����ĵ�ͼ�ĵ�����
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
* ����ʸ������ͼ��
*
* �÷���������IGS������ʸ������
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
* ������Ƭͼ��
*
* �÷���������IGS������HDF��������
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