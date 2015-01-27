using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using MapgisWSClient;
using System.IO;
using System.Web;
using System.Configuration;


    public class MapDisplay
    {
        private static Object _thisLock = new Object();
        /// <summary>
        /// 初始化地图

        /// </summary>
        private static void LoadMap(string mapName)
        {
            lock (_thisLock)
            {
                CSingleMapView viewport = new CSingleMapView();
                viewport.SetServerIP(ConfigurationManager.AppSettings["ip"]);
                viewport.Open(mapName);
                HttpContext.Current.Session["viewport"] = viewport;
            }
        }

        /// <summary>
        /// 根据配置载入地图
        /// </summary>
        public static void ReLoadMap()
        {
            MapDisplay.LoadMap(MapSetting.GetMapNameConfig());
        }

        private static bool HasViewport()
        {
            if (HttpContext.Current.Session["viewport"] != null)
                return true;
            else
                return false;
        }

        public static void CheckViewport()
        {
            if (!MapDisplay.HasViewport())
                MapDisplay.ReLoadMap();
        }
    }

