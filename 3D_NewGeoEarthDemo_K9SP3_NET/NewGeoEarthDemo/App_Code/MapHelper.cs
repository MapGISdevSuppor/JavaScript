using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Drawing;
using System.IO;
using System.Net;
/// <summary>
/// MapHelper 的摘要说明
/// </summary>
public class MapHelper
{
    //优化等级
    static int UP_LEVLE = 1;

    //level0 瓦块尺寸
    static double LEVEL0_TILE_SIZE = 45.0;

    //
    static int Timeout = 100000;
    
    //
    static public string GetMap(string dwsUrl, string docName, string mapName, int level, int row, int col, int size, string format)
    {
        string FolderPath = ConfigurationManager.AppSettings["CachePath"].ToString() +
                "\\" + size + "\\" + docName + "\\" + mapName + "\\" + level;
        string path = FolderPath + "\\" + row + "_" + col + ".png";

        //查找缓存
        FileInfo f = new FileInfo(path);
        if (f.Exists)
        {
            if (f.Length == 0 || f.Length == 1275)
            {
                return "empty";
            }
            return path;
        }

        //计算绘制等级，行列号，和范围
        int uplevel = UP_LEVLE;

        int drawLevel = level - uplevel;
        double drawSize = LEVEL0_TILE_SIZE / Math.Pow(2, level);
        int drawPixelSize = size;
        int drawRow = row;
        int drawCol = col;

        while (uplevel-- > 0)
        {
            drawRow /= 2;
            drawCol /= 2;
            drawSize *= 2;
            drawPixelSize *= 2;
        }

        //构造绘制块Key
        string drawKey =
            "/DCSMap/" + size +
            "/" + docName +
            "/" + mapName +
            "/" + drawLevel +
            "/" + drawRow +
            "/" + drawCol;

        //
        string filepath = null;

        //
        try
        {
            LockKey.Lock(drawKey);

            //计算范围
            double xmin = -180 + (drawCol * drawSize);
            double ymin = -90 + (drawRow * drawSize);
            double xmax = xmin + drawSize;
            double ymax = ymin + drawSize;

            //
            string box = xmin + "," + ymin + "," + xmax + "," + ymax;

            //
            DWS.dwService dws = new DWS.dwService();
            dws.Url = dwsUrl;
            //DWS.MapQuery query = new DWS.MapQuery();
            //query.box = box;
            //query.format = format;
            //query.classPath = "";
            //query.mapDoc = docName;
            //query.mapName = mapName;
            //query.col = -1;
            //query.row = -1;
            //query.level = 0;
            //query.useTile = false;
            //query.width = drawPixelSize;
            //query.height = drawPixelSize;

            DWS.MapQuery query = new DWS.MapQuery();
            query.format = "png";
            query.classPath = "";
            query.mapDoc = docName;
            query.mapName = mapName;
            query.col = col;
            query.row = row;
            query.level = (short)level;
            query.useTile = true;
            query.width = 256;
            query.height = 256;

           
            //开始绘制
            DWS.MapInfo mi = dws.getMap(query);

            //创建文件夹
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }

            //绘制成功
            if (mi.isSuccess && mi.image != null)
            {
                //开始的行列号
                int sRow = drawRow;
                int sCol = drawCol;

                //瓦块行列数目
                int rowNum = 1;
                int colNum = 1;

                uplevel = UP_LEVLE;
                while (uplevel-- > 0)
                {
                    sRow *= 2;
                    sCol *= 2;

                    rowNum *= 2;
                    colNum *= 2;
                }

                // hack, 850 byte and 6120 byte is empty
                if (mi.image.Length == 850 && mi.image.Length == 24072)
                {
                    // 记录缓存
                    for (int nr = 0; nr < rowNum; ++nr)
                    {
                        for (int nc = 0; nc < colNum; ++nc)
                        {
                            //string tilepath = FolderPath + "/" + row + "_" + col + ".png";
                            string tilepath = FolderPath + "/" + (sRow + nr) + "_" + (sCol + nc) + ".png";
                            FileStream fs = File.Open(tilepath, FileMode.CreateNew);
                            fs.Close();
                        }
                    }
                }
                else
                {
                    //请求到的图片
                    MemoryStream stream = new MemoryStream(mi.image);
                    Bitmap fullimage = new Bitmap(stream);

                    //
                    Bitmap bmp = new Bitmap(size, size);
                    Graphics g = Graphics.FromImage(bmp);

                    //
                    Rectangle destRect = new Rectangle(0, 0, size, size);
                    Rectangle srcRect = new Rectangle(0, 0, size, size);

                    //分割图片
                    for (int nr = 0; nr < rowNum; ++nr)
                    {
                        for (int nc = 0; nc < colNum; ++nc)
                        {
                            g.Clear(System.Drawing.Color.Transparent);

                            srcRect.X = nc * size;
                            srcRect.Y = drawPixelSize - (nr * size) - size;
                            g.DrawImage(fullimage, destRect, srcRect, GraphicsUnit.Pixel);

                            //
                            string tilepath = FolderPath + "/" + (sRow + nr) + "_" + (sCol + nc) + ".png";
                            try
                            {
                                File.Delete(tilepath);
                                bmp.Save(tilepath);
                            }
                            catch (Exception)
                            {
                            }
                        }
                    }
                }

                filepath = path;
            }
            else
            {
                // error
                filepath = null;
            }
        }
        catch (Exception)
        {
            filepath = null;
        }
        finally
        {
            LockKey.UnLock(drawKey);
        }

        return filepath;
    }
    static public string GetMetadataMap(string dwsUrl, string metadataID, string classpath, int level, int row, int col, int size, string format)
    {
        string FolderPath = ConfigurationManager.AppSettings["CachePath"].ToString() +
                "\\" + size + "\\" + metadataID + "\\" + level;
        string path = FolderPath + "\\" + row + "_" + col + ".png";

        //查找缓存
        FileInfo f = new FileInfo(path);
        if (f.Exists)
        {
            if (f.Length == 0 || f.Length == 1275)
            {
                return "empty";
            }
            return path;
        }

        //计算绘制等级，行列号，和范围
        int uplevel = UP_LEVLE;

        int drawLevel = level - uplevel;
        double drawSize = LEVEL0_TILE_SIZE / Math.Pow(2, level);
        int drawPixelSize = size;
        int drawRow = row;
        int drawCol = col;

        while (uplevel-- > 0)
        {
            drawRow /= 2;
            drawCol /= 2;
            drawSize *= 2;
            drawPixelSize *= 2;
        }

        //构造绘制块Key
        string drawKey =
            "/DCSMap/" + size +
            "/" + metadataID +
            "/" + drawLevel +
            "/" + drawRow +
            "/" + drawCol;

        //
        string filepath = null;

        //
        try
        {
            LockKey.Lock(drawKey);

            //计算范围
            double xmin = -180 + (drawCol * drawSize);
            double ymin = -90 + (drawRow * drawSize);
            double xmax = xmin + drawSize;
            double ymax = ymin + drawSize;

            //
            string box = xmin + "," + ymin + "," + xmax + "," + ymax;

            //
            DWS.dwService dws = new DWS.dwService();
            dws.Url = dwsUrl;
            DWS.MapQuery query = new DWS.MapQuery();
            query.box = box;
            query.format = format;
            query.classPath = classpath;
            //query.mapDoc = docName;
            //query.mapName = mapName;
            //query.col = -1;
            //query.row = -1;
            //query.level = 0;
            query.useTile = false;
            query.width = drawPixelSize;
            query.height = drawPixelSize;

            //开始绘制
            DWS.MapInfo mi = dws.getMap(query);

            //创建文件夹
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }

            //绘制成功
            if (mi.isSuccess && mi.image != null)
            {
                //开始的行列号
                int sRow = drawRow;
                int sCol = drawCol;

                //瓦块行列数目
                int rowNum = 1;
                int colNum = 1;

                uplevel = UP_LEVLE;
                while (uplevel-- > 0)
                {
                    sRow *= 2;
                    sCol *= 2;

                    rowNum *= 2;
                    colNum *= 2;
                }

                // hack, 850 byte and 6120 byte is empty
                if (mi.image.Length == 850 && mi.image.Length == 24072)
                {
                    // 记录缓存
                    for (int nr = 0; nr < rowNum; ++nr)
                    {
                        for (int nc = 0; nc < colNum; ++nc)
                        {
                            string tilepath = FolderPath + "/" + (sRow + nr) + "_" + (sCol + nc) + ".png";
                            FileStream fs = File.Open(tilepath, FileMode.CreateNew);
                            fs.Close();
                        }
                    }
                }
                else
                {
                    //请求到的图片
                    MemoryStream stream = new MemoryStream(mi.image);
                    Bitmap fullimage = new Bitmap(stream);

                    //
                    Bitmap bmp = new Bitmap(size, size);
                    Graphics g = Graphics.FromImage(bmp);

                    //
                    Rectangle destRect = new Rectangle(0, 0, size, size);
                    Rectangle srcRect = new Rectangle(0, 0, size, size);

                    //分割图片
                    for (int nr = 0; nr < rowNum; ++nr)
                    {
                        for (int nc = 0; nc < colNum; ++nc)
                        {
                            g.Clear(System.Drawing.Color.Transparent);

                            srcRect.X = nc * size;
                            srcRect.Y = drawPixelSize - (nr * size) - size;
                            g.DrawImage(fullimage, destRect, srcRect, GraphicsUnit.Pixel);

                            //
                            string tilepath = FolderPath + "/" + (sRow + nr) + "_" + (sCol + nc) + ".png";
                            try
                            {
                                File.Delete(tilepath);
                                bmp.Save(tilepath);
                            }
                            catch (Exception)
                            {
                            }
                        }
                    }
                }

                filepath = path;
            }
            else
            {
                // error
                filepath = null;
            }
        }
        catch (Exception)
        {
            filepath = null;
        }
        finally
        {
            LockKey.UnLock(drawKey);
        }

        return filepath;
    }

    static public string GetTDTLayerName(string layer, int tdtlevel)
    {
        string tdtlayer = null;
        if (layer == "Image")//影像
        {
            switch (tdtlevel)
            {
                case 0:
                case 1:
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    tdtlayer = "sbsm0210";
                    break;
                case 11:
                    tdtlayer = "e11";
                    break;
                case 12:
                    tdtlayer = "e12";
                    break;
                case 13:
                    tdtlayer = "e13";
                    break;
                case 14:
                    tdtlayer = "eastdawnall";
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                    tdtlayer = "sbsm1518";
                    break;
                default:
                    tdtlayer = "sbsm0210";
                    break;
            }
        }
        else if (layer == "ImageAnno")//影像注记
        {
            switch (tdtlevel)
            {
                case 0:
                case 1:
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    tdtlayer = "A0610_ImgAnno";
                    break;
                case 8:
                case 9:
                case 10:
                    tdtlayer = "A0610_ImgAnno";
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                    tdtlayer = "B0530_eImgAnno";
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                    tdtlayer = "siweiAnno68";
                    break;
            }
        }
        else if (layer == "Map")//地图
        {
            switch (tdtlevel)
            {
                case 0:
                case 1:
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    tdtlayer = "A0512_EMap";
                    break;
                case 8:
                case 9:
                case 10:
                    tdtlayer = "A0512_EMap";
                    break;
                case 11:
                case 12:
                    tdtlayer = "B0627_EMap1112";
                    break;
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                    tdtlayer = "siwei0608";
                    break;
            }
        }
        else if (layer == "MapAnno")//地图注记
        {
            switch (tdtlevel)
            {
                case 0:
                case 1:
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    tdtlayer = "AB0512_Anno";
                    break;
                case 8:
                case 9:
                case 10:
                    tdtlayer = "AB0512_Anno";
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                    break;
            }
        }

        return tdtlayer;
    }

    static public string GetTDT(string layer, int level, int row, int col)
    {
        //过滤平面8-13列的请求
        int maxCol = 8 * (int)Math.Pow(2, level);
        if (col >= maxCol)
        {
            return null;
        }
        int tdtlevel = level + 3;
        string tdtlayer = layer;
        //string tdtlayer = GetTDTLayerName(layer, tdtlevel);
        if (tdtlayer == null) return null;

        //
        string FolderPath = ConfigurationManager.AppSettings["CachePath"] +
            "\\256\\TDTSource" + "\\" + layer + "\\" + level;
        string path = FolderPath + "\\" + row + "_" + col + ".png";
        if (File.Exists(path))
        {
            return path;
        }

        //构造绘制块Key
        string drawKey =
            "/TDTImage/256" +
            "/" + layer +
            "/" + level +
            "/" + row +
            "/" + col;

        try
        {
            //
            LockKey.Lock(drawKey);

            //创建文件夹
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }

            //天地图第3级行列号
            int tdtrownum = 4;
            int tdtcolnum = 8;

            int tl = level;
            while (tl-- > 0)
            {
                tdtrownum *= 2;
                tdtcolnum *= 2;
            }

            int tdtrow = tdtrownum - row - 1;
            int tdtcol = col;

            Random r = new Random();
            int ser = r.Next(8);
            //string url1 = "http://tile" + ser + ".tianditu.com/DataServer?T=" + tdtlayer + "&X=" + tdtcol + "&Y=" + tdtrow + "&L=" + tdtlevel;
            string url1 ="";
            switch(tdtlayer)
            {
                case "img_c": url1 = "http://t" + ser + ".tianditu.cn/" + tdtlayer + "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + tdtlevel + "&TILEROW=" + tdtrow + "&TILECOL=" + tdtcol + "&FORMAT=tiles";break;
                case "vec_c": url1 = "http://t" + ser + ".tianditu.cn/" + tdtlayer + "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + tdtlevel + "&TILEROW=" + tdtrow + "&TILECOL=" + tdtcol + "&FORMAT=tiles"; break;
                case "cva_c": url1 = "http://t" + ser + ".tianditu.cn/" + tdtlayer + "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + tdtlevel + "&TILEROW=" + tdtrow + "&TILECOL=" + tdtcol + "&FORMAT=tiles"; break;
                case "X0110_ZL_GJ":
                case "X0110_ZL_SJ": url1 = "http://t" + ser + ".tianditu.cn/DataServer?T=bou_c&X=" + tdtcol + "&Y=" + tdtrow + "&L=" + tdtlevel + ""; break;
                case "W1103_TMap":
                    url1 = "http://t" + ser + ".tianditu.cn/DataServer?T=wat_c&X=" + tdtcol + "&Y=" + tdtrow + "&L=" + tdtlevel + ""; break;
            }
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url1);
                request.Timeout = Timeout;
                HttpWebResponse response = null;
                using (response = request.GetResponse() as HttpWebResponse)
                {
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        int len = (int)response.ContentLength;
                        if (len == 2407)
                        {
                            path = null;
                            //return "empty";
                        }
                        else
                        {
                            using (Stream responseStream = response.GetResponseStream())
                            {
                                BinaryReader reader = new BinaryReader(responseStream);
                                byte[] byteArry = reader.ReadBytes(len);

                                FileStream fs = File.Open(path, FileMode.Create);
                                fs.Write(byteArry, 0, byteArry.Length);
                                fs.Close();
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                path = null;
            }

        }
        catch (Exception)
        {
            path = null;
        }
        finally
        {
            LockKey.UnLock(drawKey);
        }


        return path;
    }

    static public string GetAltitude(string dwsUrl, string classpath, string filter)
    {
        string path = null;
        try
        {
            string[] tmp = filter.Split(',');
            string level = tmp[2].Split(':')[1];
            string row = tmp[0].Split(':')[1];
            string col = tmp[1].Split(':')[1];
            string sample = tmp[7].Split(':')[1];
            string xmax = tmp[3].Split(':')[1];
            string xmin = tmp[4].Split(':')[1];
            string ymin = tmp[5].Split(':')[1];
            string ymax = tmp[6].Split(':')[1];
            filter = "row:" + row + ",col:" + col + ",level:" + level + ",xmax:" + xmax + ",xmin:" + xmin + ",ymin:" + ymin + ",ymax:" + ymax + ",sample:" + sample;
            string safeclasspath = Uri.EscapeDataString(classpath);

            string FolderPath = ConfigurationManager.AppSettings["DEMCachePath"].ToString() +
                "/" + sample + "/" + safeclasspath + "/" + level;
            path = FolderPath + "/" + row + "_" + col + ".db";
            if (File.Exists(path))
            {
                return path;
            }
            //创建文件夹
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }

            string getKey =
                "/DCSDem/" + sample +
                "/" + classpath +
                "/" + level +
                "/" + row +
                "/" + col;

            LockKey.Lock(getKey);

            try
            {
                byte[] dem = GetTDData(dwsUrl, "altitude", classpath, filter);
                if (dem != null)
                {
                    FileStream fs = File.Open(path, FileMode.Create);
                    fs.Write(dem, 0, dem.Length);
                    fs.Close();

                    return path;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                path = null;
            }

            finally
            {
                LockKey.UnLock(getKey);
            }
        }
        catch (Exception)
        {
            path = null;
        }

        return path;
    }

    static public byte[] GetTDData(string dwsUrl, string method, string classpath, string filter)
    {
        byte[] tddata = null;
        try
        {
            DWS.dwService dws = new DWS.dwService();
            dws.Url = dwsUrl;
            DWS.TDDataQuery query = new DWS.TDDataQuery();

            query.method = method;
            query.classpath = classpath;
            query.filter = filter;

            DWS.TDDataInfo info = dws.getTDData(query);
            if (info.isSuccess && info.reValue != null)
            {
                tddata = info.reValue;
            }
        }
        catch (Exception)
        {
        }

        return tddata;
    }
    static String GetMapBoxLock = "lk";
    static public Bitmap GetMapByBox(string dwsUrl, string docName, string mapName, double xmin, double xmax, double ymin, double ymax, int width, int height, int size, string format)
    {
        double pd = size / LEVEL0_TILE_SIZE;
        double scale1 = (height / (ymax - ymin));
        double scale2 = (width / (xmax - xmin));
        int earthScale = (int)((scale1 + scale2) / 2);
        int l = 0;
        double[] VisibleScale = new double[10];
        for (int i = 0; i < 10; i++)
        {
            VisibleScale[i] = (size * Math.Pow(2, i) / LEVEL0_TILE_SIZE);
        }
        for (int i = 0; i < 10; i++)
        {
            if (earthScale < VisibleScale[i])
            {
                break;
            }
            if (earthScale > VisibleScale[i])
            {
                l++;
            }
        }
        switch (l)
        {
            case 1:
                {
                    height *= 10;
                    width *= 10;
                    break;
                }
            case 2:
                {
                    height *= 5;
                    width *= 5;
                    break;
                }
            case 3:
                {
                    height *= 3;
                    width *= 3;
                    break;
                }
            default:
                break;
        }

        int row1 = (int)((ymin + 90) * Math.Pow(2, l) / 45);
        int row2 = (int)((ymax + 90) * Math.Pow(2, l) / 45);
        int col1 = (int)((xmin + 180) * Math.Pow(2, l) / 45);
        int col2 = (int)((xmax + 180) * Math.Pow(2, l) / 45);
        int h = (row2 - row1 + 1) * size;
        int w = (col2 - col1 + 1) * size;

        Bitmap fullmap = null;
        try
        {
            fullmap = new Bitmap(w, h);
        }
        catch (Exception)
        {
        }

        Graphics g = Graphics.FromImage(fullmap);
        g.Clear(System.Drawing.Color.Transparent);
        RectangleF srcRectF = new RectangleF(0, 0, size, size);
        for (int r = row1; r <= row2; r++)
        {
            for (int c = col1; c <= col2; c++)
            {
                string path = GetMap(dwsUrl, docName, mapName, l, r, c, size, format);
                float y = (r - row1) * size;
                float x = (c - col1) * size;
                RectangleF destRect = new RectangleF(x, h - y - size, size, size);
                Bitmap b = null;
                if (path == "empty" || path == null)
                {
                    b = new Bitmap(size, size);
                    Graphics g2 = Graphics.FromImage(b);
                    g2.Clear(System.Drawing.Color.Transparent);
                }
                else
                {
                    //水印
                    b = watermark(path);
                    //b = new Bitmap(path);
                }
                g.DrawImage(b, destRect, srcRectF, GraphicsUnit.Pixel);
            }
        }
        double d = LEVEL0_TILE_SIZE / Math.Pow(2, l);
        double xi = -180 + (col1 * d);
        double yi = -90 + (row1 * d);
        double xa = -180 + (col2 + 1) * d;
        double ya = -90 + (row2 + 1) * d;

        float x1 = (float)width;
        float y1 = (float)height;
        x1 = (float)((size / d) * (xmin - xi));
        y1 = (float)((size / d) * (ya - ymax));


        Bitmap b4 = new Bitmap(width, height);
        RectangleF destRect1 = new RectangleF(0, 0, width, height);

        double scale3 = size / d;
        float width2 = (float)(scale3 * (xmax - xmin));
        float height2 = (float)(scale3 * (ymax - ymin));

        RectangleF srcRectF1 = new RectangleF(x1, y1, width2, height2);
        Graphics g1 = Graphics.FromImage(b4);
        g1.DrawImage(fullmap, destRect1, srcRectF1, GraphicsUnit.Pixel);
        return b4;
    }
    static public Bitmap GetMetadataMapByBox(string dwsUrl, string metadataId, string classpath, double xmin, double xmax, double ymin, double ymax, int width, int height, int size, string format)
    {
        double pd = size / LEVEL0_TILE_SIZE;
        double scale1 = (height / (ymax - ymin));
        double scale2 = (width / (xmax - xmin));
        int earthScale = (int)((scale1 + scale2) / 2);
        int l = 0;
        double[] VisibleScale = new double[10];
        for (int i = 0; i < 10; i++)
        {
            VisibleScale[i] = (size * Math.Pow(2, i) / LEVEL0_TILE_SIZE);
        }
        for (int i = 0; i < 10; i++)
        {
            if (earthScale < VisibleScale[i])
            {
                break;
            }
            if (earthScale > VisibleScale[i])
            {
                l++;
            }
        }
        if (height < 512 || width < 512)
        {
            switch (l)
            {
                case 1:
                    {
                        height *= 10;
                        width *= 10;
                        break;
                    }
                case 2:
                    {
                        //height *= 5;
                        //width *= 5;
                        break;
                    }
                case 3:
                    {
                        height *= 3;
                        width *= 3;
                        break;
                    }
                default:
                    break;
            }
        }


        int row1 = (int)((ymin + 90) * Math.Pow(2, l) / 45);
        int row2 = (int)((ymax + 90) * Math.Pow(2, l) / 45);
        int col1 = (int)((xmin + 180) * Math.Pow(2, l) / 45);
        int col2 = (int)((xmax + 180) * Math.Pow(2, l) / 45);
        int h = (row2 - row1 + 1) * size;
        int w = (col2 - col1 + 1) * size;
        Bitmap fullmap = null;
        Graphics g = null;
        //return new Bitmap(256*8, 256*8);
        try
        {
            fullmap = new Bitmap(w, h);
            g = Graphics.FromImage(fullmap);
        }
        catch (Exception maperror)
        {
            //return new Bitmap(256, 256);
        }
        if (fullmap == null)
        {
            return new Bitmap(@"C:\tmp\cgs1.png");
        }
        g.Clear(System.Drawing.Color.Transparent);
        RectangleF srcRectF = new RectangleF(0, 0, size, size);
        for (int r = row1; r <= row2; r++)
        {
            for (int c = col1; c <= col2; c++)
            {
                string path = GetMetadataMap(dwsUrl, metadataId, classpath, l, r, c, size, format);
                float y = (r - row1) * size;
                float x = (c - col1) * size;
                RectangleF destRect = new RectangleF(x, h - y - size, size, size);
                Bitmap b = null;
                if (path == "empty" || path == null)
                {
                    b = new Bitmap(size, size);
                    Graphics g2 = Graphics.FromImage(b);
                    g2.Clear(System.Drawing.Color.Transparent);
                }
                else
                {
                    //水印
                    //b = watermark(path);
                    b = new Bitmap(path);
                }
                g.DrawImage(b, destRect, srcRectF, GraphicsUnit.Pixel);
            }
        }

        double d = LEVEL0_TILE_SIZE / Math.Pow(2, l);
        double xi = -180 + (col1 * d);
        double yi = -90 + (row1 * d);
        double xa = -180 + (col2 + 1) * d;
        double ya = -90 + (row2 + 1) * d;

        float x1 = (float)width;
        float y1 = (float)height;
        x1 = (float)((size / d) * (xmin - xi));
        y1 = (float)((size / d) * (ya - ymax));


        Bitmap b4 = new Bitmap(width, height);
        RectangleF destRect1 = new RectangleF(0, 0, width, height);

        double scale3 = size / d;
        float width2 = (float)(scale3 * (xmax - xmin));
        float height2 = (float)(scale3 * (ymax - ymin));

        RectangleF srcRectF1 = new RectangleF(x1, y1, width2, height2);
        Graphics g1 = Graphics.FromImage(b4);
        g1.DrawImage(fullmap, destRect1, srcRectF1, GraphicsUnit.Pixel);
        return b4;
    }
    static private Bitmap watermark(string path)
    {
        string suiyi = ConfigurationManager.AppSettings["Watermark"];
        if (suiyi == null)
        {
            return null;
        }
        System.Drawing.Image image = System.Drawing.Image.FromFile(path);
        Bitmap b = new Bitmap(image.Width, image.Height);
        Graphics g = Graphics.FromImage(b);
        g.Clear(Color.Transparent);
        g.DrawImage(image, 0, 0, image.Width, image.Height);

        System.Drawing.Image watermark = new Bitmap(suiyi);

        System.Drawing.Imaging.ImageAttributes imageAttributes = new System.Drawing.Imaging.ImageAttributes();
        System.Drawing.Imaging.ColorMap colorMap = new System.Drawing.Imaging.ColorMap();
        colorMap.OldColor = Color.FromArgb(255, 0, 255, 0);
        colorMap.NewColor = Color.FromArgb(0, 0, 0, 0);
        System.Drawing.Imaging.ColorMap[] remapTable = { colorMap };
        imageAttributes.SetRemapTable(remapTable, System.Drawing.Imaging.ColorAdjustType.Bitmap);
        float[][] colorMatrixElements = {
              new float[] {1.0f, 0.0f, 0.0f, 0.0f, 0.0f},
              new float[] {0.0f, 1.0f, 0.0f, 0.0f, 0.0f},
              new float[] {0.0f, 0.0f, 1.0f, 0.0f, 0.0f},
              new float[] {0.0f, 0.0f, 0.0f, 0.2f, 0.0f},
              new float[] {0.0f, 0.0f, 0.0f, 0.0f, 1.0f}
             };
        System.Drawing.Imaging.ColorMatrix colorMatrix = new System.Drawing.Imaging.ColorMatrix(colorMatrixElements);
        imageAttributes.SetColorMatrix(colorMatrix, System.Drawing.Imaging.ColorMatrixFlag.Default, System.Drawing.Imaging.ColorAdjustType.Bitmap);
        int xpos = 0;
        int ypos = 0;

        xpos = ((image.Width - watermark.Width) - 0);
        ypos = image.Height - watermark.Height - 0;
        g.DrawImage(watermark, new Rectangle(xpos, ypos, watermark.Width, watermark.Height), 0, 0, watermark.Width, watermark.Height, GraphicsUnit.Pixel, imageAttributes);

        watermark.Dispose();
        imageAttributes.Dispose();
        return b;
    }

    private class LockKey
    {
        // 哈希表
        static private System.Collections.Hashtable mKeys = new System.Collections.Hashtable();

        //
        static public void Lock(string key)
        {
            while (true)
            {
                bool bOK = false;
                lock (mKeys.SyncRoot)
                {
                    if (!mKeys.Contains(key))
                    {
                        mKeys.Add(key, null);
                        bOK = true;
                    }
                }

                if (bOK)
                {
                    // ok
                    break;
                }
                else
                {
                    //等待 100 ms
                    System.Threading.Thread.Sleep(100);
                }
            }
        }

        static public void UnLock(string key)
        {
            lock (mKeys.SyncRoot)
            {
                mKeys.Remove(key);
            }
        }
    }
}
