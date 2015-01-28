using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.IO;
using ICSharpCode.SharpZipLib.Zip;

/// <summary>
/// MTWFile 的摘要说明
/// </summary>
public class MTWFile
{
        private string _fileName;
        private static System.Collections.Generic.Dictionary<long, long> lockDic = new System.Collections.Generic.Dictionary<long, long>();
        /// <summary>
        /// 获取或设置文件名称
        /// </summary>
        public string FileName
        {
            get { return _fileName; }
            set { _fileName = value; }
        }
        public long fLength
        {
            get
            {
                if (File.Exists(_fileName))
                {
                    return new FileInfo(_fileName).Length;
                }
                else
                {
                    return 0;
                }
            }
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="byteCount">每次开辟位数大小，这个直接影响到记录文件的效率</param>
        /// <param name="fileName">文件全路径名</param>
        public MTWFile(string fileName)
        {
            _fileName = fileName;
        }
        /// <summary>
        /// 创建文件
        /// </summary>
        /// <param name="fileName"></param>
        public void Create(string fileName)
        {
            if (!Directory.Exists(fileName))
            {
                DirectoryInfo info = new DirectoryInfo(fileName);
                string path = info.Parent.FullName;
                Directory.CreateDirectory(path);
            }
            if (!System.IO.File.Exists(fileName))
            {
                using (System.IO.FileStream fs = System.IO.File.Create(fileName))
                {
                    fs.Close();
                }
            }
        }
        /// <summary>
        /// 写入文本
        /// </summary>
        /// <param name="content">文本内容</param>
        private void Write(string content, string newLine)
        {
            if (string.IsNullOrEmpty(_fileName))
            {
                throw new Exception("FileName不能为空！");
            }
            using (System.IO.FileStream fs = new System.IO.FileStream(_fileName, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.ReadWrite, System.IO.FileShare.ReadWrite, 8, System.IO.FileOptions.Asynchronous))
            {
                Byte[] dataArray = System.Text.Encoding.Default.GetBytes(content + newLine);
                bool flag = true;
                long slen = dataArray.Length;
                long len = 0;
                while (flag)
                {
                    try
                    {
                        if (len >= fs.Length)
                        {
                            fs.Lock(len, slen);
                            lockDic[len] = slen;
                            flag = false;
                        }
                        else
                        {
                            len = fs.Length;
                        }
                    }
                    catch (Exception ex)
                    {
                        while (!lockDic.ContainsKey(len))
                        {
                            len += lockDic[len];
                        }
                    }
                }
                fs.Seek(len, System.IO.SeekOrigin.Begin);
                fs.Write(dataArray, 0, dataArray.Length);
                fs.Close();
            }
        }
        /// <summary>
        /// 写入文件内容
        /// </summary>
        /// <param name="content"></param>
        public void WriteLine(string content)
        {
            this.Write(content, System.Environment.NewLine);
        }
        /// <summary>
        /// 写入文件
        /// </summary>
        /// <param name="content"></param>
        public void Write(string content)
        {
            this.Write(content, "");
        }
}

public class ZipDataSource : IStaticDataSource
{
    private string filename;
    public ZipDataSource(string filename)
    {
        this.filename = filename;
    }
    Stream IStaticDataSource.GetSource()
    {
        return File.Open(filename, FileMode.Open);
    }
}