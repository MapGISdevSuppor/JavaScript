/**   
 * @fileOverview ��ά����ͼ�����ر���ͼ�ӿ�
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */

/**
 * ��ͼ�����ӿ�
 */
function CloudyLayerAPI()
{
};

/**
 * ��ͼ��������
 */
var CloudyOpObj = new CloudyLayerAPI();

/**
 * ����
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
 * ����
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
 * �Ƴ�
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
 * �Ƴ�
 */
CloudyLayerAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CloudyLayerOper", "RemoveAll", null);
    }
};

/**
 * ���ò�������Χ
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
 * ��ȡ��������Χ
 *
 * @return ��Χ��Ϣ
 *      ��ʽ "minx,miny,maxx,maxy"
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
 * ����ͼ��߶�
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
 * ��ȡͼ��߶�
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
 * ������ɫ
 *
 * �����Խ���û�����ò��ʻ��������ʱ����Ч
 * ��������˲��ʻ������������Ը�����
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
 * ��ȡ��ɫ
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
 * ����ͼƬ·������url
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
 * ��ȡͼƬ·������url
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
 * ���ò�������
 *
 * ˵�����ýӿ���һ�ָ߼��÷���ָ��һ��Ԥ����õ���ȾЧ��
 * ���ʣ��Ƕ��������Ч��������
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
 * ��ȡ��������
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
 * ����͸����
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
 * ��ȡ͸����
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
 * ����͸��ɫ
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
 * ��ȡ͸��ɫ
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
 * ���ÿն�
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
 * ��ȡ�ն���Χ
 *
 * @return ��Χ��Ϣ
 *      ��ʽ "minx,miny,maxx,maxy" 
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
 * ���ö����
 *
 * @pts ����εĵ�
 *      ��ʽ "x1,y1|x2,y2|...|xn,yn" 
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
 * �ر���ͼ�����ӿ�
 */

function OnTerrainLayerAPI()
{
};

/**
 * �ر���ͼ��������
 */
var OnTerrainOpObj = new OnTerrainLayerAPI();


/**
 * ����
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
 * ����
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
 * �Ƴ�
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
 * �Ƴ�
 */
OnTerrainLayerAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("OnTerrainLayerOper", "RemoveAll", null);
    }
};

/**
 * ���ò�������Χ
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
 * ��ȡ��������Χ
 *
 * @return ��Χ��Ϣ
 *      ��ʽ "minx,miny,maxx,maxy" 
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
 * ������ɫ
 *
 * �����Խ���û�����ò��ʻ��������ʱ����Ч
 * ��������˲��ʻ������������Ը�����
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
 * ��ȡ��ɫ
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
 * ����ͼƬ·������url
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
 * ��ȡͼƬ·������url
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
 * ���ò�������
 *
 * ˵�����ýӿ���һ�ָ߼��÷���ָ��һ��Ԥ����õ���ȾЧ��
 * ���ʣ��Ƕ��������Ч��������
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
 * ��ȡ��������
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
 * ����͸����
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
 * ��ȡ͸����
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
 * ����͸��ɫ
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
 * ��ȡ͸��ɫ
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
 * ���ÿն�
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
 * ��ȡ�ն���Χ
 *
 * @return ��Χ��Ϣ
 *      ��ʽ "minx,miny,maxx,maxy" 
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
