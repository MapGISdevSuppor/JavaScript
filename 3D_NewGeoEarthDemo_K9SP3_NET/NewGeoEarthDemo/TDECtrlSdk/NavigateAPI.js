/**   
 * @fileOverview 三维控件导航接口   
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * 导航接口
 */
function NavigateAPI()
{
};

/**
 * 导航操作对象
 */
var NaviOpObj = new NavigateAPI();

/**
 * 获取视口尺寸
 */

NavigateAPI.prototype.GetViewPortSize = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetViewPortSize", null);
    }
};

/**
 * 获取当前的视点信息，经度，纬度，高程，距离，方位角，高度角
 */
NavigateAPI.prototype.GetViewInfo = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetViewInfo", null);
    }
};

/**
 * 设置当前的视点信息，经度，纬度，高程，距离，方位角，高度角
 */
NavigateAPI.prototype.SetViewInfo = function(x, y, z, dist, heading, tilt, play)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = dist;
        param[4] = heading;
        param[5] = tilt;
        param[6] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetViewInfo", param);
    }
};

/**
 * 设置当前视口区域
 */
NavigateAPI.prototype.SetViewRect = function(minx, miny, maxx, maxy)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = minx;
        param[1] = miny;
        param[2] = maxx;
        param[3] = maxy;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetViewRect", param);
    }
}


/**
 * 设置当前的视点位置
 */
NavigateAPI.prototype.SetPosition = function(x, y, z, play)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetPosition", param);
    }
}

/**
 * 获取当前的视点位置
 */
NavigateAPI.prototype.GetPosition = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetPosition", null);
    }
}

/**
 * 设置当前的视点高度
 */
NavigateAPI.prototype.SetViewHeight = function(height, play)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = height;
        param[1] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetViewHeight", param);
    }
}

/**
 * 获取当前的视点位置
 */
NavigateAPI.prototype.GetViewHeight = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetViewHeight", null);
    }
}

/**
 * 设置当前的方位角
 */
NavigateAPI.prototype.SetHeading = function(heading, play)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = heading;
        param[1] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetHead", param);
    }
}

/**
 * 获取当前的方位角
 */
NavigateAPI.prototype.GetHeading = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetHead", null);
    }
}

/**
 * 设置当前的高度角
 */
NavigateAPI.prototype.SetTilt = function(tilt, play)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = tilt;
        param[1] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetTilt", param);
    }
}

/**
 * 获取当前的高度角
 */
NavigateAPI.prototype.GetTilt = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetTilt", null);
    }
}

/**
 * 设置进入全景视图
 */
NavigateAPI.prototype.SetFullView = function(x, y, z, dist, heading, tilt, minDist, maxDist, minTilt, maxTilt)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = dist;
        param[4] = heading;
        param[5] = tilt;
        param[6] = minDist;
        param[7] = maxDist;
        param[8] = minTilt;
        param[9] = maxTilt;
        return GetTDECtrl().InvokeCmd("NaviOper", "SetFullView", param);
    }
}

/**
 * 退出全景模式
 */
NavigateAPI.prototype.ExitFullView = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ExitFullView", null);
    }
}


/**
 * 自动旋转
 *
 * @param heading
 *      指定自动旋转的速度，单位：度/秒
 */
NavigateAPI.prototype.AutoHeading = function(heading)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = heading;
        return GetTDECtrl().InvokeCmd("NaviOper", "AutoHeading", param);
    }
}

/**
 * 自动移动
 *
 * @param x,y
 *      指定自动移动的速度，单位：度/秒
 */
NavigateAPI.prototype.AutoMoving = function(x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        return GetTDECtrl().InvokeCmd("NaviOper", "AutoMoving", param);
    }
}

/**
 * 复位
 */
NavigateAPI.prototype.Reset = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "Reset", null);
    }
};
 
/**
 * 复位方位角
 */
NavigateAPI.prototype.ResetHeading = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ResetHeading", null);
    }
};

/**
 * 复位高度角
 */ 
NavigateAPI.prototype.ResetTilt = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ResetTilt", null);
    }
};

/**
 * 复位视点位置
 */
NavigateAPI.prototype.ResetView = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ResetView", null);
    }
};

/*
 * 启动或这禁用导航
 * 
 */
NavigateAPI.prototype.EnableNavi = function(enable)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = enable;
        return GetTDECtrl().InvokeCmd("NaviOper", "EnableNavi", param);
    }
}

/**
 * 开始路径漫游
 * points 点，格式：x1,y1,z1|x2,y2,z2|...|xn,yn,zn
 * speed 漫游速度
 * height 导航高度，如果为0则以当前视点高度进行导航
 * first 是否第一人称视角，否则第三人称
 * showline 是否显示路径
 * showpoints 是否显示路径点
 * model 模型的名称
 */
NavigateAPI.prototype.StartPathFly = function(points, speed, first, showline, showpoints, model)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = points;
        param[1] = speed;
        param[2] = first;
        param[3] = showline;
        param[4] = showpoints;
        param[5] = model;
        return GetTDECtrl().InvokeCmd("NaviOper", "StartPathFly", param);
    }
};

/**
 * 停止漫游
 */
NavigateAPI.prototype.StopPathFly = function()
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = dist;
        param[4] = heading;
        param[5] = tilt;
        param[6] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "StopPathFly", param);
    }
};

/**
 * 清除路径漫游
 */
NavigateAPI.prototype.ClearPathFly = function()
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = dist;
        param[4] = heading;
        param[5] = tilt;
        param[6] = play;
        return GetTDECtrl().InvokeCmd("NaviOper", "ClearPathFly", param);
    }
};
