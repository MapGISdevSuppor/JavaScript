/**   
 * @fileOverview 三维“云图”，地表贴图接口
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */

/**
 * 云图操作接口
 */
function CloudyLayerAPI()
{
};

/**
 * 云图操作对象
 */
var CloudyOpObj = new CloudyLayerAPI();

/**
 * 创建
 */
CloudyLayerAPI.prototype.Create = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "Create", param);
    }
};

/**
 * 创建
 */
CloudyLayerAPI.prototype.Create2 = function(name, url, minx, miny, maxx, maxy, height)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = url;
        param[2] = minx;
        param[3] = miny;
        param[4] = maxx;
        param[5] = maxy;
        param[6] = height;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "Create2", param);
    }
};

/**
 * 移除
 */
CloudyLayerAPI.prototype.Remove = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "Remove", param);
    }
};

/**
 * 移除
 */
CloudyLayerAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "RemoveAll", null);
    }
};

/**
 * 设置参数：范围
 */
CloudyLayerAPI.prototype.SetRange = function(name, minx, miny, maxx, maxy)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = minx;
        param[2] = miny;
        param[3] = maxx;
        param[4] = maxy;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetRange", param);
    }
};

/**
 * 获取参数：范围
 *
 * @return 范围信息
 *      格式 "minx,miny,maxx,maxy"
 */
CloudyLayerAPI.prototype.GetRange = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetRange", param);
    }
};

/**
 * 设置图层高度
 */
CloudyLayerAPI.prototype.SetHeight = function(name, height)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = height;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetHeight", param);
    }
};

/**
 * 获取图层高度
 */
CloudyLayerAPI.prototype.GetHeight = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetHeight", param);
    }
};

/**
 * 设置颜色
 *
 * 该属性仅在没有设置材质或者纹理的时候有效
 * 如果设置了材质或者纹理，将忽略该属性
 */
CloudyLayerAPI.prototype.SetColor = function(name, color)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = color;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetColor", param);
    }
};

/**
 * 获取颜色
 */
CloudyLayerAPI.prototype.GetColor = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetColor", param);
    }
};


/**
 * 设置图片路径或者url
 */
CloudyLayerAPI.prototype.SetPic = function(name, url)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = url;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetPic", param);
    }
};

/**
 * 获取图片路径或者url
 */
CloudyLayerAPI.prototype.GetPic = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetPic", param);
    }
};

/**
 * 设置材质名称
 *
 * 说明：该接口是一种高级用法，指定一种预定义好的渲染效果
 * 材质：是对物体表面效果的描述
 *
 */
CloudyLayerAPI.prototype.SetMaterial = function(name, matName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = matName;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetMaterial", param);
    }
};

/**
 * 获取材质名称
 */
CloudyLayerAPI.prototype.GetMaterial = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetMaterial", param);
    }
};

/**
 * 设置透明度
 */
CloudyLayerAPI.prototype.SetTransparent = function(name, opacity)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = opacity;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetTransparent", param);
    }
};

/**
 * 获取透明度
 */
CloudyLayerAPI.prototype.GetTransparent = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetTransparent", param);
    }
};

/**
 * 设置透明色
 */
CloudyLayerAPI.prototype.SetTransparentColor = function(name, color)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = color;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetTransparentColor", param);
    }
};

/**
 * 获取透明色
 */
CloudyLayerAPI.prototype.GetTransparentColor = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetTransparentColor", param);
    }
};

/**
 * 设置空洞
 */
CloudyLayerAPI.prototype.SetRectHole = function (name, minx, miny, maxx, maxy)  
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = minx;
        param[2] = miny;
        param[3] = maxx;
        param[4] = maxy;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetRectHole", param);
    }
}

/**
 * 获取空洞范围
 *
 * @return 范围信息
 *      格式 "minx,miny,maxx,maxy" 
 */
CloudyLayerAPI.prototype.GetRectHole = function (name)  
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "GetRectHole", param);
    }
}

/**
 * 设置多边形
 *
 * @pts 多边形的点
 *      格式 "x1,y1|x2,y2|...|xn,yn" 
 */
CloudyLayerAPI.prototype.SetPolygon = function (name, pts)  
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = pts;
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "SetPolygon", param);
    }
}

//-=================================================================

/**
 * 地表贴图操作接口
 */

function OnTerrainLayerAPI()
{
};

/**
 * 地表贴图操作对象
 */
var OnTerrainOpObj = new OnTerrainLayerAPI();


/**
 * 创建
 */
OnTerrainLayerAPI.prototype.Create = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "Create", param);
    }
};

/**
 * 创建
 */
OnTerrainLayerAPI.prototype.Create2 = function(name, url, minx, miny, maxx, maxy)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = url;
        param[2] = minx;
        param[3] = miny;
        param[4] = maxx;
        param[5] = maxy;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "Create2", param);
    }
};

/**
 * 移除
 */
OnTerrainLayerAPI.prototype.Remove = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "Remove", param);
    }
};

/**
 * 移除
 */
OnTerrainLayerAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "RemoveAll", null);
    }
};

/**
 * 设置参数：范围
 */
OnTerrainLayerAPI.prototype.SetRange = function(name, minx, miny, maxx, maxy)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = minx;
        param[2] = miny;
        param[3] = maxx;
        param[4] = maxy;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetRange", param);
    }
};

/**
 * 获取参数：范围
 *
 * @return 范围信息
 *      格式 "minx,miny,maxx,maxy" 
 */
OnTerrainLayerAPI.prototype.GetRange = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetRange", param);
    }
};

/**
 * 设置颜色
 *
 * 该属性仅在没有设置材质或者纹理的时候有效
 * 如果设置了材质或者纹理，将忽略该属性
 */
OnTerrainLayerAPI.prototype.SetColor = function(name, color)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = color;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetColor", param);
    }
};

/**
 * 获取颜色
 */
OnTerrainLayerAPI.prototype.GetColor = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetColor", param);
    }
};


/**
 * 设置图片路径或者url
 */
OnTerrainLayerAPI.prototype.SetPic = function(name, url)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = url;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetPic", param);
    }
};

/**
 * 获取图片路径或者url
 */
OnTerrainLayerAPI.prototype.GetPic = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetPic", param);
    }
};

/**
 * 设置材质名称
 *
 * 说明：该接口是一种高级用法，指定一种预定义好的渲染效果
 * 材质：是对物体表面效果的描述
 *
 */
OnTerrainLayerAPI.prototype.SetMaterial = function(name, matName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = matName;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetMaterial", param);
    }
};

/**
 * 获取材质名称
 */
OnTerrainLayerAPI.prototype.GetMaterial = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetMaterial", param);
    }
};

/**
 * 设置透明度
 */
OnTerrainLayerAPI.prototype.SetTransparent = function(name, opacity)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = opacity;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetTransparent", param);
    }
};

/**
 * 获取透明度
 */
OnTerrainLayerAPI.prototype.GetTransparent = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetTransparent", param);
    }
};

/**
 * 设置透明色
 */
OnTerrainLayerAPI.prototype.SetTransparentColor = function(name, color)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = color;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetTransparentColor", param);
    }
};

/**
 * 获取透明色
 */
OnTerrainLayerAPI.prototype.GetTransparentColor = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetTransparentColor", param);
    }
};

/**
 * 设置空洞
 */
OnTerrainLayerAPI.prototype.SetRectHole = function (name, minx, miny, maxx, maxy)  
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = minx;
        param[2] = miny;
        param[3] = maxx;
        param[4] = maxy;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "SetRectHole", param);
    }
}

/**
 * 获取空洞范围
 *
 * @return 范围信息
 *      格式 "minx,miny,maxx,maxy" 
 */
OnTerrainLayerAPI.prototype.GetRectHole = function (name)  
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "GetRectHole", param);
    }
}
