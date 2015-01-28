/**   
 * @fileOverview 三维图层接口
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * 图层操作接口
 */
function BaseLayerAPI()
{
};

/**
 * 图层操作对象
 */
var BaseLayerOpObj = new BaseLayerAPI();

/**
 * 获取根图层
 *
 * @return 根图层的名称
 */
BaseLayerAPI.prototype.GetRoot = function () 
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetRoot", null);
    }
};

/**
 * 获取子图层数
 *
 * @return 返回子图层个数，字符串类型
 */
BaseLayerAPI.prototype.GetChildNum = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetChildNum", param);
    }
};

/**
 * 获取子图层的名称
 *
 * @returne 子图层名称
 */
BaseLayerAPI.prototype.GetChildName = function (name, index) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = index;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetChildName", param);
    }
};

/**
 * 获取父图层的名称
 *
 * @returne 父图层名称
 */
BaseLayerAPI.prototype.GetParentName = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetParentName", param);
    }
};

/**
 * 判断图层是否存在
 *
 * @returne "true" or "false"
 */
BaseLayerAPI.prototype.IsExist = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "IsExist", param);
    }
};

/**
 * 获取图层的序号
 *
 * @returne 图层序号，返回值为字符串
 */
BaseLayerAPI.prototype.GetIndex = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetIndex", param);
    }
};

/**
 * 获取图层显示名称
 *
 * @return 图层显示名称
 */
BaseLayerAPI.prototype.GetDisplayName = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetDisplayName", param);
    }
};

/**
 * 设置图层显示名称
 *
 * @return 无
 */
BaseLayerAPI.prototype.SetDisplayName = function (name, displayName) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = displayName;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "SetDisplayName", param);
    }
};

/**
 * 获取图层是否可见
 *
 * @return "true" 或者 "false"，字符串类型
 */
BaseLayerAPI.prototype.GetVisible = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetVisible", param);
    }
};

/**
 * 设置图层是否可见
 *
 * @return 无
 */
BaseLayerAPI.prototype.SetVisible = function (name, visible, cascade)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = visible;
        param[2] = cascade;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "SetVisible", param);
    }
};

/**
 * 获取图层缩放比
 *
 * @returne 返回图层缩放比 "xScale,yScale,zScale"
 */
BaseLayerAPI.prototype.GetScale = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetScale", param);
    }
};

/**
 * 设置图层缩放比
 *
 * @returne 无
 */
BaseLayerAPI.prototype.SetScale = function (name, x, y, z) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = x;
        param[2] = y;
        param[3] = z;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "SetScale", param);
    }
};

/**
 * 使用图层对话框设置图层缩放比
 *
 * @returne 无
 */
BaseLayerAPI.prototype.SetDispScale = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "SetDispScale", param);
    }
};

/**
 * 移动图层
 *
 * @param name
 *      图层的名称
 * @param index
 *      移动的目标位置
 *
 * @returne 无
 */
BaseLayerAPI.prototype.Move = function (name, index) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = index;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "Move", param);
    }
};

/**
 * 双击图层
 *
 * @returne 无
 */
BaseLayerAPI.prototype.DbClick = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "DbClick", param);
    }
};

/**
 * 获取活动图层
 *
 * @return 返回活动图层的名称
 */
BaseLayerAPI.prototype.GetActive = function ()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetActive", null);
    }
};

/**
 * 设置活动图层
 *
 * @return 无
 */
BaseLayerAPI.prototype.SetActive = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "SetActive", param);
    }
};

/**
 * 获取图层类型
 *
 * @return 返回图层的类型
 */
BaseLayerAPI.prototype.GetType = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "GetType", param);
    }
};

/**
 * 判断图层是否属于该类型
 *
 * @return "true" 或者 "false"，字符串类型
 */
BaseLayerAPI.prototype.IsKindOf = function (name, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = type;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "IsKindOf", param);
    }
};

/**
 * 判断图层是否是该类型
 *
 * @return "true" 或者 "false"，字符串类型
 */
BaseLayerAPI.prototype.IsA = function (name, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = type;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "IsA", param);
    }
};

/**
 * 创建
 *
 * @param name
 *      创建图层的名称，如果为空则自动生成名称
 * @param displayeName
 *      图层的显示名称
 * @param parentName
 *      父图层的名称，必须为有效图层的名称
 * @param type
 *      图层的类型
 *
 * @return 返回创建图层的名称
 */
BaseLayerAPI.prototype.Create = function(name, displayName, parentName, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = displayName;
        param[2] = parentName;
        param[3] = type;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "Create", param);
    }
};

/**
 * 移除图层
 *
 * @return 无
 */
BaseLayerAPI.prototype.Remove = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "Remove", param);
    }
};

/**
 * 移除子图层
 *
 * @return 无
 */
BaseLayerAPI.prototype.RemoveChild = function (name, index)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = index;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "RemoveChild", param);
    }
};

/**
 * 移除所有子图层
 *
 * @return 无
 */
BaseLayerAPI.prototype.RemoveAllChild = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("BaseLayerOper", "RemoveAllChild", param);
    }
};