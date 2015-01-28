using System;
using System.Web;
using System.Net;
using System.IO;
using System.Configuration;
using System.Collections;
using System.Globalization;
using System.Drawing;
using ICSharpCode.SharpZipLib.Zip;
using System.Text;

public class Handler : IHttpHandler
{

    /// <summary>
    /// 超时值（以毫秒为单位）。默认值为 100,000 毫秒（100 秒）。
    /// </summary>
    public int Timeout = 100000;
    public string ContentType;
    public int ContentLength;
    public string ContentEncoding;
    private static MTWFile MapLog = null;
    private static MTWFile TddataLog = null;
    private static MTWFile ExceptionLog = null;
    private static System.Collections.Generic.Dictionary<string, long> dataDic = null;
    private static ArrayList dcsList = null;

    public void ProcessRequest(HttpContext context)
    {
        InitialLog();
        try
        {
            string service = context.Request.PathInfo;
            if (service == "/map")
            {
                GetMap2(context);
            }
            else if (service == "/tddata")
            {
                GetTddata2(context);
            }
            else if (service == "/DataServer")
            {
                GetTDT2(context);
            }
            else
            {
                //getDCSData(context);
            }
        }
        catch (Exception aEx)
        {
            ExceptionLog.WriteLine(aEx.Message);
            context.Response.Clear();
            context.Response.ClearHeaders();
            context.Response.ClearContent();
            context.Response.StatusCode = 404;
        }
    }

    private void GetTDT2(HttpContext context)
    {
        HttpRequest req = context.Request;
        HttpResponse resp = context.Response;


        string strlevel = null;
        string strrow = null;
        string strcol = null;

        strlevel = req.QueryString["level"];
        strrow = req.QueryString["row"];
        strcol = req.QueryString["col"];
        string layer = req.QueryString["T"];

        if (strlevel == null || strcol == null || strrow == null)
        {
            return;
        }

        int level = int.Parse(strlevel);
        int row = int.Parse(strrow);
        int col = int.Parse(strcol);

        string path = MapHelper.GetTDT(layer, level, row, col);

        resp.Clear();
        resp.ClearHeaders();
        resp.ClearContent();

        if (path == null)
        {
            resp.StatusCode = 404;
        }
        else if (path == "empty")
        {
            resp.StatusCode = 204;
        }
        else
        {
            resp.StatusCode = 200;
            resp.WriteFile(path);
        }
    }

    private void GetMap2(HttpContext context)
    {
        HttpRequest req = context.Request;
        HttpResponse resp = context.Response;

        string docName = req.QueryString["mapDoc"];
        string mapName = req.QueryString["mapName"];
        string strwidth = req.QueryString["width"];
        string metadataId = req.QueryString["metadataid"];
        string classpath = req.QueryString["classpath"];

        string strlevel = req.QueryString["level"];
        string strrow = req.QueryString["row"];
        string strcol = req.QueryString["col"];

        if (strlevel == null || strcol == null || strrow == null)
        {
            //
            string strbox = req.QueryString["box"];
            string strheight = req.QueryString["height"];
            strwidth = req.QueryString["width"];
            if (strbox != null)
            {
                string[] tmp = strbox.Split(',');
                double xmin = Double.Parse(tmp[0]);
                double ymin = Double.Parse(tmp[1]);
                double xmax = Double.Parse(tmp[2]);
                double ymax = Double.Parse(tmp[3]);
                int h = Int32.Parse(strheight);
                int w = Int32.Parse(strwidth);
                string dcs = GetDCS();
                Bitmap bitmap = null;
                if (docName != null && mapName != null)
                {
                    bitmap = MapHelper.GetMapByBox(dcs, docName, mapName, xmin, xmax, ymin, ymax, w, h, 256, "Png");
                }
                if (classpath == null)
                {
                    classpath = req.Form["classpath"];
                }
                if (classpath != null && metadataId != null)
                {
                    bitmap = MapHelper.GetMetadataMapByBox(dcs, metadataId, classpath, xmin, xmax, ymin, ymax, w, h, 256, "Png");
                }
                resp.StatusCode = 200;
                resp.ContentType = "image/jpeg";
                resp.Buffer = true;
                bitmap.Save(resp.OutputStream, System.Drawing.Imaging.ImageFormat.Png);
            }
            return;
        }

        if (strwidth == null)
        {
            strwidth = "256";
        }

        strwidth = "256";

        int level = int.Parse(strlevel);
        int row = int.Parse(strrow);
        int col = int.Parse(strcol);
        int size = int.Parse(strwidth);

        //获取dws的URL
        string soapaddr = GetDCS();
        string path = null;
        if ((mapName == null || docName == null) && metadataId != null)
        {
            if (classpath == null)
            {
                classpath = req.Form["classpath"];
            }
            if (classpath != null)
            {
                path = MapHelper.GetMetadataMap(soapaddr, metadataId, classpath, level, row, col, 256, "png");//  .GetMap(soapaddr, docName, mapName, level, row, col, size, "png");
            }
        }
        else
        {
            //path = MapHelper.GetMap(soapaddr, docName, mapName, level, row, col, size, "png");
            DWS.dwService dws = new DWS.dwService();
            dws.Url = soapaddr;
            DWS.MapQuery query = new DWS.MapQuery();
            query.format = "png";
            query.classPath = "";
            query.mapDoc = docName;
            
            query.col = col;
            query.row = row;
            query.level = (short)level;
            query.useTile = true;
            query.width = 256;
            query.height = 256;
            if (mapName == "NULL")
            {
                query.version = 1;
                query.mapName = "";
                query.useTile = true;
            }

            //开始绘制
            DWS.MapInfo mi = dws.getMap(query);
            //绘制成功
            if (mi.isSuccess && mi.image != null)
            {
                resp.Clear();
                resp.ClearHeaders();
                resp.ClearContent();
                resp.ContentType = "image/jpeg";
                resp.Buffer = true;
                resp.StatusCode = 200;
                System.IO.MemoryStream ms = new System.IO.MemoryStream(mi.image);
                Bitmap fullimage = new Bitmap(ms);   
                fullimage.Save(resp.OutputStream, System.Drawing.Imaging.ImageFormat.Png); //展现图片  
                ms.Dispose();
                return;
            }
        }

        //resp.Clear();
        //resp.ClearHeaders();
        //resp.ClearContent();

        //if (path == null)
        //{
        //    // 
        //    resp.StatusCode = 404;
        //}
        //else if (path == "empty")
        //{
        //    //
        //    resp.StatusCode = 204;
        //}
        //else
        //{
        //    resp.StatusCode = 200;
        //    resp.WriteFile(path);
        //}
        //long count = 0;
        //string openStr = docName + "|" + mapName;
        //try
        //{
        //    if (dataDic.ContainsKey(openStr))
        //    {
        //        dataDic.TryGetValue(openStr, out count);
        //        count++;
        //    }
        //    dataDic[openStr] = count;
        //}
        //catch (Exception countEx)
        //{
        //    dataDic = new System.Collections.Generic.Dictionary<string, long>();
        //    dataDic.Add(openStr, count);
        //}

        //string time = DateTime.Now.ToString();
        //string respHead = "本次连接状态:" + resp.StatusCode + " " + resp.StatusDescription;
        //string remoteIp = req.UserHostAddress;
        //string requestData = "请求数据:" + openStr + "\r\n本次服务器开机该数据访问计数:" + count + "\r\n分块编码:" + strlevel + "级 " + strrow + "行 " + strcol + "列";
        //string info = time + "\r\n远程用户:" + remoteIp + "\r\n" + requestData + "\r\n" + respHead;
        //try
        //{
        //    MapLog.WriteLine(info + "\r\n");
        //}
        //catch (Exception)
        //{

        //}
    }

    private void GetTddata2(HttpContext context)
    {
        string soapaddr = GetDCS();

        HttpRequest req = context.Request;
        HttpResponse resp = context.Response;

        string method = req.QueryString["method"];
        string classpath = req.QueryString["classpath"];
        if (classpath == null)
        {
            classpath = req.Form["classpath"];
        }

        string filter = null;

        filter = req.QueryString["filter"];

        if (filter == null)
        {
            filter = req.Form["filter"];
        }

        //clear
        resp.Clear();
        resp.ClearHeaders();
        resp.ClearContent();

        //
        if (method.Equals("altitude"))
        {
            string path = MapHelper.GetAltitude(soapaddr, classpath, filter);
            if (path != null)
            {
                resp.StatusCode = 200;
                string isCompress = req.QueryString["Compress"];
                if (isCompress == "true")
                {
                    resp.ContentType = "zip";
                    MemoryStream ms = new MemoryStream();
                    ZipFile zFile = ZipFile.Create(ms);
                    zFile.BeginUpdate();
                    ZipDataSource ds = new ZipDataSource(path);
                    zFile.Add(ds, Path.GetFileName(path));
                    zFile.CommitUpdate();
                    zFile.Close();
                    ms.Close();

                    resp.OutputStream.Write(ms.ToArray(), 0, ms.ToArray().Length);
                }
                else
                {
                    byte[] buffer = File.ReadAllBytes(path);
                    resp.OutputStream.Write(buffer, 0, buffer.Length);
                }
            }
            else
            {
                resp.StatusCode = 404;
            }
        }
        else
        {
            try
            {
                byte[] tddata = MapHelper.GetTDData(soapaddr, method, classpath, filter);
                if (tddata != null)
                {
                    if (tddata.Length == 0)
                    {
                        resp.StatusCode = 200;
                    }
                    else
                    {
                        resp.ContentType = "text/xml";
                        resp.StatusCode = 200;
                        resp.OutputStream.Write(tddata, 0, tddata.Length);
                    }
                }
                else
                {
                    resp.StatusCode = 404;
                }
            }
            catch (Exception tdata)
            {
                resp.StatusCode = 404;
            }

            if (method.Equals("FeatAttr2"))
            {
                string[] tmp = classpath.Split(';');
                if (tmp.Length == 3)
                {
                    string mapName = tmp[0] + "|" + tmp[1];
                    long count = 0;
                    try
                    {
                        if (dataDic.ContainsKey(mapName))
                        {
                            dataDic.TryGetValue(mapName, out count);
                            count++;
                        }
                        dataDic[mapName] = count;
                    }
                    catch (Exception countEx)
                    {
                        dataDic = new System.Collections.Generic.Dictionary<string, long>();
                        dataDic.Add(mapName, count);
                    }

                    string time = DateTime.Now.ToString();
                    string respHead = "本次连接状态:" + resp.StatusCode + " " + resp.StatusDescription;
                    string remoteIp = req.UserHostAddress;
                    string requestData = "查询数据:" + mapName + "\r\n本次服务器开机该数据访问计数:" + count;
                    string info = time + "\r\n远程用户:" + remoteIp + "\r\n" + requestData + "\r\n" + respHead;
                    try
                    {
                        TddataLog.WriteLine(info + "\r\n");
                    }
                    catch (Exception ioe)
                    {

                    }
                }
            }
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    private void InitialLog()
    {
        int lastN = new Random().Next(100);
        if (MapLog == null)
        {
            string newfilename = ConfigurationManager.AppSettings["LogPath"] + DateTime.Now.ToLongDateString() + "地图服务" + lastN + ".log";
            MapLog = new MTWFile(newfilename);
            MapLog.Create(newfilename);
        }
        else
        {
            string filename = MapLog.FileName;
            if (!File.Exists(filename))
            {
                MapLog.Create(filename);
            }
            if (MapLog.fLength > 1000000000)
            {
                string newfilename = ConfigurationManager.AppSettings["LogPath"] + DateTime.Now.ToLongDateString() + "地图服务" + lastN + ".log";
                MapLog = new MTWFile(newfilename);
                MapLog.Create(newfilename);
            }
        }
        if (TddataLog == null)
        {
            string newfilename = ConfigurationManager.AppSettings["LogPath"] + DateTime.Now.ToLongDateString() + "查询服务" + lastN + ".log";
            TddataLog = new MTWFile(newfilename);
            TddataLog.Create(newfilename);
        }
        else
        {
            string filename = TddataLog.FileName;
            if (!File.Exists(filename))
            {
                TddataLog.Create(filename);
            }
            if (TddataLog.fLength > 1000000000)
            {
                string newfilename = ConfigurationManager.AppSettings["LogPath"] + DateTime.Now.ToLongDateString() + "查询服务" + lastN + ".log";
                TddataLog = new MTWFile(newfilename);
                TddataLog.Create(newfilename);
            }
        }
        if (ExceptionLog == null)
        {
            string newfilename = ConfigurationManager.AppSettings["LogPath"] + DateTime.Now.ToLongDateString() + "异常日志" + lastN + ".log";
            ExceptionLog = new MTWFile(newfilename);
            ExceptionLog.Create(newfilename);
        }
        else
        {
            string filename = TddataLog.FileName;
            if (!File.Exists(filename))
            {
                ExceptionLog.Create(filename);
            }
            if (TddataLog.fLength > 1000000000)
            {
                string newfilename = ConfigurationManager.AppSettings["LogPath"] + DateTime.Now.ToLongDateString() + "异常日志" + lastN + ".log";
                ExceptionLog = new MTWFile(newfilename);
                ExceptionLog.Create(newfilename);
            }
        }
    }

    //private string GetDCS()
    //{
    //    string DCSAddress1 = ConfigurationManager.AppSettings["DCServerBalance1"];
    //    string requestUrl = DCSAddress1 + "/rest/cls/server/url?";//    http://192.168.10.5:8081/dcs/rest/cls/server/url?
    //    try
    //    {
    //        HttpWebRequest requestTest = (HttpWebRequest)WebRequest.Create(requestUrl);
    //        requestTest.Timeout = 1000;
    //        HttpWebResponse response = null;
    //        using (response = requestTest.GetResponse() as HttpWebResponse)
    //        {
    //            Stream stream = response.GetResponseStream();
    //            if (stream != null)
    //            {
    //                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
    //                {
    //                    string DCSAddress = reader.ReadToEnd();
    //                    DCSAddress = DCSAddress + "/dcs/soap/dws";
    //                    return DCSAddress;
    //                }
    //            }
    //        }
    //    }
    //    catch (Exception)
    //    {
    //        ExceptionLog.WriteLine("读取端口配置不正常");
    //    }
    //    return DCSAddress1;
    //}

    //http://192.168.10.5:8081/dcs/soap/dws
    private string GetDCS()
    {
        string DCSAddress = ConfigurationManager.AppSettings["DCServerSoapAddress"];
        string DCSNumber = ConfigurationManager.AppSettings["DCServerNumber"];
        int s = 1;
        try
        {
            int num = Int32.Parse(DCSNumber) + 1;
            Random r = new Random();
            s = r.Next(1, num);
        }
        catch (Exception e)
        {
            ExceptionLog.WriteLine("读取端口配置不正常");
        }
        string configNumber = "DCServerBalance" + s.ToString();
        try
        {
            string JumpDCS = ConfigurationManager.AppSettings[configNumber] + "/soap/dws";
            HttpWebRequest requestTest = (HttpWebRequest)WebRequest.Create(JumpDCS + "?wsdl");
            requestTest.Timeout = 1000;
            HttpWebResponse response = null;
            using (response = requestTest.GetResponse() as HttpWebResponse)
            {
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    DCSAddress = JumpDCS;
                }
            }
        }
        catch (Exception)
        {
        }
        return DCSAddress;
    }
}




