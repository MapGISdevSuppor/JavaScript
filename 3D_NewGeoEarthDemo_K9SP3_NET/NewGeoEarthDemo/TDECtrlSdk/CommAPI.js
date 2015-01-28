/**
 * @fileOverview 三维控件
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */ 

/**
 * 三维控件接口对象
 */
var _3DControl;

/**
 * 获取三维控件对象
 *
 * @ return 三维控件对象
 */
function GetTDECtrl() 
{
    HasTDECtrl();
    return _3DControl;
}

/**
 * 判断是否有三维控件接口对象
 * 
 * @return true或false
 */
function HasTDECtrl()
{
    if (_3DControl != null && _3DControl != "")
    {
        return true;
    }
    
    var version = "";
    
    _3DControl = document.getElementById("WebSceneDisCtrl");
    if (_3DControl != null)
    {
        try
        {
            version = _3DControl.InvokeCmd("CommonOper", "GetVersion", null);
        }
        catch(e)
        {
            _3DControl = null;
        }
    }
    
    if (_3DControl == null)
    {
        _3DControl = document.getElementById("npWebSceneDisCtrl");
        
        try
        {
            version = _3DControl.InvokeCmd("CommonOper", "GetVersion", null);
        }
        catch(e)
        {
            _3DControl = null;
        }
    }
    
    if (_3DControl != null) return true;
    
    return false;
};

/**
 * 获取三维控件所在网页的地址
 * 
 * @return 网页URL
 */
function GetCtrlBaseURL()
{
    return document.URL;
};

/**
 * 获取三维控件参数
 * 
 * @return 三维控件的参数
 */
function GetCtrlParam()
{
    if (HasTDECtrl())
    {
        var paramstr = "";
        var ctrl = GetTDECtrl();
        var params = ctrl.childNodes;
        for (var i = 0; i < params.length; ++i)
        {
            var param = params[i];
            if (param.tagName == "PARAM")
            {
                var name = param["name"];
                name = name.replace(/%/g, "%1");
                name = name.replace(/=/g, "%2");
                name = name.replace(/&/g, "%3");
                var value = param["value"];
                value = value.replace(/%/g, "%1");
                value = value.replace(/=/g, "%2");
                value = value.replace(/&/g, "%3");
                paramstr += name + "=" + value + "&";            
            }
            
        }
        paramstr = paramstr.substr(0, paramstr.length - 1);
        return paramstr;
    }
    
    return null;
};


/**
 * 获取三维控件基本信息
 * 
 * @return 三维控件基本信息，包括名称、版本号
 */
function GetCommInfo()
{
    if (HasTDECtrl())
    {
        return "Zondy 3D Control,Version 1.0.0";
    }
};

/**
 * 获取对象的绝对位置
 * 
 * @return var[2]
 */
function GetAbsolutePos(obj) 
{
    var ow = new Array(0, 0);
    var pw = obj;
    while (pw && pw.offsetParent) 
    {
        ow[0] += pw.offsetLeft;
        ow[1] += pw.offsetTop;
        pw = pw.offsetParent;
    }
    return ow;
}

/**
 * 函数：获取窗口大小
 * 
 * 该函数支持主流浏览器
 */
function findDimensions() 
{
    var winWidth = 0;
    var winHeight = 0;

     //获取窗口宽度
     if (window.innerWidth)
           winWidth = window.innerWidth;
     else if ((document.body) && (document.body.clientWidth))
           winWidth = document.body.clientWidth;
     //获取窗口高度
     if (window.innerHeight)
           winHeight = window.innerHeight;
     else if ((document.body) && (document.body.clientHeight))
           winHeight = document.body.clientHeight;
   
     //通过深入Document内部对body进行检测，获取窗口大小
     if (document.documentElement  
        && document.documentElement.clientHeight 
        && document.documentElement.clientWidth)
     {
         winHeight = document.documentElement.clientHeight;
         winWidth = document.documentElement.clientWidth;
     }
     
     //结果输出
     var size = new Array(winWidth, winHeight);
     return size;
}


/**
 * 通用操作接口
 */
function CommonOperAPI()
{
};


/**
 * 通用操作对象
 */
var CommonOpObj = new CommonOperAPI();


/*
 * 获取三维控件版本信息
 *
 */
CommonOperAPI.prototype.GetVersion = function () 
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetVersion", null);
    }
}

/*
 * 设置三维显示模式
 *
 * @param mode
 *      显示模式，可选值：Globe 或者 Flat
 * @param jingwei
 *      数据模式，true 表示经纬度数据， false 表示普通数据
 * @param radius
 *      球半径，默认值：6378137.0
 */
CommonOperAPI.prototype.SetVisibleMode = function(mode, jingwei, radius)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = mode;
        param[1] = jingwei;
        param[2] = radius;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetVisibleMode", param);
    }
}

/*
 * 获取三维显示模式
 *
 * @return 显示模式
 *      显示模式，可选值：Globe 或者 Flat
 */
CommonOperAPI.prototype.GetVisibleMode = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetVisibleMode", null);
    }
}

/*
 * 获取三维球半径
 *
 */
CommonOperAPI.prototype.GetPlanetRadius = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPlanetRadius", null);
    }
}

/*
 * 获取数据模式
 *
 */
CommonOperAPI.prototype.GetDataMode = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetDataMode", null);
    }
}

/*
 * 设置三维球光照效果
 *
 * @param enable
 *      true 开启光照效果，false 关闭
 */
CommonOperAPI.prototype.SetEnablePlanetLight = function(enable)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = enable;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetEnablePlanetLight", param);
    }
}

/*
 * 获取三维球光照效果设置
 *
 */
CommonOperAPI.prototype.GetEnablePlanetLight = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetEnablePlanetLight", null);
    }
}

/*
 * 设置三维地形高程缩放比
 *
 * @param scale
 *      三维地形的高程缩放比
 */
CommonOperAPI.prototype.SetTerrainScale = function(scale)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = scale;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetTerrainScale", param);
    }
}

/*
 * 获取三维地形的高程缩放比
 *
 */
CommonOperAPI.prototype.GetTerrainScale = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetTerrainScale", null);
    }
}

/*
 * 获取三维插件个数
 *
 */
CommonOperAPI.prototype.GetPluginNum = function () 
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginNum", null);
    }
}

/*
 * 获取三维插件名称
 *
 */
CommonOperAPI.prototype.GetPluginName = function (index) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = index;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginName", param);
    }
}

/*
 * 获取三维插件功能项个数
 *
 */
CommonOperAPI.prototype.GetPluginItemNum = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginItemNum", param);
    }
}

/*
 * 获取三维插件功能项名称
 *
 */
CommonOperAPI.prototype.GetPluginItemName = function (name, index) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = index;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginItemName", param);
    }
}

/*
 * 执行三维功能插件
 *
 * @param name 
 *      插件名称
 * @param item
 *      插件功能项
 * @param param1
 *      插件附加参数1，没有则传空字符窜 ""
 * @param param2
 *      插件附加参数2，没有则传空字符窜 ""
 */
CommonOperAPI.prototype.ExecutePlugin = function (name, item, param1, param2)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = item;
        param[2] = param1;
        param[3] = param2;
        return GetTDECtrl().InvokeCmd("CommonOper", "ExecutePlugin", param);
    }
}

/*
 * 注册事件
 *
 * @param name
 *      事件名称，包括<code>onkeydown, onkeyup, onmousedown, onmouseup, ondbclick, onmousemove</code>
 * @param callback
 *      事件响应函数 
 */
CommonOperAPI.prototype.RegisterEventHandle = function (name, callback)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = callback;
        return GetTDECtrl().InvokeCmd("CommonOper", "RegisterEventHandle", param);
    }
}

/*
 * 获取事件
 *
 * @param name
 *      事件名称 
 */
CommonOperAPI.prototype.GetEventHandle = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetEventHandle", param);
    }
}

/*
 * 移除事件
 *
 * @param name
 *      事件名称 
 */
CommonOperAPI.prototype.RemoveEventHandle = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CommonOper", "RemoveEventHandle", param);
    }
}

/*
 * 移除所有事件
 *
 * @param name
 *      事件名称 
 */
CommonOperAPI.prototype.RemoveAllEventHandle = function ()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "RemoveAllEventHandle", null);
    }
}

/*
 * 拾取三维点
 *
 * @param x,y
 *      鼠标位置的屏幕坐标点，起始坐标为三维窗口的左上角
 * @return 返回拾取到的三维点
 *      格式："x,y,z"
 *      如果返回值为空字符串，则没有拾取到三维坐标点
 */
CommonOperAPI.prototype.Pick3DPoint = function(x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        return GetTDECtrl().InvokeCmd("CommonOper", "Pick3DPoint", param);
    }
}

/*
 * 获取三维点对应的屏幕坐标
 *
 * @param x,y,z
 *      三维坐标点
 * @return 返回对应的屏幕坐标，起始坐标为三维窗口的左上角
 *      格式："x,y"
 */
CommonOperAPI.prototype.GetScreenPoint = function(x, y, z)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetScreenPoint", param);
    }
}

/*
 * 拾取三维模型
 *
 * @param x,y
 *      鼠标位置的屏幕坐标点，起始坐标为三维窗口的左上角
 * @return 返回拾取到的三维点坐标和模型的id
 *      格式："x,y,z|id"
 *      如果返回值为空字符串，则没有拾取到三维模型
 */
CommonOperAPI.prototype.PickModel = function(x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        return GetTDECtrl().InvokeCmd("CommonOper", "PickModel", param);
    }
}

/*
 * 清理模型拾取操作
 *
 * 该功能会还原模型拾取操作高亮设置的模型
 */
CommonOperAPI.prototype.ClearPick = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "ClearPick", null);
    }
}

/*
 * 获取网页文件
 *
 * @param url
 *      文件地址
 * @return 返回文件下载地址
 */
CommonOperAPI.prototype.GetUrlFile = function (url)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = url;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetUrlFile", param);
    }
}
 
/*
 * 获取网页图片
 *
 * @param url
 *      图片地址
 * @return 返回图片下载地址和图片格式
 */
CommonOperAPI.prototype.GetUrlImage = function (url)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = url;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetUrlImage", param);
    }
}

/*
 * 显示文件对话框，打开或者保存文件对话框
 *
 * @param openorsave
 *      true 为打开，false 为另存为
 * @param defExt
 *      默认的文件后缀名
 * @param defFileName
 *      默认文件名称
 * @param dwFlag
 *      标志位
 * @param filter
 *      文件过滤器
 * @return 
 *      返回文件路径
 * @remarks
 *      该函数所有的参数用法同window 文件对话框一样，用法请参照window文件对话框
 */
CommonOperAPI.prototype.ShowFileDialog = function (openorsave, defExt, defFileName, dwFlag, filter)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = openorsave;
        param[1] = defExt;
        param[2] = defFileName;
        param[3] = dwFlag;
        param[4] = filter;
        return GetTDECtrl().InvokeCmd("CommonOper", "ShowFileDialog", param);
    }
}

/*
 * 设置三维控件全屏显示
 *
 * @param full 
 *      取值 true 或者 false
 * 
 */
CommonOperAPI.prototype.SetFullScreen = function (full)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = full;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetFullScreen", param);
    }
}

/*
 * 显示3D小坐标轴
 *
 * @param isShow 
 *      取值 true 或者 false
 * 
 */
CommonOperAPI.prototype.Show3DAxis = function (isShow)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = isShow;
        return GetTDECtrl().InvokeCmd("CommonOper", "Show3DAxis", param);
    }
}