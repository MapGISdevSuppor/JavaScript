/**   
 * @fileOverview 三维控件地形图层接口
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */

/**
 * 图层操作接口
 */
function TerrainLayerAPI()
{
};

/**
 * 图层操作对象
 */
var TerrainLayerOpObj = new TerrainLayerAPI();

/**
 * 创建地形图层
 */
TerrainLayerAPI.prototype.CreateTerrain = function(name, displayName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = displayName;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "CreateTerrain", param);
    }
};

/**
 * 获取默认地形图层
 */
TerrainLayerAPI.prototype.GetTerrain = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetTerrain", null);
    }
};

/**
 * 关联数据
 */
TerrainLayerAPI.prototype.OpenData = function(name, type, opstr)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = type;
        param[2] = opstr;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "OpenData", param);
    }
};

/**
 * 获取关联数源类型
 */
TerrainLayerAPI.prototype.GetType = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetType", param);
    }
};

/**
 * 获取关联数据源字符串标识
 */
TerrainLayerAPI.prototype.GetOpenString = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetOpenString", param);
    }
};

/**
 * 设置地形分块行列数
 */
TerrainLayerAPI.prototype.SetRowColNum = function(name, row, col)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = row;
        param[2] = col;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "SetRowColNum", param);
    }
};

/**
 * 获取地形分块行列数
 * 
 * @return 地形分块行数和列数
 *      格式：rowNum,colNum
 */
TerrainLayerAPI.prototype.GetRowColNum = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetRowColNum", param);
    }
};

/**
 * 设置地形LOD最大显示等级
 */
TerrainLayerAPI.prototype.SetLodLevel = function(name, lodlevel)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = lodlevel;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "SetLodLevel", param);
    }
};

/**
 * 获取地形LOD最大显示等级
 */
TerrainLayerAPI.prototype.GetLodLevel = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetLodLevel", param);
    }
};

/**
 * 设置地形瓦块网格数目
 */
TerrainLayerAPI.prototype.SetTileGridNum = function(name, gridnum)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = gridnum;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "SetTileGridNum", param);
    }
};

/**
 * 获取地形瓦块网格数目
 */
TerrainLayerAPI.prototype.GetTileGridNum = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetTileGridNum", param);
    }
};

/**
 * 设置地形范围
 */
TerrainLayerAPI.prototype.SetTerrainRange = function(name, minx, miny, maxx, maxy)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = minx;
        param[2] = miny;
        param[3] = maxx;
        param[4] = maxy;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "SetTerrainRange", param);
    }
};

/**
 * 获取地形范围
 * 
 * @return 地形范围
 *      格式：minx,miny,maxx,maxy
 */
TerrainLayerAPI.prototype.GetTerrainRange = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetTerrainRange", param);
    }
};

/**
 * 设置地形的基础高度
 */
TerrainLayerAPI.prototype.SetTerrainHeight = function(name, height)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = height;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "SetTerrainHeight", param);
    }
};

/**
 * 获取地形的基础高度
 */
TerrainLayerAPI.prototype.GetTerrainHeight = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetTerrainHeight", param);
    }
};

/**
 * 获取地形指定点的当前显示海拔值
 */
TerrainLayerAPI.prototype.GetDisplayElevation = function(name, x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = x;
        param[2] = y;
        return GetTDECtrl().InvokeCmd("TerrainLayerOper", "GetDisplayElevation", param);
    }
}