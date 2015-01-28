/**   
 * @fileOverview 三维控件JS接口
 * @author <a href="http://www.mapgis.com.cn">ZondyCyber</a>   
 * @version 1.0 
 */

(function() 
{    
    //
    if (typeof TDECtrl == "object") return;
    
    //缓存脚本位置
    var scriptLocation;
    
    //命名空间
    window.TDECtrl = {
        
        //脚本名称
        _scriptName: "TDECtrlSdk/TDECtrl.js",

        //返回脚本的位置
        _getScriptLocation: function () 
        {
            if (scriptLocation != undefined) 
            {
                return scriptLocation;
            }
            scriptLocation = "";            
            var isOL = new RegExp("(^|(.*?\\/))(" + TDECtrl._scriptName + ")(\\?|$)");
         
            var scripts = document.getElementsByTagName('script');
            for (var i=0, len=scripts.length; i<len; i++) 
            {
                var src = scripts[i].getAttribute('src');
                if (src) 
                {
                    var match = src.match(isOL);
                    if(match) 
                    {
                        scriptLocation = match[1];
                        break;
                    }
                }
            }
            return scriptLocation;
        }
    };
    
    // js files
    var jsfiles = new Array(
        "CommAPI.js",
        "CloudyLayerAPI.js",
        "LabelAPI.js",
        "MeasureToolAPI.js",
        "NavigateAPI.js",
        "VectorDrawAPI.js",
        "TerrainLayerAPI.js",
        "ImageLayerAPI.js",
        "BaseLayerAPI.js",
        "EventHandle.js",
        "ExtendLayerAPI.js",
        "PluginToolAPI.js"
    ); // etc.

    var agent = navigator.userAgent;
    var docWrite = (agent.match("MSIE") || agent.match("Safari"));
    if(docWrite) 
    {
        var allScriptTags = new Array(jsfiles.length);
    }
    
    var host = TDECtrl._getScriptLocation() + "TDECtrlSdk/";    
    
    for (var i=0, len=jsfiles.length; i<len; i++) 
    {
        if (docWrite) 
        {
            allScriptTags[i] = "<script src='" + host + jsfiles[i] + "'></script>"; 
        } 
        else 
        {
            var s = document.createElement("script");
            s.src = host + jsfiles[i];
            var h = document.getElementsByTagName("head").length ? 
                       document.getElementsByTagName("head")[0] : 
                       document.body;
            h.appendChild(s);
        }
    }
    
    if (docWrite) 
    {
        document.write(allScriptTags.join(""));
    }
})();

//版本
TDECtrl.VERSION_NUMBER = "TDECtrl 1.0";
