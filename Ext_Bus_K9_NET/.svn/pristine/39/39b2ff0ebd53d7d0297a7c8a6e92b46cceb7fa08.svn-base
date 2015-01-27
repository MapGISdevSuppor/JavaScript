using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using MapgisWSClient;
using System.Configuration;

public partial class Main : System.Web.UI.Page
{
    CSingleMapView viewport = null;
    protected void Page_Load(object sender, EventArgs e)
    {
        string mapName = ConfigurationManager.AppSettings["mapName"];//读取配置文件中mapName（地图文档）结点信息
        try
        {
            Session["mapName"] = mapName;//将mapName结点信息存入Session中
            viewport = new CSingleMapView();
            viewport.SetServerIP(ConfigurationManager.AppSettings["ip"]);//读取配置文件中ip（IP地址）结点信息
            viewport.Open(mapName);//打开地图文档
            HttpContext.Current.Session["viewport"] = viewport;//写入缓存
        }
        catch (Exception ex)
        {
            //ErrorHandler.EndWithMsg(ex.Message);
        }
    }
}