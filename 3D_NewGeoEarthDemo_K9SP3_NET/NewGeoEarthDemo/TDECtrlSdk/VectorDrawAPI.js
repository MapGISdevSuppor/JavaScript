/**   
 * @fileOverview 三维控件矢量绘图接口   
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * 三维矢量绘图操作接口
 */

function VectorDrawAPI()
{
};

/**
 *
 * 三维矢量绘图操作对象
 */
var VectorDrawOpObj = new VectorDrawAPI();

/**
  * 根据信息添加地表矢量图形
 * 
 * @param name
 *      矢量图形名
 * @param type
 *      矢量图形类型，包括：<code>lines, rectangle, ellipse, polygon, arrow, arrow2</code>
 * @param points
 *      图形信息<br>
 *      <li>线段信息格式：<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>矩形信息格式：<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>椭圆信息格式：<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>多边形信息格式：<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>箭头<br>
 *      <code>startx,starty,endx,endy,tailwidth,headwidth,type</code>
 *      <li>箭头2<br>
 *      <code>type|x1,y1|x2,y2|...|xn,yn</code>
 *          type：箭头的类型，包括<code>simple,straight,tailed,single</code>, 分别是 简单箭头，平直箭头，燕尾箭头，单线箭头
 *          x1,y1~xn,yn：箭头的中轴线
 * @param bdColor 
 *      图形边界颜色
 * @param fillColor 
 *      图形填充颜色(线类型无效)
 * @param opacity
 *      透明度
 * @param lineWidth 
 *      线宽
 * @param lineStyle 
 *      线形，包括：<code>solid, dash, dot, dashdot，dashdotdot</code>
 * @param isTemp
 *      是否为临时图形(RemoveTemp()函数是否对其有影响)
 * 
 * @return 所添加图形的名称
 */
VectorDrawAPI.prototype.Add = function(name, type, points, bdColor, fillColor, opacity, lineWidth, lineStyle, isTemp)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = type;
        param[2] = points;
        param[3] = bdColor;
        param[4] = fillColor;
        param[5] = opacity;
        param[6] = lineWidth;
        param[7] = lineStyle;
        param[8] = isTemp;
        return GetTDECtrl().InvokeCmd("VectorOper", "Add", param);
    }
};

/**
 * 删除指定名称的图形
 */
VectorDrawAPI.prototype.Remove = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("VectorOper", "Remove", param);
    }
};

/**
 * 删除临时图形
 */
VectorDrawAPI.prototype.RemoveTemp = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "RemoveTemp", null);
    }
};

/**
 * 删除所有图形
 */
VectorDrawAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "RemoveAll", null);
    }
};

/**
 * 删除指定类型图形
 */
VectorDrawAPI.prototype.RemoveType = function(type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = type;
        return GetTDECtrl().InvokeCmd("VectorOper", "RemoveType", param);
    }
};


/**
 * 开始绘制图形
 *
 * @param name
 *      矢量图形名
 * @param type
 *      矢量图形类型，包括：<code>lines, rectangle, ellipse, polygon, circle, point</code>
 * @param bdColor 
 *      图形边界颜色
 * @param fillColor 
 *      图形填充颜色(线类型无效)
 * @param opacity
 *      透明度
 * @param lineWidth 
 *      线宽
 * @param lineStyle 
 *      线形，包括：<code>solid, dash, dot, dashdot，dashdotdot</code>
 * @param isTemp
 *      是否为临时图形(RemoveTemp()函数是否对其有影响)
 * @param isContinue
 *      是否为连续操作
 * @param callback
 *      回调函数，绘制完成后被调用
 *      该函数将接收三个参数：
 *      第一个参数返回所绘制图形的名称
 *      第二个参数返回所绘制图形的类型
 *      第三个参数返回所绘制图形的几何信息
 *      几何信息<br>
 *      <li>线段信息格式：<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>矩形信息格式：<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>椭圆信息格式：<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>多边形信息格式：<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>圆型信息格式：<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>点信息格式<br>
 *      <code>x,y</code>
 */
VectorDrawAPI.prototype.StartDraw = function(name, type, bdColor, fillColor, opacity, lineWidth, lineStyle, isContinue, isTemp, callback)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = type;
        param[2] = bdColor;
        param[3] = fillColor;
        param[4] = opacity;
        param[5] = lineWidth;
        param[6] = lineStyle;
        param[7] = isTemp;
        param[8] = isContinue;
        param[9] = callback;
        return GetTDECtrl().InvokeCmd("VectorOper", "StartDraw", param);
    }
};

/**
 * 结束绘制
 *
 * 该函数将终止正在进行的绘制操作
 */
VectorDrawAPI.prototype.EndDraw = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "EndDraw", null);
    }
};

/**
 * 清除绘制
 *
 * 该函数将清除所有绘制的对象
 */
VectorDrawAPI.prototype.ClearDraw = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "ClearDraw", null);
    }
};