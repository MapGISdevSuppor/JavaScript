using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Web;

public class ErrorHandler
{
    public static void EndWithMsg(string message)
    {
        HttpContext.Current.Response.Write("<script language=javascript>alert('" + message + "')</script>");
        HttpContext.Current.Response.End();
    }
    public static void ReturnWithMsg(string message)
    {
        HttpContext.Current.Response.Write("<script language=javascript>alert('" + message + "')</script>");
        return;
    }

    public static void ResponseErrorMessageImage()
    {
        /*string imgPath = HttpContext.Current.Server.MapPath("images") + @"\wait.gif";
        if (File.Exists(imgPath))
        {
            System.Drawing.Image img = System.Drawing.Image.FromFile(imgPath);
            img.Save(HttpContext.Current.Response.OutputStream, img.RawFormat);
            img.Dispose();
        }*/
        HttpContext.Current.Response.BinaryWrite((byte[])HttpContext.Current.Application["errorImg"]);
        HttpContext.Current.Response.End();
    }

}
