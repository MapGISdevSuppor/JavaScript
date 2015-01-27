<%@ WebHandler Language="C#" Class="GetMapBound" %>
using System;
using System.Web;
using System.Text;
using MapgisWSClient;
using System.Web.SessionState;
public class GetMapBound : IHttpHandler, IRequiresSessionState
{
    public void ProcessRequest (HttpContext context) {
        try
        {
            int width = Convert.ToInt32(context.Request["w"]);
            int height = Convert.ToInt32(context.Request["h"]);
            MapDisplay.CheckViewport();
            StringBuilder sb = new StringBuilder();
            CSingleMapView viewport = (CSingleMapView)HttpContext.Current.Session["viewport"];
            Rect rc = viewport.GetViewBound(width,height);
            Rect displayRc = viewport.GetDisplayBound();
            sb.Append(displayRc.xmin.ToString() + ",");
            sb.Append(displayRc.ymin.ToString() + ",");
            sb.Append(displayRc.xmax.ToString() + ",");
            sb.Append(displayRc.ymax.ToString() + ",");
            sb.Append(rc.xmin.ToString() + ",");
            sb.Append(rc.ymin.ToString() + ",");
            sb.Append(rc.xmax.ToString() + ",");
            sb.Append(rc.ymax.ToString());
            context.Response.Write(sb.ToString());
        }
        catch (Exception ex)
        {
            context.Response.Write("0,0,0,0,0,0,0,0");
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}