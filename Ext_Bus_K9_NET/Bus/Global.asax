<%@ Application Language="C#" %>

<script RunAt="server">
    void Application_Start(object sender, EventArgs e)
    {
        Application["bt"] = System.IO.File.ReadAllBytes(Server.MapPath("~/images/mapgis.jpg"));
        Application["errorImg"] = System.IO.File.ReadAllBytes(Server.MapPath("~/images/wait.gif"));
    }

    void Application_End(object sender, EventArgs e)
    {
        //  ��Ӧ�ó���ر�ʱ���еĴ���
    }

    void Application_Error(object sender, EventArgs e)
    {
        // �ڳ���δ����Ĵ���ʱ���еĴ���
    }

    void Session_Start(object sender, EventArgs e)
    {
    }

    void Session_End(object sender, EventArgs e)
    {
        // �ڻỰ����ʱ���еĴ��롣 
        // ע��: ֻ���� Web.config �ļ��е� sessionstate ģʽ����Ϊ
        // InProc ʱ���Ż����� Session_End �¼�������Ựģʽ����Ϊ StateServer 
        // �� SQLServer���򲻻��������¼���

    }
</script>

