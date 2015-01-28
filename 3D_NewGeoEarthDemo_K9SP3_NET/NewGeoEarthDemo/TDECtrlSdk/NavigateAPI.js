/**   
 * @fileOverview ��ά�ؼ������ӿ�   
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * �����ӿ�
 */
function NavigateAPI()
{
};

/**
 * ������������
 */
var NaviOpObj = new NavigateAPI();

/**
 * ��ȡ�ӿڳߴ�
 */

NavigateAPI.prototype.GetViewPortSize = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetViewPortSize", null);
    }
};

/**
 * ��ȡ��ǰ���ӵ���Ϣ�����ȣ�γ�ȣ��̣߳����룬��λ�ǣ��߶Ƚ�
 */
NavigateAPI.prototype.GetViewInfo = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetViewInfo", null);
    }
};

/**
 * ���õ�ǰ���ӵ���Ϣ�����ȣ�γ�ȣ��̣߳����룬��λ�ǣ��߶Ƚ�
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
 * ���õ�ǰ�ӿ�����
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
 * ���õ�ǰ���ӵ�λ��
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
 * ��ȡ��ǰ���ӵ�λ��
 */
NavigateAPI.prototype.GetPosition = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetPosition", null);
    }
}

/**
 * ���õ�ǰ���ӵ�߶�
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
 * ��ȡ��ǰ���ӵ�λ��
 */
NavigateAPI.prototype.GetViewHeight = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetViewHeight", null);
    }
}

/**
 * ���õ�ǰ�ķ�λ��
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
 * ��ȡ��ǰ�ķ�λ��
 */
NavigateAPI.prototype.GetHeading = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetHead", null);
    }
}

/**
 * ���õ�ǰ�ĸ߶Ƚ�
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
 * ��ȡ��ǰ�ĸ߶Ƚ�
 */
NavigateAPI.prototype.GetTilt = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "GetTilt", null);
    }
}

/**
 * ���ý���ȫ����ͼ
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
 * �˳�ȫ��ģʽ
 */
NavigateAPI.prototype.ExitFullView = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ExitFullView", null);
    }
}


/**
 * �Զ���ת
 *
 * @param heading
 *      ָ���Զ���ת���ٶȣ���λ����/��
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
 * �Զ��ƶ�
 *
 * @param x,y
 *      ָ���Զ��ƶ����ٶȣ���λ����/��
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
 * ��λ
 */
NavigateAPI.prototype.Reset = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "Reset", null);
    }
};
 
/**
 * ��λ��λ��
 */
NavigateAPI.prototype.ResetHeading = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ResetHeading", null);
    }
};

/**
 * ��λ�߶Ƚ�
 */ 
NavigateAPI.prototype.ResetTilt = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ResetTilt", null);
    }
};

/**
 * ��λ�ӵ�λ��
 */
NavigateAPI.prototype.ResetView = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("NaviOper", "ResetView", null);
    }
};

/*
 * ����������õ���
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
 * ��ʼ·������
 * points �㣬��ʽ��x1,y1,z1|x2,y2,z2|...|xn,yn,zn
 * speed �����ٶ�
 * height �����߶ȣ����Ϊ0���Ե�ǰ�ӵ�߶Ƚ��е���
 * first �Ƿ��һ�˳��ӽǣ���������˳�
 * showline �Ƿ���ʾ·��
 * showpoints �Ƿ���ʾ·����
 * model ģ�͵�����
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
 * ֹͣ����
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
 * ���·������
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
