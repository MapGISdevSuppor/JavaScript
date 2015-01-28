/**
 * @fileOverview ��ά�ؼ�
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */ 

/**
 * ��ά�ؼ��ӿڶ���
 */
var _3DControl;

/**
 * ��ȡ��ά�ؼ�����
 *
 * @ return ��ά�ؼ�����
 */
function GetTDECtrl() 
{
    HasTDECtrl();
    return _3DControl;
}

/**
 * �ж��Ƿ�����ά�ؼ��ӿڶ���
 * 
 * @return true��false
 */
function HasTDECtrl()
{
    if (_3DControl != null && _3DControl != "")
    {
        return true;
    }
    
    var version = "";
    
    _3DControl = document.getElementById("WebSceneDisCtrl");
    if (_3DControl != null)
    {
        try
        {
            version = _3DControl.InvokeCmd("CommonOper", "GetVersion", null);
        }
        catch(e)
        {
            _3DControl = null;
        }
    }
    
    if (_3DControl == null)
    {
        _3DControl = document.getElementById("npWebSceneDisCtrl");
        
        try
        {
            version = _3DControl.InvokeCmd("CommonOper", "GetVersion", null);
        }
        catch(e)
        {
            _3DControl = null;
        }
    }
    
    if (_3DControl != null) return true;
    
    return false;
};

/**
 * ��ȡ��ά�ؼ�������ҳ�ĵ�ַ
 * 
 * @return ��ҳURL
 */
function GetCtrlBaseURL()
{
    return document.URL;
};

/**
 * ��ȡ��ά�ؼ�����
 * 
 * @return ��ά�ؼ��Ĳ���
 */
function GetCtrlParam()
{
    if (HasTDECtrl())
    {
        var paramstr = "";
        var ctrl = GetTDECtrl();
        var params = ctrl.childNodes;
        for (var i = 0; i < params.length; ++i)
        {
            var param = params[i];
            if (param.tagName == "PARAM")
            {
                var name = param["name"];
                name = name.replace(/%/g, "%1");
                name = name.replace(/=/g, "%2");
                name = name.replace(/&/g, "%3");
                var value = param["value"];
                value = value.replace(/%/g, "%1");
                value = value.replace(/=/g, "%2");
                value = value.replace(/&/g, "%3");
                paramstr += name + "=" + value + "&";            
            }
            
        }
        paramstr = paramstr.substr(0, paramstr.length - 1);
        return paramstr;
    }
    
    return null;
};


/**
 * ��ȡ��ά�ؼ�������Ϣ
 * 
 * @return ��ά�ؼ�������Ϣ���������ơ��汾��
 */
function GetCommInfo()
{
    if (HasTDECtrl())
    {
        return "Zondy 3D Control,Version 1.0.0";
    }
};

/**
 * ��ȡ����ľ���λ��
 * 
 * @return var[2]
 */
function GetAbsolutePos(obj) 
{
    var ow = new Array(0, 0);
    var pw = obj;
    while (pw && pw.offsetParent) 
    {
        ow[0] += pw.offsetLeft;
        ow[1] += pw.offsetTop;
        pw = pw.offsetParent;
    }
    return ow;
}

/**
 * ��������ȡ���ڴ�С
 * 
 * �ú���֧�����������
 */
function findDimensions() 
{
    var winWidth = 0;
    var winHeight = 0;

     //��ȡ���ڿ��
     if (window.innerWidth)
           winWidth = window.innerWidth;
     else if ((document.body) && (document.body.clientWidth))
           winWidth = document.body.clientWidth;
     //��ȡ���ڸ߶�
     if (window.innerHeight)
           winHeight = window.innerHeight;
     else if ((document.body) && (document.body.clientHeight))
           winHeight = document.body.clientHeight;
   
     //ͨ������Document�ڲ���body���м�⣬��ȡ���ڴ�С
     if (document.documentElement  
        && document.documentElement.clientHeight 
        && document.documentElement.clientWidth)
     {
         winHeight = document.documentElement.clientHeight;
         winWidth = document.documentElement.clientWidth;
     }
     
     //������
     var size = new Array(winWidth, winHeight);
     return size;
}


/**
 * ͨ�ò����ӿ�
 */
function CommonOperAPI()
{
};


/**
 * ͨ�ò�������
 */
var CommonOpObj = new CommonOperAPI();


/*
 * ��ȡ��ά�ؼ��汾��Ϣ
 *
 */
CommonOperAPI.prototype.GetVersion = function () 
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetVersion", null);
    }
}

/*
 * ������ά��ʾģʽ
 *
 * @param mode
 *      ��ʾģʽ����ѡֵ��Globe ���� Flat
 * @param jingwei
 *      ����ģʽ��true ��ʾ��γ�����ݣ� false ��ʾ��ͨ����
 * @param radius
 *      ��뾶��Ĭ��ֵ��6378137.0
 */
CommonOperAPI.prototype.SetVisibleMode = function(mode, jingwei, radius)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = mode;
        param[1] = jingwei;
        param[2] = radius;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetVisibleMode", param);
    }
}

/*
 * ��ȡ��ά��ʾģʽ
 *
 * @return ��ʾģʽ
 *      ��ʾģʽ����ѡֵ��Globe ���� Flat
 */
CommonOperAPI.prototype.GetVisibleMode = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetVisibleMode", null);
    }
}

/*
 * ��ȡ��ά��뾶
 *
 */
CommonOperAPI.prototype.GetPlanetRadius = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPlanetRadius", null);
    }
}

/*
 * ��ȡ����ģʽ
 *
 */
CommonOperAPI.prototype.GetDataMode = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetDataMode", null);
    }
}

/*
 * ������ά�����Ч��
 *
 * @param enable
 *      true ��������Ч����false �ر�
 */
CommonOperAPI.prototype.SetEnablePlanetLight = function(enable)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = enable;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetEnablePlanetLight", param);
    }
}

/*
 * ��ȡ��ά�����Ч������
 *
 */
CommonOperAPI.prototype.GetEnablePlanetLight = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetEnablePlanetLight", null);
    }
}

/*
 * ������ά���θ߳����ű�
 *
 * @param scale
 *      ��ά���εĸ߳����ű�
 */
CommonOperAPI.prototype.SetTerrainScale = function(scale)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = scale;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetTerrainScale", param);
    }
}

/*
 * ��ȡ��ά���εĸ߳����ű�
 *
 */
CommonOperAPI.prototype.GetTerrainScale = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetTerrainScale", null);
    }
}

/*
 * ��ȡ��ά�������
 *
 */
CommonOperAPI.prototype.GetPluginNum = function () 
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginNum", null);
    }
}

/*
 * ��ȡ��ά�������
 *
 */
CommonOperAPI.prototype.GetPluginName = function (index) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = index;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginName", param);
    }
}

/*
 * ��ȡ��ά������������
 *
 */
CommonOperAPI.prototype.GetPluginItemNum = function (name) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginItemNum", param);
    }
}

/*
 * ��ȡ��ά�������������
 *
 */
CommonOperAPI.prototype.GetPluginItemName = function (name, index) 
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = index;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetPluginItemName", param);
    }
}

/*
 * ִ����ά���ܲ��
 *
 * @param name 
 *      �������
 * @param item
 *      ���������
 * @param param1
 *      ������Ӳ���1��û���򴫿��ַ��� ""
 * @param param2
 *      ������Ӳ���2��û���򴫿��ַ��� ""
 */
CommonOperAPI.prototype.ExecutePlugin = function (name, item, param1, param2)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = item;
        param[2] = param1;
        param[3] = param2;
        return GetTDECtrl().InvokeCmd("CommonOper", "ExecutePlugin", param);
    }
}

/*
 * ע���¼�
 *
 * @param name
 *      �¼����ƣ�����<code>onkeydown, onkeyup, onmousedown, onmouseup, ondbclick, onmousemove</code>
 * @param callback
 *      �¼���Ӧ���� 
 */
CommonOperAPI.prototype.RegisterEventHandle = function (name, callback)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = callback;
        return GetTDECtrl().InvokeCmd("CommonOper", "RegisterEventHandle", param);
    }
}

/*
 * ��ȡ�¼�
 *
 * @param name
 *      �¼����� 
 */
CommonOperAPI.prototype.GetEventHandle = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetEventHandle", param);
    }
}

/*
 * �Ƴ��¼�
 *
 * @param name
 *      �¼����� 
 */
CommonOperAPI.prototype.RemoveEventHandle = function (name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("CommonOper", "RemoveEventHandle", param);
    }
}

/*
 * �Ƴ������¼�
 *
 * @param name
 *      �¼����� 
 */
CommonOperAPI.prototype.RemoveAllEventHandle = function ()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "RemoveAllEventHandle", null);
    }
}

/*
 * ʰȡ��ά��
 *
 * @param x,y
 *      ���λ�õ���Ļ����㣬��ʼ����Ϊ��ά���ڵ����Ͻ�
 * @return ����ʰȡ������ά��
 *      ��ʽ��"x,y,z"
 *      �������ֵΪ���ַ�������û��ʰȡ����ά�����
 */
CommonOperAPI.prototype.Pick3DPoint = function(x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        return GetTDECtrl().InvokeCmd("CommonOper", "Pick3DPoint", param);
    }
}

/*
 * ��ȡ��ά���Ӧ����Ļ����
 *
 * @param x,y,z
 *      ��ά�����
 * @return ���ض�Ӧ����Ļ���꣬��ʼ����Ϊ��ά���ڵ����Ͻ�
 *      ��ʽ��"x,y"
 */
CommonOperAPI.prototype.GetScreenPoint = function(x, y, z)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetScreenPoint", param);
    }
}

/*
 * ʰȡ��άģ��
 *
 * @param x,y
 *      ���λ�õ���Ļ����㣬��ʼ����Ϊ��ά���ڵ����Ͻ�
 * @return ����ʰȡ������ά�������ģ�͵�id
 *      ��ʽ��"x,y,z|id"
 *      �������ֵΪ���ַ�������û��ʰȡ����άģ��
 */
CommonOperAPI.prototype.PickModel = function(x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        return GetTDECtrl().InvokeCmd("CommonOper", "PickModel", param);
    }
}

/*
 * ����ģ��ʰȡ����
 *
 * �ù��ܻỹԭģ��ʰȡ�����������õ�ģ��
 */
CommonOperAPI.prototype.ClearPick = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("CommonOper", "ClearPick", null);
    }
}

/*
 * ��ȡ��ҳ�ļ�
 *
 * @param url
 *      �ļ���ַ
 * @return �����ļ����ص�ַ
 */
CommonOperAPI.prototype.GetUrlFile = function (url)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = url;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetUrlFile", param);
    }
}
 
/*
 * ��ȡ��ҳͼƬ
 *
 * @param url
 *      ͼƬ��ַ
 * @return ����ͼƬ���ص�ַ��ͼƬ��ʽ
 */
CommonOperAPI.prototype.GetUrlImage = function (url)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = url;
        return GetTDECtrl().InvokeCmd("CommonOper", "GetUrlImage", param);
    }
}

/*
 * ��ʾ�ļ��Ի��򣬴򿪻��߱����ļ��Ի���
 *
 * @param openorsave
 *      true Ϊ�򿪣�false Ϊ���Ϊ
 * @param defExt
 *      Ĭ�ϵ��ļ���׺��
 * @param defFileName
 *      Ĭ���ļ�����
 * @param dwFlag
 *      ��־λ
 * @param filter
 *      �ļ�������
 * @return 
 *      �����ļ�·��
 * @remarks
 *      �ú������еĲ����÷�ͬwindow �ļ��Ի���һ�����÷������window�ļ��Ի���
 */
CommonOperAPI.prototype.ShowFileDialog = function (openorsave, defExt, defFileName, dwFlag, filter)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = openorsave;
        param[1] = defExt;
        param[2] = defFileName;
        param[3] = dwFlag;
        param[4] = filter;
        return GetTDECtrl().InvokeCmd("CommonOper", "ShowFileDialog", param);
    }
}

/*
 * ������ά�ؼ�ȫ����ʾ
 *
 * @param full 
 *      ȡֵ true ���� false
 * 
 */
CommonOperAPI.prototype.SetFullScreen = function (full)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = full;
        return GetTDECtrl().InvokeCmd("CommonOper", "SetFullScreen", param);
    }
}

/*
 * ��ʾ3DС������
 *
 * @param isShow 
 *      ȡֵ true ���� false
 * 
 */
CommonOperAPI.prototype.Show3DAxis = function (isShow)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = isShow;
        return GetTDECtrl().InvokeCmd("CommonOper", "Show3DAxis", param);
    }
}