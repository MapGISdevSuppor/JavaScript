/**   
 * @fileOverview 三维插件工具接口
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */

/**
 * 插件操作接口
 */
function PluginToolAPI()
{
};

/**
 * 插件操作对象
 */
var PluginToolOpObj = new PluginToolAPI;

/**
 * 添加表层图片显示
 *
 * @param url
 *      图片url
 * @param left
 *      图片左上角x坐标
 * @param top
 *      图片左上角y坐标
 * @param hScale
 *      图片横向比例
 * @param vScale
 *      图片纵向比例
 */
PluginToolAPI.prototype.AddOverlayImage = function (url, left, top, hScale, vScale)
{
    if (HasTDECtrl())
    {
        var imageUrl = CommonOpObj.GetUrlImage(url);
        CommonOpObj.ExecutePlugin("交互导航器", "图片显示", imageUrl, left + "|" + top + "|" + hScale + "|" + vScale);
    }
}

/**
 * 移除表层图片显示
 *
 * @param url
 *      图片url
 */
PluginToolAPI.prototype.RemoveOverlayImage = function (url)
{
    if (HasTDECtrl())
    {
        var imageUrl = CommonOpObj.GetUrlImage(url);
        CommonOpObj.ExecutePlugin("交互导航器", "删除图片", imageUrl, "");
    }
}

/**
 * 移除所有表层图片显示
 *
 * @param url
 *      图片url
 */
PluginToolAPI.prototype.RemoveAllOverlayImage = function ()
{
    if (HasTDECtrl())
    {
        CommonOpObj.ExecutePlugin("交互导航器", "删除所有图片", "", "");
    }
}