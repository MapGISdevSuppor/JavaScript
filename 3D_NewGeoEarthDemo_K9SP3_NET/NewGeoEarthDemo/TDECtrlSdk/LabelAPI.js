/**   
 * @fileOverview ��ά�ؼ���ά��ע�����ӿ�   
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */
 
/**
 * ��ά��ע�����ӿ�
 */
function LabelAPI()
{
};

/**
 * ��ά��ע��������
 */
var LabelOpObj = new LabelAPI();

/**
 * ��� ��ע
 *
 * @param name
 *      ��ע�����ƣ����������ַ������Զ���������
 * @return 
 *      ���ش�����ע������
 */
LabelAPI.prototype.AddLabel = function(name, layerName, text, fontName, fontSize, fontColor, x, y, z)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = text;
        param[3] = fontName;
        param[4] = fontSize;
        param[5] = fontColor;
        param[6] = x;
        param[7] = y;
        param[8] = z;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddLabelEx", param);
    }
};

/**
 * ��� �ر�
 *
 * @param name
 *      ��ע�����ƣ����������ַ������Զ���������
 *
 * @param iconUrl
 *      ָ��ͼ���url������������ͼƬ��ʹ�÷ֺŷָ�
 *      ���Ҫָ������Ƶ�ʣ���ʹ��AddLabel() �� SetIcon()�ӿ����ʹ��
 *
 * @prarm scale
 *      ָ��ͼ������ű�
 * @return 
 *      ���ش�����ע������
 */
LabelAPI.prototype.AddLabelAndIcon = function(name, layerName, text, fontName, fontSize, fontColor, iconUrl, iconScale, desc, x, y, z, farDist, nearDist)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = text;
        param[3] = fontName;
        param[4] = fontSize;
        param[5] = fontColor;
        param[6] = iconUrl;
        param[7] = iconScale;
        param[8] = desc;
        param[9] = x;
        param[10] = y;
        param[11] = z;
        param[12] = farDist;
        param[13] = nearDist;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddLabelAndIcon", param);
    }
};

/**
 * ���
 *
 * @param name
 *      ��ע�����ƣ����������ַ������Զ���������
 * @return 
 *      ���ش�����ע������
 */
LabelAPI.prototype.Add = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddLabel", param);
    }
};

/**
 * �Ƴ�
 */
LabelAPI.prototype.Remove = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveLabel", param);
    }
};

/**
 * �Ƴ�ָ��ͼ�����б�ע
 */
LabelAPI.prototype.RemoveLayer = function(layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveLabelLayer", param);
    }
};

/**
 * �Ƴ����б�ע
 */
LabelAPI.prototype.RemoveAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveLabelAll", null);
    }
};

/**
 * ����λ��
 * 
 * 
 */
LabelAPI.prototype.SetPosition = function(name, layerName, x, y, z)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = x;
        param[3] = y;
        param[4] = z;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetPosition", param);
    }
};

/**
 * ��ȡλ��
 *
 * @return ������ά��ע����άλ��
 *      ��ʽ��"x,y,z"
 */
LabelAPI.prototype.GetPosition = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetPosition", param);
    }
};

/**
 * ���ñ�ע����
 */
LabelAPI.prototype.SetText = function(name, layerName, text)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = text;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetText", param);
    }
};

/**
 * ��ȡ��ע������
 */
LabelAPI.prototype.GetText = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetText", param);
    }
};

/**
 * �������壬��ɫ���ֺ�
 */
LabelAPI.prototype.SetFont = function(name, layerName, fontName, color, size)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = fontName;
        param[3] = color;
        param[4] = size;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetFont", param);
    }
};

/**
 * ��ȡ���壬��ɫ���ֺ�
 *
 * @return ��Χ������ɫ�ֺ�
 *      ��ʽ "fintName,fontColor,fontSize"
 */
LabelAPI.prototype.GetFont = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetFont", param);
    }
};

/**
 * ����ͼ��
 *
 * @param name
 * @param layerName
 * @param iconUrl
 *      ָ��ͼ���url������������ͼƬ��ʹ�÷ֺ�(;)�ָ�
 * @prarm scale
 *      ָ��ͼ������ű�
 * @prarm duration
 *      ָ��������Ƶ�ʣ���ָ�����ͼ��ʱ��Ч
 */
LabelAPI.prototype.SetIcon = function(name, layerName, iconUrl, scale, duration)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = iconUrl;
        param[3] = scale;
        param[4] = duration;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetIcon", param);
    }
};

/**
 * ��ȡͼ��
 */
LabelAPI.prototype.GetIcon = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetIcon", param);
    }
};

/**
 * ����ͼ��ƽ�ƶ���
 */
LabelAPI.prototype.SetScrollAnimation = function(name, layerName, x, y)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = x;
        param[3] = y;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetScrollAnimation", param);
    }
};

/**
 * ��ȡͼ��ƽ�ƶ���
 *
 * @return ƽ�ƶ���
 *      ��ʽ "x,y"
 */
LabelAPI.prototype.GetScrollAnimation = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetScrollAnimation", param);
    }
};

/**
 * ����ͼ����ת����
 */
LabelAPI.prototype.SetRotateAnimation = function(name, layerName, a)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = a;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetRotateAnimation", param);
    }
};

/**
 * ��ȡͼ����ת����
 */
LabelAPI.prototype.GetRotateAnimation = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetRotateAnimation", param);
    }
};

/**
 * ���ÿɼ�����
 */
LabelAPI.prototype.SetShowDist = function(name, layerName, farDist, nearDist)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = farDist;
        param[3] = nearDist;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetShowDist", param);
    }
};

/**
 * ��ȡ�ɼ�����
 *
 * @return �ɼ�����
 *      ��ʽ "farDist,nearDist"
 */
LabelAPI.prototype.GetShowDist = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetShowDist", param);
    }
};

/**
 * ������ȼ��
 *
 * @param type
 *      ���ͣ�ȡֵ text ���� icon
 * @param enable
 *      �Ƿ������ȼ��
 */
LabelAPI.prototype.SetDepthCheck = function(name, layerName, type, enable)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = type;
        param[3] = enable;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetDepthCheck", param);
    }
};

/**
 * ��ȡ��ȼ��
 *
 * @param type
 *      ���ͣ�ȡֵ text ���� icon  
 */
LabelAPI.prototype.GetDepthCheck = function(name, layerName, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = type;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetDepthCheck", param);
    }
};

/**
 * ����������Ϣ
 */
LabelAPI.prototype.SetDesc = function(name, layerName, desc)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = desc;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetDesc", param);
    }
};

/**
 * ��ȡ������Ϣ
 */
LabelAPI.prototype.GetDesc = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetDesc", param);
    }
};

/**
 * ���ñ�ע����չ����
 */
LabelAPI.prototype.SetAttitude = function(name, layerName, key, value)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = key;
        param[3] = value;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetAttitude", param);
    }
};

/**
 * ��ȡ��ע����չ����
 */
LabelAPI.prototype.GetAttitude = function(name, layerName, key)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = key;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetAttitude", param);
    }
};

/**
 * ����������¼�
 * 
 * �������ʱ���������¼�
 *
 * �¼���Ӧ��������������
 *     ��һ������Ϊ��ע����
 *     �ڶ�������Ϊ��עͼ������
 */
LabelAPI.prototype.SetOnClickHandle = function(name, layerName, callback)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        param[2] = callback;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetOnClickHandle", param);
    }
};

/**
 * ��ȡ������¼�
 *
 * @return �¼���Ӧ������
 */
LabelAPI.prototype.GetOnClickHandle = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetOnClickHandle", param);
    }
};

/**
 * ��ȡ��ע����Ļ����
 *
 * @return ���ر�ע����Ļ���꣬���Ͻǵ����꣬���½ǵ�����
 *      
 * ����ֵ��ʽ��"posx,posy,topleftx,toplefty,bottomrightx,bottomrighty";
 */
LabelAPI.prototype.GetSrceenPos = function(name, layerName)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = layerName;
        return GetTDECtrl().InvokeCmd("LabelOper", "GetSrceenPos", param);
    }
};


/**
 * ��� ������ʾ
 */
LabelAPI.prototype.AddBubble = function(name, desc, x, y, z, opacity, bgColor, bdColor, width, height, scale)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = desc;
        param[2] = x;
        param[3] = y;
        param[4] = z;
        param[5] = opacity;
        param[6] = bgColor;
        param[7] = bdColor;
        param[8] = width;
        param[9] = height;
        param[10] = scale;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddBubble", param);
    }
};

/**
 * �Ƴ� ������ʾ
 */
LabelAPI.prototype.RemoveBubble = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveBubble", param);
    }
};

/**
 * �Ƴ� ������ʾ
 */
LabelAPI.prototype.RemoveBubbleAll = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveBubbleAll", null);
    }
};

/**
 * �Ƴ� ��������
 */
LabelAPI.prototype.RemoveSharedBubble = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveSharedBubble", null);
    }
};


// ToolTip
/**
 * ���Tooltip
 * �ú������Զ�����ToolTip��λ��
 * �����Ҫ�ֶ����ƣ���ʹ�� SetToolTipPos����
 *
 * @param x,y,z
 *      ToolTipָ�����ά��
 * @bdColor
 *      �߿���ɫ
 * @param width,height
 *      ToolTip�ĸ߿�
 * @return 
 *      ����ToolTip������
 */
LabelAPI.prototype.AddToolTip = function(x, y, z, bdColor, width, height)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = x;
        param[1] = y;
        param[2] = z;
        param[3] = bdColor;
        param[4] = width;
        param[5] = height;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddToolTip", param);
    }
}

/**
 * ����ToolTip������
 *
 * @param info
 *      ���ToolTip������
 *
 * @param type
 *      ToolTip ���ݵ����ͣ���ѡ���ͣ�html��text��url
 *      html ���ͣ�info������html���
 *      text ���ͣ�infoΪ���ı�������������html���
 *      url ���ͣ�infoΪһ��url��ָ��������ҳ
 */
LabelAPI.prototype.SetToolTipInfo = function(info, type)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = info;
        param[1] = type;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipInfo", param);
    }
}

/**
 * ����ToolTip����Ļλ��
 * ��������ʼ��Ϊ��ά�������Ͻ�
 *
 * @param name
 *      ToolTip������
 * @param x,y
 *      ToolTip������
 */
LabelAPI.prototype.SetToolTipPos = function(name, left, top)
{
    if (HasTDECtrl())
    {
        var param = new Array()
        param[0] = name;
        param[1] = left;
        param[2] = top;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipPos", param);
    }
}

/**
 * �Զ���tooltip�߿�ͱ���ͼ��˵��
 *
 * tooltipʹ������һ��3x3�ı�񣬽����tooltip�ָ������9������
 * ���� ����center������ʾ������ݣ�
 * ���� 1 - 8 ��tooltip�ı߿�
 *

	    left               right 
		+--+---------------+--+ 
		|0 |       1       |2 | top
		+--+---------------+--+ 
		|  |               |  |
		|  |               |  |
		|3 |    center     |4 |
		|  |               |  |
		+--+---------------+--+ 
		|5 |       6       |7 | bottom
		+--+---------------+--+ 
 *
 */

/**
 * ����Tooltip�߿�Ŀ��
 *
 * @left
 *      ��߿�Ŀ��
 * @right
 *      �ұ߿�Ŀ��
 * @top
 *      �ϱ߿�Ŀ��
 * @right
 *      �±߿�Ŀ��
 */
LabelAPI.prototype.SetToolTipBorder = function(name, left, right, top, bottom)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = left;
        param[2] = right;
        param[3] = top;
        param[4] = bottom;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipBorder", param);
    }
}

/**
 * �Զ���Tooltip����ͼ��
 * ����ͼ�������ͬ�߿�
 */
LabelAPI.prototype.SetToolTipImage = function(name, imgUrl, left, right, top, bottom)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = imgUrl;
        param[2] = left;
        param[3] = right;
        param[4] = top;
        param[5] = bottom;
        return GetTDECtrl().InvokeCmd("LabelOper", "SetToolTipImage", param);
    }
}

/**
 * ���Tooltip�¼�
 */
LabelAPI.prototype.AddToolTipEventHandle = function(name, callback, left, right, top, bottom)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        param[1] = callback;
        param[1] = left;
        param[2] = right;
        param[3] = top;
        param[4] = bottom;
        return GetTDECtrl().InvokeCmd("LabelOper", "AddToolTipEventHandle", param);
    }
}

/**
 * ɾ������Tooltip�¼�
 */
LabelAPI.prototype.ClearToolTipEventHandle = function(name)
{
    if (HasTDECtrl())
    {
        var param = new Array();
        param[0] = name;
        return GetTDECtrl().InvokeCmd("LabelOper", "ClearToolTipEventHandle", param);
    }
}

/**
 * �Ƴ�Tooltip
 */
LabelAPI.prototype.RemoveToolTip = function()
{
    if (HasTDECtrl())
    {
        return GetTDECtrl().InvokeCmd("LabelOper", "RemoveToolTip", null);
    }
}		


/**
 * ��ʾToolTip
 * �ص���������Ҫ�����������
 *
 */
function LabelCallBack_SetToolTipFrame(left, top, width, height, info, type) 
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    var tooltipFrameForURLEle = document.getElementById("ToolTipFrameForURL");
    if (tooltipFrameForURLEle == undefined) return;
    
    var tooltipFrameForHTMLEle = document.getElementById("ToolTipFrameForHTML");
    if (tooltipFrameForHTMLEle == undefined) return;
    
    var pos = GetAbsolutePos(GetTDECtrl());
    //pos[0] = 0;
    //pos[1] = 0;
    
    tooltipDivEle.style.left = (parseFloat(left) + pos[0]) + "px";
    tooltipDivEle.style.top = (parseFloat(top) + pos[1]) + "px";
    tooltipDivEle.style.width = width + "px";
    tooltipDivEle.style.height = height + "px";
    
    if (type == "url")
    {
        tooltipFrameForURLEle.style.display = "";
        tooltipFrameForHTMLEle.style.display = "none";
        
        tooltipFrameForURLEle.src = info;
    }
    else
    {
        tooltipFrameForURLEle.style.display = "none";
        tooltipFrameForHTMLEle.style.display = "";
        
        var tooltipFrame = window.frames["ToolTipFrameForHTML"];
        if (tooltipFrame == undefined) return;
        
        var infoCon = tooltipFrame.document.getElementById("InfoContainer");
        if (infoCon == undefined) return;   
        
        if (type == "html")
        {
            infoCon.innerHTML = info;
        }
        else if (type == "text")
        {
            infoCon.innerText = info;
        }
        else
        {
            infoCon.innerText = info;
        }
    }
    
    //��ʾ
    tooltipDivEle.style.display = "";
}

/**
 * ����ToolTip��λ��
 * �ص���������Ҫ�����������
 */
function LabelCallBack_SetToolTipPos(left, top)
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    var pos = GetAbsolutePos(GetTDECtrl());
    
    tooltipDivEle.style.left = (parseFloat(left) + pos[0]) + "px";
    tooltipDivEle.style.top = (parseFloat(top) + pos[1]) + "px";
}

/**
 * ��ʾToolTip
 * �ص���������Ҫ�����������
 *
 */
function LabelCallBack_ShowToolTipFrame()
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    tooltipDivEle.style.display = "";
}


/**
 * ����ToolTip
 * �ص���������Ҫ�����������
 *
 */
function LabelCallBack_HideToolTipFrame()
{
    var tooltipDivEle = document.getElementById("ToolTipDiv");
    if (tooltipDivEle == undefined) return;
    
    tooltipDivEle.style.display = "none";
}