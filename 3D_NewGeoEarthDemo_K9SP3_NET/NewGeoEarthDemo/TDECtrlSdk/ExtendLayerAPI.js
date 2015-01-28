/**   
 * @fileOverview 三维扩展图层接口
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * 图层操作接口
 */
function ExtendLayerAPI()
{
};

/**
 * 图层操作对象
 */
var ExtendLayerOpObj = new ExtendLayerAPI();

/**
 * 创建三维全景图层
 *
 * @return 根图层的名称
 */
ExtendLayerAPI.prototype.CreateFullViewLayer = function (name, parent, url, x, y, z) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = parent;
        param[2] = url;
        param[3] = x;
        param[4] = y;
        param[5] = z;
        return GetTDECtrl().InvokeCmd("ExtendLayerOper", "CreateFullViewLayer", param);
    }
};

/**
 * 创建三维要素图层
 *
 * @param name
 *      图层名称
 * @param parent
 *      父图层名称
 * @param url
 *      三维要素的URL
 *
 * @return 图层的名称
 */
ExtendLayerAPI.prototype.Create3DFeatureLayer = function (name, parent, url) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = parent;
        param[2] = url;
        return GetTDECtrl().InvokeCmd("ExtendLayerOper", "Create3DFeatureLayer", param);
    }
};

