using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text;


    /// <summary>
    /// 将脚本写入前台页面


    /// </summary>
    public class ScriptWriter
    {
        #region 常量

        public const char JSON_OBJECT_BEGIN = '{';
        public const char JSON_OBJECT_END = '}';
        public const char JSON_ARRAY_BEGIN = '[';
        public const char JSON_ARRAY_END = ']';
        public const char JSON_PROPERTY_SEPARATOR = ':';
        public const char JSON_STRING_SINGLE_QUOTE = '\'';
        public const char JSON_STRING_DOUBLE_QUOTE = '"';
        public const char JSON_ITEMS_SEPARATOR = ',';
        public const char JSON_DECIMAL_SEPARATOR = '.';

        private const char END_OF_STRING = '\0';
        private const char NEW_LINE = '\n';
        private const char RETURN = '\r';

        #endregion

        private Page _page;
        private string[] _atts;
        private StringBuilder _sb = new StringBuilder();

        /// <summary>
        /// 带参数的ScriptWriter构造函数

        /// </summary>
        /// <param name="scriptInPage">要写入脚本的页面</param>
        public ScriptWriter(Page scriptInPage)
        {
            _page = scriptInPage;
        }
        /// <summary>
        /// 不带参数的ScriptWriter构造函数

        /// </summary>
        public ScriptWriter()
        {
        }

        /// <summary>
        /// 清空JSON数据
        /// </summary>
        public void ClearJSONData()
        {
            if (_sb.Length > 0)
                _sb.Remove(0, _sb.Length);
        }

        /// <summary>
        /// 写带JSON数据的脚本到页面
        /// </summary>
        /// <param name="key">要添加的数组对象的名称</param>
        /// <param name="script">要注册的脚本文本</param>
        public void WriteJSONArray(string key)
        {
            _sb.Insert(0, "var " + key + "=" + JSON_ARRAY_BEGIN);
            _sb.Insert(_sb.Length, JSON_ARRAY_END + ";");

            ClientScriptManager csm = _page.ClientScript;
            Type cstype = _page.GetType();
            //form标记结束之前
            if (!csm.IsStartupScriptRegistered(cstype, key))
                csm.RegisterStartupScript(cstype, key, _sb.ToString(), true);
        }

        /// <summary>
        /// 写一般脚本到前台页面
        /// </summary>
        /// <param name="key">要注册的脚本键值</param>
        /// <param name="script">要注册的脚本文本</param>
        public void Write(string key, string script)
        {
            ClientScriptManager csm = _page.ClientScript;
            Type cstype = _page.GetType();
            //form标记结束之前
            if (!csm.IsStartupScriptRegistered(cstype, key))
                csm.RegisterStartupScript(cstype, key, script, true);
        }

        /// <summary>
        /// 定义数组对象中，每个元素对象的属性,用于JSON数据
        /// </summary>
        /// <param name="atts">属性字符串，可多个</param>
        public void SetClassAttribute(params string[] atts)
        {
            _atts = atts;
        }

        /// <summary>
        /// 添加JSON数据，与SetClassAttribute中的属性一一对应
        /// </summary>
        /// <param name="list">属性数据，可多个</param>
        public void AddClassData(params string[] list)
        {
            if (list.Length != _atts.Length)
            {
                //throw new ScriptException("传入的参数个数与类属性个数不符");
                return;
            }
            StringBuilder sb = new StringBuilder();
            if (_sb.Length > 0)
                sb.Append(JSON_ITEMS_SEPARATOR);
            sb.Append(JSON_OBJECT_BEGIN);
            for (int i = 0; i < list.Length; i++)
            {
                if (i > 0)
                    sb.Append(JSON_ITEMS_SEPARATOR);
                //sb.Append(JSON_STRING_DOUBLE_QUOTE);
                sb.Append(_atts[i]);
                //sb.Append(JSON_STRING_DOUBLE_QUOTE);
                sb.Append(JSON_PROPERTY_SEPARATOR);
                //sb.Append(JSON_STRING_DOUBLE_QUOTE);
                sb.Append(list[i]);
                //sb.Append(JSON_STRING_DOUBLE_QUOTE);
            }
            sb.Append(JSON_OBJECT_END);
            _sb.Append(sb.ToString());
        }

        /// <summary>
        /// 返回JSON对象字符串

        /// </summary>
        /// <returns></returns>
        public string GetJSONObjStr()
        {
            if (_sb.Length > 0)
                return _sb.ToString();
            else
                return "";
        }

        /// <summary>
        /// 返回JSON对象数组字符串

        /// </summary>
        /// <returns></returns>
        public string GetJSONArrStr()
        {
            if (_sb.Length > 0)
            {
                _sb.Insert(0, JSON_ARRAY_BEGIN);
                _sb.Insert(_sb.Length, JSON_ARRAY_END);
                return _sb.ToString();
            }
            else
                return "";
        }
    }

