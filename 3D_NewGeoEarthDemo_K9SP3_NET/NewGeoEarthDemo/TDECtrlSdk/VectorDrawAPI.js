/**   
 * @fileOverview ��ά�ؼ�ʸ����ͼ�ӿ�   
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * ��άʸ����ͼ�����ӿ�
 */

function VectorDrawAPI()
{
};

/**
 *
 * ��άʸ����ͼ��������
 */
var VectorDrawOpObj = new VectorDrawAPI();

/**
  * ������Ϣ��ӵر�ʸ��ͼ��
 * 
 * @param name
 *      ʸ��ͼ����
 * @param type
 *      ʸ��ͼ�����ͣ�������<code>lines, rectangle, ellipse, polygon, arrow, arrow2</code>
 * @param points
 *      ͼ����Ϣ<br>
 *      <li>�߶���Ϣ��ʽ��<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>������Ϣ��ʽ��<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>��Բ��Ϣ��ʽ��<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>�������Ϣ��ʽ��<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>��ͷ<br>
 *      <code>startx,starty,endx,endy,tailwidth,headwidth,type</code>
 *      <li>��ͷ2<br>
 *      <code>type|x1,y1|x2,y2|...|xn,yn</code>
 *          type����ͷ�����ͣ�����<code>simple,straight,tailed,single</code>, �ֱ��� �򵥼�ͷ��ƽֱ��ͷ����β��ͷ�����߼�ͷ
 *          x1,y1~xn,yn����ͷ��������
 * @param bdColor 
 *      ͼ�α߽���ɫ
 * @param fillColor 
 *      ͼ�������ɫ(��������Ч)
 * @param opacity
 *      ͸����
 * @param lineWidth 
 *      �߿�
 * @param lineStyle 
 *      ���Σ�������<code>solid, dash, dot, dashdot��dashdotdot</code>
 * @param isTemp
 *      �Ƿ�Ϊ��ʱͼ��(RemoveTemp()�����Ƿ������Ӱ��)
 * 
 * @return �����ͼ�ε�����
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
 * ɾ��ָ�����Ƶ�ͼ��
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
 * ɾ����ʱͼ��
 */
VectorDrawAPI.prototype.RemoveTemp = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "RemoveTemp", null);
    }
};

/**
 * ɾ������ͼ��
 */
VectorDrawAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "RemoveAll", null);
    }
};

/**
 * ɾ��ָ������ͼ��
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
 * ��ʼ����ͼ��
 *
 * @param name
 *      ʸ��ͼ����
 * @param type
 *      ʸ��ͼ�����ͣ�������<code>lines, rectangle, ellipse, polygon, circle, point</code>
 * @param bdColor 
 *      ͼ�α߽���ɫ
 * @param fillColor 
 *      ͼ�������ɫ(��������Ч)
 * @param opacity
 *      ͸����
 * @param lineWidth 
 *      �߿�
 * @param lineStyle 
 *      ���Σ�������<code>solid, dash, dot, dashdot��dashdotdot</code>
 * @param isTemp
 *      �Ƿ�Ϊ��ʱͼ��(RemoveTemp()�����Ƿ������Ӱ��)
 * @param isContinue
 *      �Ƿ�Ϊ��������
 * @param callback
 *      �ص�������������ɺ󱻵���
 *      �ú�������������������
 *      ��һ����������������ͼ�ε�����
 *      �ڶ�����������������ͼ�ε�����
 *      ��������������������ͼ�εļ�����Ϣ
 *      ������Ϣ<br>
 *      <li>�߶���Ϣ��ʽ��<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>������Ϣ��ʽ��<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>��Բ��Ϣ��ʽ��<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>�������Ϣ��ʽ��<br>
 *      <code>x1,y1|x2,y2|...</code>
 *      <li>Բ����Ϣ��ʽ��<br>
 *      <code>minx,miny,maxx,maxy</code>
 *      <li>����Ϣ��ʽ<br>
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
 * ��������
 *
 * �ú�������ֹ���ڽ��еĻ��Ʋ���
 */
VectorDrawAPI.prototype.EndDraw = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "EndDraw", null);
    }
};

/**
 * �������
 *
 * �ú�����������л��ƵĶ���
 */
VectorDrawAPI.prototype.ClearDraw = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("VectorOper", "ClearDraw", null);
    }
};