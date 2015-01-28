/**   
 * @fileOverview 三维控件三维标注操作接口   
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * 三维标注操作接口
 */
function LabelAPI()
{
};

/**
 * 三维标注操作对象
 */
var LabelOpObj = new LabelAPI();

/**
 * 添加 标注
 *
 * @param name
 *      标注的名称，如果传入空字符串则自动生成名称
 * @return 
 *      返回创建标注的名称
 */
LabelAPI.prototype.AddLabel = function(name, layerName, text, fontName, fontSize, fontColor, x, y, z)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = text;
        param[3] = fontName;
        param[4] = fontSize;
        param[5] = fontColor;
        param[6] = x;
        param[7] = y;
        param[8] = z;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddLabelEx", param);
    }
};

/**
 * 添加 地标
 *
 * @param name
 *      标注的名称，如果传入空字符串则自动生成名称
 *
 * @param iconUrl
 *      指定图标的url，如果包含多个图片，使用分号分隔
 *      如果要指定动画频率，请使用AddLabel() 和 SetIcon()接口组合使用
 *
 * @prarm scale
 *      指定图标的缩放比
 * @return 
 *      返回创建标注的名称
 */
LabelAPI.prototype.AddLabelAndIcon = function(name, layerName, text, fontName, fontSize, fontColor, iconUrl, iconScale, desc, x, y, z, farDist, nearDist)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = text;
        param[3] = fontName;
        param[4] = fontSize;
        param[5] = fontColor;
        param[6] = iconUrl;
        param[7] = iconScale;
        param[8] = desc;
        param[9] = x;
        param[10] = y;
        param[11] = z;
        param[12] = farDist;
        param[13] = nearDist;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddLabelAndIcon", param);
    }
};

/**
 * 添加
 *
 * @param name
 *      标注的名称，如果传入空字符串则自动生成名称
 * @return 
 *      返回创建标注的名称
 */
LabelAPI.prototype.Add = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddLabel", param);
    }
};

/**
 * 移除
 */
LabelAPI.prototype.Remove = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveLabel", param);
    }
};

/**
 * 移除指定图层所有标注
 */
LabelAPI.prototype.RemoveLayer = function(layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveLabelLayer", param);
    }
};

/**
 * 移除所有标注
 */
LabelAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveLabelAll", null);
    }
};

/**
 * 设置位置
 * 
 * 
 */
LabelAPI.prototype.SetPosition = function(name, layerName, x, y, z)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = x;
        param[3] = y;
        param[4] = z;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetPosition", param);
    }
};

/**
 * 获取位置
 *
 * @return 返回三维标注的三维位置
 *      格式："x,y,z"
 */
LabelAPI.prototype.GetPosition = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetPosition", param);
    }
};

/**
 * 设置标注文字
 */
LabelAPI.prototype.SetText = function(name, layerName, text)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = text;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetText", param);
    }
};

/**
 * 获取标注的文字
 */
LabelAPI.prototype.GetText = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetText", param);
    }
};

/**
 * 设置字体，颜色，字号
 */
LabelAPI.prototype.SetFont = function(name, layerName, fontName, color, size)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = fontName;
        param[3] = color;
        param[4] = size;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetFont", param);
    }
};

/**
 * 获取字体，颜色，字号
 *
 * @return 范围字体颜色字号
 *      格式 "fintName,fontColor,fontSize"
 */
LabelAPI.prototype.GetFont = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetFont", param);
    }
};

/**
 * 设置图标
 *
 * @param name
 * @param layerName
 * @param iconUrl
 *      指定图标的url，如果包含多个图片，使用分号(;)分隔
 * @prarm scale
 *      指定图标的缩放比
 * @prarm duration
 *      指定纹理动画频率，当指定多个图标时有效
 */
LabelAPI.prototype.SetIcon = function(name, layerName, iconUrl, scale, duration)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = iconUrl;
        param[3] = scale;
        param[4] = duration;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetIcon", param);
    }
};

/**
 * 获取图标
 */
LabelAPI.prototype.GetIcon = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetIcon", param);
    }
};

/**
 * 设置图标平移动画
 */
LabelAPI.prototype.SetScrollAnimation = function(name, layerName, x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = x;
        param[3] = y;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetScrollAnimation", param);
    }
};

/**
 * 获取图标平移动画
 *
 * @return 平移动画
 *      格式 "x,y"
 */
LabelAPI.prototype.GetScrollAnimation = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetScrollAnimation", param);
    }
};

/**
 * 设置图标旋转动画
 */
LabelAPI.prototype.SetRotateAnimation = function(name, layerName, a)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = a;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetRotateAnimation", param);
    }
};

/**
 * 获取图标旋转动画
 */
LabelAPI.prototype.GetRotateAnimation = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetRotateAnimation", param);
    }
};

/**
 * 设置可见距离
 */
LabelAPI.prototype.SetShowDist = function(name, layerName, farDist, nearDist)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = farDist;
        param[3] = nearDist;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetShowDist", param);
    }
};

/**
 * 获取可见距离
 *
 * @return 可见距离
 *      格式 "farDist,nearDist"
 */
LabelAPI.prototype.GetShowDist = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetShowDist", param);
    }
};

/**
 * 设置深度检测
 *
 * @param type
 *      类型：取值 text 或者 icon
 * @param enable
 *      是否进行深度检测
 */
LabelAPI.prototype.SetDepthCheck = function(name, layerName, type, enable)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = type;
        param[3] = enable;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetDepthCheck", param);
    }
};

/**
 * 获取深度检测
 *
 * @param type
 *      类型：取值 text 或者 icon  
 */
LabelAPI.prototype.GetDepthCheck = function(name, layerName, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = type;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetDepthCheck", param);
    }
};

/**
 * 设置描述信息
 */
LabelAPI.prototype.SetDesc = function(name, layerName, desc)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = desc;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetDesc", param);
    }
};

/**
 * 获取描述信息
 */
LabelAPI.prototype.GetDesc = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetDesc", param);
    }
};

/**
 * 设置标注的扩展属性
 */
LabelAPI.prototype.SetAttitude = function(name, layerName, key, value)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = key;
        param[3] = value;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetAttitude", param);
    }
};

/**
 * 获取标注的扩展属性
 */
LabelAPI.prototype.GetAttitude = function(name, layerName, key)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = key;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetAttitude", param);
    }
};

/**
 * 设置鼠标点击事件
 * 
 * 当鼠标点击时，触发该事件
 *
 * 事件响应函数有两个参数
 *     第一个参数为标注名称
 *     第二个参数为标注图层名称
 */
LabelAPI.prototype.SetOnClickHandle = function(name, layerName, callback)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = callback;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetOnClickHandle", param);
    }
};

/**
 * 获取鼠标点击事件
 *
 * @return 事件响应函数名
 */
LabelAPI.prototype.GetOnClickHandle = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetOnClickHandle", param);
    }
};

/**
 * 获取标注的屏幕坐标
 *
 * @return 返回标注的屏幕坐标，左上角点坐标，右下角点坐标
 *      
 * 返回值格式："posx,posy,topleftx,toplefty,bottomrightx,bottomrighty";
 */
LabelAPI.prototype.GetSrceenPos = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetSrceenPos", param);
    }
};


/**
 * 添加 气泡提示
 */
LabelAPI.prototype.AddBubble = function(name, desc, x, y, z, opacity, bgColor, bdColor, width, height, scale)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = desc;
        param[2] = x;
        param[3] = y;
        param[4] = z;
        param[5] = opacity;
        param[6] = bgColor;
        param[7] = bdColor;
        param[8] = width;
        param[9] = height;
        param[10] = scale;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddBubble", param);
    }
};

/**
 * 移除 气泡提示
 */
LabelAPI.prototype.RemoveBubble = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveBubble", param);
    }
};

/**
 * 移除 气泡提示
 */
LabelAPI.prototype.RemoveBubbleAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveBubbleAll", null);
    }
};

/**
 * 移除 共享气泡
 */
LabelAPI.prototype.RemoveSharedBubble = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveSharedBubble", null);
    }
};


// ToolTip
/**
 * 添加Tooltip
 * 该函数会自动调整ToolTip的位置
 * 如果需要手动控制，请使用 SetToolTipPos方法
 *
 * @param x,y,z
 *      ToolTip指向的三维点
 * @bdColor
 *      边框颜色
 * @param width,height
 *      ToolTip的高宽
 * @return 
 *      创建ToolTip的名称
 */
LabelAPI.prototype.AddToolTip = function(x, y, z, bdColor, width, height)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = bdColor;
        param[4] = width;
        param[5] = height;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddToolTip", param);
    }
}

/**
 * 设置ToolTip的内容
 *
 * @param info
 *      填充ToolTip的内容
 *
 * @param type
 *      ToolTip 内容的类型，可选类型：html；text；url
 *      html 类型：info将包含html标记
 *      text 类型：info为纯文本，不包含任务html标记
 *      url 类型：info为一个url，指向其他网页
 */
LabelAPI.prototype.SetToolTipInfo = function(info, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = info;
        param[1] = type;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipInfo", param);
    }
}

/**
 * 设置ToolTip的屏幕位置
 * 该坐标起始点为三维窗口左上角
 *
 * @param name
 *      ToolTip的名称
 * @param x,y
 *      ToolTip的坐标
 */
LabelAPI.prototype.SetToolTipPos = function(name, left, top)
{
    if (HasTDECtrl())
    {
        var param = new Array()
        param[0] = name;
        param[1] = left;
        param[2] = top;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipPos", param);
    }
}

/**
 * 自定义tooltip边框和背景图像说明
 *
 * tooltip使用类似一个3x3的表格，将真个tooltip分割成如下9个区域
 * 其中 区域center用来显示填充内容，
 * 区域 1 - 8 是tooltip的边框
 *

	    left               right 
		+--+---------------+--+ 
		|0 |       1       |2 | top
		+--+---------------+--+ 
		|  |               |  |
		|  |               |  |
		|3 |    center     |4 |
		|  |               |  |
		+--+---------------+--+ 
		|5 |       6       |7 | bottom
		+--+---------------+--+ 
 *
 */

/**
 * 设置Tooltip边框的宽度
 *
 * @left
 *      左边框的宽度
 * @right
 *      右边框的宽度
 * @top
 *      上边框的宽度
 * @right
 *      下边框的宽度
 */
LabelAPI.prototype.SetToolTipBorder = function(name, left, right, top, bottom)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = left;
        param[2] = right;
        param[3] = top;
        param[4] = bottom;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipBorder", param);
    }
}

/**
 * 自定义Tooltip背景图像
 * 背景图像的设置同边框
 */
LabelAPI.prototype.SetToolTipImage = function(name, imgUrl, left, right, top, bottom)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = imgUrl;
        param[2] = left;
        param[3] = right;
        param[4] = top;
        param[5] = bottom;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipImage", param);
    }
}

/**
 * 添加Tooltip事件
 */
LabelAPI.prototype.AddToolTipEventHandle = function(name, callback, left, right, top, bottom)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = callback;
        param[1] = left;
        param[2] = right;
        param[3] = top;
        param[4] = bottom;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddToolTipEventHandle", param);
    }
}

/**
 * 删除所有Tooltip事件
 */
LabelAPI.prototype.ClearToolTipEventHandle = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("LabelOper", "ClearToolTipEventHandle", param);
    }
}

/**
 * 移除Tooltip
 */
LabelAPI.prototype.RemoveToolTip = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveToolTip", null);
    }
}		


/**
 * 显示ToolTip
 * 回调函数。不要调用这个函数
 *
 */
function LabelCallBack_SetToolTipFrame(left, top, width, height, info, type) 
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    var tooltipFrameForURLEle = document.getElementById("ToolTipFrameForURL");
    if (tooltipFrameForURLEle == undefined) return;
    
    var tooltipFrameForHTMLEle = document.getElementById("ToolTipFrameForHTML");
    if (tooltipFrameForHTMLEle == undefined) return;
    
    var pos = GetAbsolutePos(GetTDECtrl());
    //pos[0] = 0;
    //pos[1] = 0;
    
    tooltipDivEle.style.left = (parseFloat(left) + pos[0]) + "px";
    tooltipDivEle.style.top = (parseFloat(top) + pos[1]) + "px";
    tooltipDivEle.style.width = width + "px";
    tooltipDivEle.style.height = height + "px";
    
    if (type == "url")
    {
        tooltipFrameForURLEle.style.display = "";
        tooltipFrameForHTMLEle.style.display = "none";
        
        tooltipFrameForURLEle.src = info;
    }
    else
    {
        tooltipFrameForURLEle.style.display = "none";
        tooltipFrameForHTMLEle.style.display = "";
        
        var tooltipFrame = window.frames["ToolTipFrameForHTML"];
        if (tooltipFrame == undefined) return;
        
        var infoCon = tooltipFrame.document.getElementById("InfoContainer");
        if (infoCon == undefined) return;   
        
        if (type == "html")
        {
            infoCon.innerHTML = info;
        }
        else if (type == "text")
        {
            infoCon.innerText = info;
        }
        else
        {
            infoCon.innerText = info;
        }
    }
    
    //显示
    tooltipDivEle.style.display = "";
}

/**
 * 设置ToolTip的位置
 * 回掉函数，不要调用这个函数
 */
function LabelCallBack_SetToolTipPos(left, top)
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    var pos = GetAbsolutePos(GetTDECtrl());
    
    tooltipDivEle.style.left = (parseFloat(left) + pos[0]) + "px";
    tooltipDivEle.style.top = (parseFloat(top) + pos[1]) + "px";
}

/**
 * 显示ToolTip
 * 回调函数。不要调用这个函数
 *
 */
function LabelCallBack_ShowToolTipFrame()
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    tooltipDivEle.style.display = "";
}


/**
 * 隐藏ToolTip
 * 回调函数。不要调用这个函数
 *
 */
function LabelCallBack_HideToolTipFrame()
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    tooltipDivEle.style.display = "none";
}