<%@ WebHandler Language="C#" Class="GetIMG" %>
using System;
using System.Web;
using System.Web.SessionState;
using MapgisWSClient;
using System.Configuration;

public class GetIMG : IHttpHandler, IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {
        try
        {
            CMapViewPort viewport = new CMapViewPort();
            int rowNo = Convert.ToInt32(context.Request.QueryString["a"]);
            int lineNo = Convert.ToInt32(context.Request.QueryString["b"]);
            int level = Convert.ToInt32(context.Request.QueryString["c"]);
            if (context.Session["viewport1"] == null)
            {
                viewport = new CMapViewPort(System.Configuration .ConfigurationManager.AppSettings["GisService"].ToString(), Convert.ToInt32(System.Configuration .ConfigurationManager.AppSettings["GisPort"]),512);
                context.Session["viewport1"] = viewport;
            }
            else
                viewport = (CMapViewPort)context.Session["viewport1"];
            viewport.SetIndexOffset(2);
                context.Response.BinaryWrite(viewport.GetMapImage(System.Configuration.ConfigurationManager.AppSettings["HDFBus"].ToString(), 1, rowNo, lineNo, level,2048,256));

        }
        catch (Exception e)
        {
            context.Response.BinaryWrite((byte[])context.Application["bt"]);
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}