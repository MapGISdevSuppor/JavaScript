<%@ WebHandler Language="C#" Class="Maps" %>

using System;
using System.Web;
using System.Text;
using System.Data.Common;
using System.IO;
using System.Xml;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Text.RegularExpressions;
using System.Web.SessionState;
using MapgisWSClient;

public class Maps : IHttpHandler,IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        if (HttpContext.Current == null)
        {
            throw new NullReferenceException("The context is not set correct in ProcessRequest().");
        }
        string strMethod = context.Request["_method"];
        string key = "";
        switch (strMethod)
        {
            case "QueryByWords"://模糊查询
                key = Regex.Unescape(context.Request["key"]);
                QueryByWords(key);
                break;
            case "busstopquery"://公交查询下拉框提示
                string stopvalue = context.Request["stopvalue"].ToString();
                string cityname = context.Request["cityname"].ToString();
                busstopquery(stopvalue, cityname);
                break;
            case "SelfCarQuery": //驾车路线的 下拉框选起点或终点
                string StationValue = context.Request["stopvalue"].ToString();
                string CityName = context.Request["cityname"].ToString();
                SelfCarQuery(StationValue, CityName);
                break;
            case "GetBusWay":
                string staPos = context.Request["staPos"].ToString();
                string endPos = context.Request["endPos"].ToString();
                string coordinate = "";
                BusCom busObj = new BusCom();
                busObj.SetServerIP(ConfigurationManager.AppSettings["ip"]);
                busObj.GetChangeRlt(staPos, endPos, out coordinate, OutputType.str);
                HttpContext.Current.Response.Write(coordinate);
                break;
            case "GetDriveWay": //驾车路径分析
                string sta = context.Request["sta"];
                string end = context.Request["end"];
                int backFlag = Convert.ToInt32(ConfigurationManager.AppSettings["backFlag"]);
                double px = 10;
                CNetPathAnaly pathObj = new CNetPathAnaly();
                string[] co1 = querycoor(sta).Split(',');
                string[] co2 = querycoor(end).Split(',');
                Dot_2D[] dot = new Dot_2D[2];
                dot[0] = new Dot_2D();
                dot[0].x = Convert.ToDouble(co1[0]);
                dot[0].y = Convert.ToDouble(co1[1]);
                dot[1] = new Dot_2D();
                dot[1].x = Convert.ToDouble(co2[0]);
                dot[1].y = Convert.ToDouble(co2[1]);
                CPathAnalyzeResult rlt = null;
                string str = "";
                try
                {
                    pathObj.SetServerIP(ConfigurationManager.AppSettings["ip"]);
                    rlt = pathObj.GetPathAnalyseRlt(dot, ConfigurationManager.AppSettings["netName"], px, backFlag, EncodeType.escape, FlgType.line);
                    str = GetPathInfo(rlt);
                }
                catch(Exception ex)
                {
                    str = "没有查到路线";
                }
                HttpContext.Current.Response.Write(str);
                break;
            case "GetMapLayerList"://获取图层列表
                MapSetting ms = new MapSetting();
                string type = context.Request.QueryString["mapType"];
                context.Response.Write(ms.GetLayerListByJSON(type));
                break;
            case "UpdateMap"://更新地图文档
                ms = new MapSetting();
                ms.UpdateMap(context.Request.Form.ToString());
                break;
            case "CheckAnalRlt":
                ms = new MapSetting();
                MapgisWSClient.CSingleMapView viewport = (MapgisWSClient.CSingleMapView)context.Session["viewport"];
                string uid = context.Request.QueryString["uid"];
                context.Response.Write(viewport.GetAnalyseResult(uid));
                break;
            default:
                break;
        }
    }

    public double[] StrToDouble(string strArray)
    {
        string[] strTemp = strArray.Split(',');
        double[] douTemp = new double[strTemp.Length];
        for (int i = 0; i < strTemp.Length; i++)
        {
            douTemp[i] = Convert.ToDouble(strTemp[i]);
        }
        return douTemp;

    }
    public void QueryByWords(string key)
    {
        string path = HttpContext.Current.Server.MapPath(".") + @"\ChineseDictionary.txt";
        ChineseParse cp = new ChineseParse(path);
        ChineseWordUnit[] arryWords = cp.ParseChinese(key);
        GISDataQuery dq = new GISDataQuery(DatabaseType.SQLServer);//定义为SQL数据库


        dq.Open(System.Configuration.ConfigurationManager.AppSettings["CityConStr"]);
        string strCmd = "SELECT PlaceName as N,X,Y,Layer as L from c027 WHERE ";
        for (int i = 0; i < arryWords.Length; i++)
        {
            if (arryWords[i].word != null && arryWords[i].word.Trim() != "")
                strCmd += " PlaceName like '%" + arryWords[i].word + "%' AND";
        }
        string strQuery = strCmd.Substring(0, strCmd.Length - 3);
        string strResultXml = dq.GetDataByCondition(strQuery).GetXml();
        XmlDocument doc = new XmlDocument();
        XmlDeclaration declare = doc.CreateXmlDeclaration("1.0", "GB2312", "yes");
        doc.AppendChild(declare);
        doc.LoadXml(strResultXml);
        dq.Close();
        HttpContext.Current.Response.ContentType = "text/xml";
        HttpContext.Current.Response.Write(doc.InnerXml);
    }

    private void busstopquery(string stopvalue, string cityname)
    {
        string strCmd = "SELECT distinct TOP 8 commonname FROM stop WHERE commonname like '%" + stopvalue + "%'";
        SqlConnection sqlConn = new SqlConnection(ConfigurationSettings.AppSettings["CityConStr"]);
        SqlCommand sqlCmd = new SqlCommand();
        sqlCmd.Connection = sqlConn;
        sqlCmd.CommandText = strCmd;
        SqlDataReader reader = null;
        string strName = "";
        try
        {
            sqlConn.Open();
            reader = sqlCmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    for (int i = 0; i < reader.FieldCount; i++)
                        strName += reader.GetValue(i).ToString() + "$";
                }
                strName = strName.Substring(0, strName.Length - 1);
                HttpContext.Current.Response.Write(strName);
            }
        }
        catch (SqlException sqlEx)
        {
            HttpContext.Current.Response.Write(sqlEx.Message);
        }
        finally
        {
            if (reader != null)
                reader.Close();
            sqlConn.Close();
        }
    }


    private string querycoor(string place)
    {
        string strCmd = "SELECT X,Y FROM C027 WHERE PlaceName ='" + place + " '";
        SqlConnection sqlConn = new SqlConnection(ConfigurationSettings.AppSettings["CityConStr"]);
        SqlCommand sqlCmd = new SqlCommand();
        sqlCmd.Connection = sqlConn;
        sqlCmd.CommandText = strCmd;
        SqlDataReader reader = null;
        string coor = "";
        try
        {
            sqlConn.Open();
            reader = sqlCmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    coor = reader.GetValue(0).ToString() + "," + reader.GetValue(1).ToString();
                }
            }
        }
        catch (SqlException sqlEx)
        {
            HttpContext.Current.Response.Write(sqlEx.Message);
        }
        finally
        {
            if (reader != null)
                reader.Close();
            sqlConn.Close();
        }
        return coor;
    }


    private void SelfCarQuery(string stopvalue, string cityname)
    {
        string[] Cityname = cityname.Split('|');
        string strCmd = "SELECT TOP 8 PlaceName FROM " + Cityname[0] + " WHERE PlaceName like '%" + stopvalue + "%'";
        SqlConnection sqlConn = new SqlConnection(ConfigurationSettings.AppSettings["CityConStr"]);
        SqlCommand sqlCmd = new SqlCommand();
        sqlCmd.Connection = sqlConn;
        sqlCmd.CommandText = strCmd;
        SqlDataReader reader = null;
        string strName = "";
        try
        {
            sqlConn.Open();
            reader = sqlCmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    for (int i = 0; i < reader.FieldCount; i++)
                        strName += reader.GetValue(i).ToString() + "$";
                }
                strName = strName.Substring(0, strName.Length - 1);
                HttpContext.Current.Response.Write(strName);
            }
        }
        catch (SqlException sqlEx)
        {
            HttpContext.Current.Response.Write(sqlEx.Message);
        }
        finally
        {
            if (reader != null)
                reader.Close();
            sqlConn.Close();
        }
    }
    /// <summary>
    /// 根据路径分析结果获取线属性信息和空间信息。
    /// </summary>
    /// <param name="pathResult">路径分析结果</param>
    /// <returns></returns>
    public string GetPathInfo(CPathAnalyzeResult pathResult)
    {
        string roads = "";
        //获取路径分析结果
        if (pathResult == null || pathResult.Paths == null || pathResult.Paths.Length < 1)
            return roads;
        CNetPath[] netPath = pathResult.Paths;
        CNetEdge[] arcline = netPath[0].Edges;
        //弧段条数
        int pathNum = arcline.Length;
        if (pathNum == 0)
        {
            return "";
        }

        String LineStartIndex = "0|";
        int lineIndex = 0;
        double len = 0.0f;
        String strNamePlace = "";
        StringBuilder strBufDescription = new StringBuilder();
        StringBuilder LinNodes = new StringBuilder();
        String[] edgeFieldNameArray = pathResult.edgeFieldNameArray;
        int iNamePlace = Array.IndexOf(edgeFieldNameArray, "道路名称", 0);
        int iLengthPlace = Array.IndexOf(edgeFieldNameArray, "长度", 0);

        for (int i = 0; i < pathNum; i++)
        {
            //获取点坐标信息
            Dot_2D[] dots = arcline[i].Dots;
            int pntNum = dots.Length;
            lineIndex += pntNum;
            for (int j = 0; j < pntNum; j++)
            {
                LinNodes.Append(dots[j].x + "," + dots[j].y + ";");
            }
            //获取描述信息
            String[] sFieldNames = arcline[i].FieldValus;
            String[] sFieldNamesNext = null;
            if (i + 1 <= pathNum - 1)
            {
                sFieldNamesNext = arcline[i + 1].FieldValus;
            }

            len += Convert.ToDouble(sFieldNames[iLengthPlace]);

            if (!sFieldNames[iNamePlace].Equals(""))
            {
                strNamePlace = sFieldNames[iNamePlace];
            }

            if (sFieldNamesNext != null)
            {
                if (!sFieldNamesNext[iNamePlace].Equals(sFieldNames[iNamePlace]) && !sFieldNamesNext[iNamePlace].Equals(""))
                {
                    LineStartIndex += lineIndex.ToString() + "|";
                    strBufDescription.Append(strNamePlace + "$" + len + ";");
                    len = 0.0f;
                }
            }
            else
            {
                strBufDescription.Append(strNamePlace + "$" + len + ";");
            }

            if (pathNum == 1)
            {
                LineStartIndex += lineIndex.ToString() + "|";
                strBufDescription.Append(sFieldNames[iNamePlace] + "$" + len + ";");
            }
        }
        roads = strBufDescription.ToString().Substring(0, strBufDescription.ToString().Length - 1);
        roads += "#" + LinNodes.ToString().Substring(0, LinNodes.ToString().Length - 1) + "#" + LineStartIndex;
        return roads;
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}