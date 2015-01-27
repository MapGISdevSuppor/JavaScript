using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Configuration;
using MapgisWSClient;

public class MapSetting
{
    private CSingleMapView _viewport;
    public MapSetting()
    {
        MapDisplay.CheckViewport();
        _viewport = (CSingleMapView)HttpContext.Current.Session["viewport"];

    }

    /// <summary>
    /// 根据图层显示索引获得图层列表
    /// </summary>
    /// <returns></returns>
    public CLayerAccessInfo[] GetLayerList()
    {
        int layerNum = _viewport.GetLayerCount();
        return _viewport.GetLayerInfo();
    }

    /// <summary>
    /// 以JSON的方式返回图层列表属性信息

    /// </summary>
    /// <returns></returns>
    public string GetLayerListByJSON(string mapType)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("[");
        if (mapType == "0")
            sb.Append(this.GetGridLayer());
        else
        {
            if (mapType == "2")
                sb.Append(this.GetGridLayer() + ",");
            sb.Append(@"{text:'" + MapSetting.GetMapNameConfig() + "',children:	[");
            ScriptWriter sw = new ScriptWriter();
            sw.SetClassAttribute("id", "text", "leaf", "cls", "qtip", "listeners");
             CLayerAccessInfo[] layers=null;
            try
            {
                layers = _viewport.GetLayerInfo();
            }
            catch (Exception ex)
            {
            }
            for (int i = 0; i < layers.Length; i++)
            {
                string[] param = new string[6];
                param[0] = "'layer" + i + "'";
                string layerName=layers[i].LayerInfoList[0].LayerDataName.Replace('\\','/');
                if(layerName.Length>15)
                    param[1] = "'" + layerName.Substring(0,15) + "'";
                else
                    param[1] = "'" + layerName + "'";
                param[2] = "true";
                param[3] = "'" + GetLayerStatus(_viewport.GetMapLayerInfo(i).LayerStatus) + "'";
                param[4] = "'<span>"+layerName+"<br>右键单击选择图层状态<br>左键单击进入编辑状态<br>左键拖动调整图层顺序</span>'";
                param[5] = "{click:setEditable,contextmenu:showCtx}";
                sw.AddClassData(param);
            }
            sb.Append(sw.GetJSONObjStr() + "]}");
        }
        sb.Append("]");
        return sb.ToString();
    }

    private string GetGridLayer()
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("{text:'栅格流图层',allowDrag:false,allowDrop:false,children:[");
        ScriptWriter sw = new ScriptWriter();
        sw.SetClassAttribute("id", "text", "leaf", "allowDrag", "allowDrop", "cls", "qtip", "listeners");
        string[] names = new string[0];
        if (ConfigurationManager.AppSettings["HDF"] != null)
            names = ConfigurationManager.AppSettings["HDF"].Split(',');
        int len = names.Length;
        for (int i = 0, l = len; i < l; i++)
        {
            string[] param = new string[8];
            param[0] = "'slayer" + i + "'";
            param[1] = "'" + names[i] + "'";
            param[2] = "true";
            param[3] = "false";
            param[4] = "false";
            param[5] = "'visible'";
            param[6] = "'<span>左键单击切换可见状态</span>'";
            param[7] = "{click:changeGridStatus}";
            sw.AddClassData(param);
        }
        sb.Append(sw.GetJSONObjStr() + "]}");
        return sb.ToString();
    }

    /// <summary>
    /// 返回图层状态

    /// </summary>
    /// <param name="pMapLayer"></param>
    /// <returns></returns>
    private string GetLayerStatus(EnumLayerStatus state)
    {
        if (state == EnumLayerStatus.Invisiable)
        {
            return "hidden";
        }
        else if (state == EnumLayerStatus.Selectable)
        {
            return "selectable";
        }
        else if (state == EnumLayerStatus.Editable)
        {
            return "editable";
        }
        else
            return "visible";
    }

    /// <summary>
    /// 设定图层状态

    /// </summary>
    /// <param name="pMapLayer"></param>
    /// <returns></returns>
    private void SetLayerStatus(ref EnumLayerStatus layerState, string status)
    {
        switch (status)
        {
            case "editable":
                layerState = EnumLayerStatus.Editable;
                break;
            case "selectable":
                layerState = EnumLayerStatus.Selectable;
                break;
            case "visible":
                layerState = EnumLayerStatus.Visiable;
                break;
            case "hidden":
                layerState = EnumLayerStatus.Invisiable;
                break;
        }

    }

    /// <summary>
    /// 更新地图文档图层状态和显示顺序
    /// </summary>
    /// <param name="idxList">新的图层序号</param>
    public void UpdateMap(string requestString)
    {
        string[] layerArr = requestString.Split('&');
        int layerNum = layerArr.Length - 1;
        int[] layerDisIndex = new int[layerNum];
        int[] layerIndexs = new int[layerNum];
        CMapLayerInfo[] layerInfo = new CMapLayerInfo[layerNum];
        for (int i = 0; i < layerNum; i++)
        {
            int curIndex = Convert.ToInt32(layerArr[i + 1].Split('=')[0].Substring(5));
            layerInfo[i] = _viewport.GetMapLayerInfo(curIndex);
            SetLayerStatus(ref layerInfo[i].LayerStatus, layerArr[i + 1].Split('=')[1]);
            layerDisIndex[i] = curIndex;
            layerIndexs[i] = curIndex;
        }
        _viewport.SetLayerDisplayOrder(layerDisIndex);
        _viewport.SetMapLayerInfoList(layerIndexs, layerInfo);
        HttpContext.Current.Session["viewport"] = _viewport;
    }

    /// <summary>
    /// 获取web.config中<mapName>的值

    /// </summary>
    /// <returns></returns>
    public static string GetMapNameConfig()
    {
        //string name = ConfigurationManager.AppSettings["mapName"];
        string name = HttpContext.Current.Session["mapName"] as string;
        if (name == null)
        {
            ErrorHandler.EndWithMsg("地图文档名称SESSION为空");
        }
        return name;
    }

    /// <summary>
    /// 获取可选图层索引字符串
    /// </summary>
    /// <returns></returns>
    public string GetSelectableLayersIndex()
    {
        StringBuilder sb = new StringBuilder();
        int layerNum = _viewport.GetLayerCount();
        for (int i = 0; i < layerNum; i++)
        {
            EnumLayerStatus state = new EnumLayerStatus();
            state=_viewport.GetMapLayerInfo(i).LayerStatus;
            if (state==EnumLayerStatus.Selectable)
                sb.Append(i + ",");
        }
        if (sb.Length > 0)
            sb.Remove(sb.Length - 1, 1);
        sb.Append(GetEditableLayersIndex());
        return sb.ToString();
    }

    /// <summary>
    /// 获取可编辑图层索引字符串
    /// </summary>
    /// <returns></returns>
    public string GetEditableLayersIndex()
    {
        StringBuilder sb = new StringBuilder();
        int layerNum = _viewport.GetLayerCount();
        for (int i = 0; i < layerNum; i++)
        {
            EnumLayerStatus state = new EnumLayerStatus();
            state = _viewport.GetMapLayerInfo(i).LayerStatus;
            if (state == EnumLayerStatus.Editable)
                sb.Append(i + ",");
        }
        if (sb.Length > 0)
            sb.Remove(sb.Length - 1, 1);
        return sb.ToString();
    }

    public XClsType GetLayerType(int layerIndex)
    {
        return _viewport.GetLayerInfo()[layerIndex].LayerInfoList[0].LayerType;
    }

    /// <summary>
    /// 获取可见图层索引字符串

    /// </summary>
    /// <returns></returns>
    public string GetVisibleLayersIndex()
    {
        StringBuilder sb = new StringBuilder();
        int layerNum = _viewport.GetLayerCount();
        for (int i = 0; i < layerNum; i++)
        {
            EnumLayerStatus state = _viewport.GetMapLayerInfo(i).LayerStatus;
            if (state == EnumLayerStatus.Visiable)
                sb.Append(i + ",");
        }
        if (sb.Length > 0)
            sb.Remove(sb.Length - 1, 1);
        return sb.ToString();
    }

    /// <summary>
    /// 获取网文件图层索引

    /// </summary>
    /// <returns></returns>
    public int GetNetLayerIndex()
    {
        int index = -1;
        CLayerAccessInfo[] layers = _viewport.GetLayerInfo();
        int layerNum = layers.Length;
        for (int i = 0; i < layerNum; i++)
        {
            EnumLayerStatus state = _viewport.GetMapLayerInfo(i).LayerStatus;
            if ((state != EnumLayerStatus.Invisiable) && layers[i].LayerInfoList[0].LayerType == XClsType.GNetCls)
                index = i;
        }

        return index;
    }
    public CSingleLayerView GetAnalyLayerView(string fclsName)
    {
        CSingleLayerView lview = new CSingleLayerView();
        lview.SetServerIP(ConfigurationManager.AppSettings["ip"]);
        if (lview.Open(GetAnalyLayerGDBInfo(), GetAnalyLayerinfo(fclsName)))
        {
            lview.SetLayerStatus(EnumLayerStatus.Editable);
            return lview;
        }
        else
            return null;
    }
    public CSingleLayerView GetBufferRltLayerView(string fclsName,XClsType clsTp)
    {
        CSingleLayerView lview = new CSingleLayerView();
        lview.SetServerIP(ConfigurationManager.AppSettings["ip"]);
        CLayerInfo layerinfo = new CLayerInfo();
        layerinfo.LayerDataName = fclsName;
        layerinfo.LayerType = clsTp;
        if (lview.Open(GetAnalyLayerGDBInfo(), layerinfo))
        {
            lview.SetLayerStatus(EnumLayerStatus.Editable);
            return lview;
        }
        else
            return null;
    }
    public CGdbInfo GetAnalyLayerGDBInfo()
    {
        CGdbInfo gdbinfo = new CGdbInfo(ConfigurationManager.AppSettings["ip"], "mapgislocal", "imswebgisgdb", "", "");
        return gdbinfo;
    }
    public CLayerInfo GetAnalyLayerinfo(string fclsName)
    {
        CLayerInfo layerinfo = new CLayerInfo();
        layerinfo.LayerDataName = fclsName;
        layerinfo.LayerType = GetAnalyLayerType();
        return layerinfo;
    }
    public XClsType GetAnalyLayerType()
    {
        MapSetting ms = new MapSetting();
        string editLayersStr = ms.GetEditableLayersIndex();
        XClsType clsTp = XClsType.SFeatureCls;
        if (editLayersStr.IndexOf(",") > 0)
        {
            ErrorHandler.ReturnWithMsg("有多个图层处于编辑状态，请点击选择一个然后提交！");
        }
        else
        {
            int analLayerIndex = Convert.ToInt32(editLayersStr);
            clsTp = _viewport.GetLayerInfo()[analLayerIndex].LayerInfoList[0].LayerType;
        }
        return clsTp;
    }
	public static string GetWSIP()
	{
		if(ConfigurationManager.AppSettings["ip"]==null||ConfigurationManager.AppSettings["ip"]=="")
			return "127.0.0.1";
		else 
			return ConfigurationManager.AppSettings["ip"];
		
	}

    }

