/**
* 属性查询类
*/
//查询
var AttrUrl = "";
var GeomUrl = "";
var FeatureUrl = "";
var FeatureFilter = "";
var DCSFilter = "";    
    
//高亮
var FlashInterval = "";
var tmInterval = 0;
var type;
var hightLightPoints;
function VecSearchClass()
{
    this.AttrUrl = "Handler.ashx/tddata?method=FeatAttr2";
    this.GeomUrl = "Handler.ashx/tddata";
    this.FeatureUrl = "../CatalogSvc/Feature.aspx?";
    this.FeatureFilter = "";
    this.DCSFilter = "";
    this.tmInterval = 0;
    this.FlashInterval="";
}
var VecSearchObj = new VecSearchClass();

VecSearchClass.prototype.OpenStrSearchCallback = function(xmlHttp,callBack){
    var data = "filter="+FeatureFilter +"&classpath="+xmlHttp.responseText;
    PostRequest(VecSearchObj.FeatureUrl,data,callBack,DCSFilter);
}

VecSearchClass.prototype.OpenStrSearch = function (openStr,callBack,type, points)
{
    var url = this.AttrUrl;
    DCSFilter= "";
    if (type=="point") {
        DCSFilter = points+",0.1,0.1";
    }
    else if (type=="rectangle") {
        DCSFilter = points+",false";
    }
    else if (type=="polygon") {
        var pointArr = points.split("|");
        for(var i=0;i<pointArr.length-1;i++)
        {
            DCSFilter = DCSFilter + pointArr[i]+",";
        }
        DCSFilter+=pointArr[pointArr.length-1];
    }
    else{
        return;
    }
    var postBody = "&classpath="+openStr+"&filter="+DCSFilter;
    var xmlHttp;
    if (window.ActiveXObject) 
    {   
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    else if (window.XMLHttpRequest) 
    {
        xmlHttp = new XMLHttpRequest();                   
    }
    xmlHttp.open("POST",url , true);
    xmlHttp.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = 
    function()
    {   
        if (xmlHttp.readyState == 4) 
        {   
            if (xmlHttp.status == 200 || xmlHttp.status == 0)
            {
                callBack(xmlHttp,DCSFilter);
            }
            else if (xmlHttp.status == 500)
            {   
                var xmlHttp2 = "";
                xmlHttp2.responseText = "";
                callBack(xmlHttp2,DCSFilter);
            }
            else
            {
                callBack(null,DCSFilter);
            }
        }
    };
    xmlHttp.send(postBody);
}

VecSearchClass.prototype.ClasspathSearch = function (classpath,callBack,type, points)
{
    var url = this.AttrUrl;
    DCSFilter= "";
    if (type=="point") {
        DCSFilter = points+",0.1,0.1";
    }
    else if (type=="rectangle") {
        DCSFilter = points+",false";
    }
    else if (type=="polygon") {
        var pointArr = points.split("|");
        for(var i=0;i<pointArr.length-1;i++)
        {
            DCSFilter = DCSFilter + pointArr[i]+",";
        }
        DCSFilter+=pointArr[pointArr.length-1];
    }
    else{
        return;
    }
    var postBody = "&classpath="+classpath+"&filter="+DCSFilter;
    var xmlHttp;
    if (window.ActiveXObject) 
    {   
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    else if (window.XMLHttpRequest) 
    {
        xmlHttp = new XMLHttpRequest();                   
    }
    xmlHttp.open("POST",url , true);
    xmlHttp.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = 
    function()
    {   
        if (xmlHttp.readyState == 4) 
        {   
            if (xmlHttp.status == 200 || xmlHttp.status == 0)
            {   
                callBack(xmlHttp,DCSFilter);
            }
            else if (xmlHttp.status == 500)
            {   
                var xmlHttp2 = "";
                xmlHttp2.responseText = "";
                callBack(xmlHttp2,DCSFilter);
            }
            else
            {
                callBack(null,DCSFilter);
            }
        }
    };
    xmlHttp.send(postBody);
}

VecSearchClass.prototype.MetaDataIdSearch = function (id,callBack,type, points)
{
    var url = this.FeatureUrl;
    DCSFilter= "";
    if (type=="point") {
        DCSFilter = points+",0.1,0.1";
        var pointArr = points.split(",");
        var XMax = parseFloat(pointArr[0]) + 0.01;
        var YMax = parseFloat(pointArr[1]) + 0.01;
        FeatureFilter = "{rect:[xmin:"+pointArr[0]+", ymin:"+pointArr[1]+", xmax:"+pointArr[0]+", ymax:"+pointArr[1]+",mode:ModeIntersect]}{tolerance : 0.000001 }";
    }
    else if (type=="rectangle") {
        DCSFilter = points+",false";
        var pointArr = points.split(",");
        FeatureFilter = "{rect:[xmin:"+pointArr[0]+", ymin:"+pointArr[1]+", xmax:"+pointArr[2]+", ymax:"+pointArr[3]+",mode:ModeIntersect]}{tolerance : 0.000001 }";
    }
    else if (type=="polygon") {
        var pointArr = points.split("|");
        for(var i=0;i<pointArr.length-1;i++)
        {
            DCSFilter = DCSFilter + pointArr[i]+",";
        }
        DCSFilter+=pointArr[pointArr.length-1];
        
        var tmpStr = "";
        for(var i = 0 ; i < pointArr.length; i++)
        {
            tmpStr += "(" + pointArr[i] + ")";
        }
        FeatureFilter = "{polygon : [ points  : " + tmpStr + " ] mode:ModeIntersect }";
    }
    else{
        return;
    }
    url=url+"metadataId="+id;
    var postBody = "&filter="+FeatureFilter;
    var xmlHttp;
    if (window.ActiveXObject) 
    {   
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    else if (window.XMLHttpRequest) 
    {
        xmlHttp = new XMLHttpRequest();                   
    }
    xmlHttp.open("POST",url , true);
    xmlHttp.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var func = this.OpenStrSearchCallback;
    xmlHttp.onreadystatechange = 
    function()
    {   
        if (xmlHttp.readyState == 4) 
        {   
            if (xmlHttp.status == 200 || xmlHttp.status == 0)
            {   
                callBack(xmlHttp,DCSFilter);
            }
            else if (xmlHttp.status == 500)
            {   
                var xmlHttp2 = "";
                xmlHttp2.responseText = "";
                callBack(xmlHttp2,DCSFilter);
            }
            else
            {
                callBack(null,DCSFilter);
            }
        }
    };
    xmlHttp.send(postBody);
}

VecSearchClass.prototype.MetaDataIdSearch3 = function (id,callBack,type, points)
{
    var url = this.FeatureUrl;
    DCSFilter= "";
    if (type=="point") {
        DCSFilter = points+",0.1,0.1";
    }
    else if (type=="rectangle") {
        DCSFilter = points+",false";
    }
    else if (type=="polygon") {
        var pointArr = points.split("|");
        for(var i=0;i<pointArr.length-1;i++)
        {
            DCSFilter = DCSFilter + pointArr[i]+",";
        }
        DCSFilter+=pointArr[pointArr.length-1];
    }
    else{
        return;
    }
    url+="metadataId="+id;
    var postBody = "&filter="+DCSFilter;
    var xmlHttp;
    if (window.ActiveXObject) 
    {   
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    else if (window.XMLHttpRequest) 
    {
        xmlHttp = new XMLHttpRequest();                   
    }
    xmlHttp.open("POST",url , true);
    xmlHttp.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = 
    function()
    {   
        if (xmlHttp.readyState == 4) 
        {   
            if (xmlHttp.status == 200 || xmlHttp.status == 0)
            {   
                callBack(xmlHttp,DCSFilter);
            }
            else if (xmlHttp.status == 500)
            {   
                var xmlHttp2 = "";
                xmlHttp2.responseText = "";
                callBack(xmlHttp2,DCSFilter);
            }
            else
            {
                callBack(null,DCSFilter);
            }
        }
    };
    xmlHttp.send(postBody);
}


VecSearchClass.prototype.StopHighLight= function(){
    if (FlashInterval!="") {
        clearInterval(FlashInterval);
        FlashInterval="";
    VectorDrawOpObj.Remove("VecHightLight");
    }
}

VecSearchClass.prototype.FlashFeature= function(){
        if(tmInterval==0){
           VectorDrawOpObj.Add("VecHightLight",type,hightLightPoints,"red" ,"red",0.8,3,"solid",false);
        }
        else{
           VectorDrawOpObj.Add("VecHightLight",type,hightLightPoints,"blue" ,"blue",0.8,3,"solid",false);
           tmInterval=-1;
        }
        tmInterval++;
}

VecSearchClass.prototype.HighLight= function(t,p){
    type = t;
    hightLightPoints = p;
    window.clearInterval(FlashInterval);
    FlashInterval = "";
    FlashInterval = window.setInterval(this.FlashFeature,1000);
}


/////////////////新样式数据获取列表方法/////////////////////////////////
VecSearchClass.prototype.NewOpenStrSearch = function (openStr,type, points)
{
    var url = this.AttrUrl;
    DCSFilter= "";
    if (type=="point") {
        DCSFilter = points+",0.1,0.1";
    }
    else if (type=="rectangle") {
        DCSFilter = points+",false";
    }
    else if (type=="polygon") {
        var pointArr = points.split("|");
        for(var i=0;i<pointArr.length-1;i++)
        {
            DCSFilter = DCSFilter + pointArr[i]+",";
        }
        DCSFilter+=pointArr[pointArr.length-1];
    }
    else{
        return;
    }
    
    var newurl = "";
    var last = document.URL.lastIndexOf("/");
    var head = document.URL.substr(0, last);
    newurl = head + "/test9_001/resultIN.html";
    
    var postBody = "classpath="+openStr+"&filter="+DCSFilter;
    if (window.postbodystr) {
        window.postbodystr = ""; 
    }
    
    window.postbodystr = postBody; 
        
    var ifObj = document.getElementById("AttrTableIf");
    var divObj = document.getElementById("AttrbuteTable");
    if (ifObj!=null) {
        ifObj.src = newurl;
        ifObj.style.display = "block";
        divObj.style.display = "block";
        ifObj.style.bottom = "0px";
   }   
}

//////////////////////////////////////////////////////////////////////////
//隐藏进度条
/////////////////////////////////////////////////////////////////////////

VecSearchClass.prototype.NewMetaDataIdSearch = function (id,type, points)
{
    var url = this.FeatureUrl;
    DCSFilter= "";
    if (type=="point") {
        DCSFilter = points+",0.1,0.1";
        var pointArr = points.split(",");
        var XMax = parseFloat(pointArr[0]) + 0.01;
        var YMax = parseFloat(pointArr[1]) + 0.01;
        FeatureFilter = "{rect:[xmin:"+pointArr[0]+", ymin:"+pointArr[1]+", xmax:"+pointArr[0]+", ymax:"+pointArr[1]+",mode:ModeIntersect]}{tolerance : 0.000001 }";
    }
    else if (type=="rectangle") {
        DCSFilter = points+",false";
        var pointArr = points.split(",");
        FeatureFilter = "{rect:[xmin:"+pointArr[0]+", ymin:"+pointArr[1]+", xmax:"+pointArr[2]+", ymax:"+pointArr[3]+",mode:ModeIntersect]}{tolerance : 0.000001 }";
    }
    else if (type=="polygon") {
        var pointArr = points.split("|");
        for(var i=0;i<pointArr.length-1;i++)
        {
            DCSFilter = DCSFilter + pointArr[i]+",";
        }
        DCSFilter+=pointArr[pointArr.length-1];
        
        var tmpStr = "";
        for(var i = 0 ; i < pointArr.length; i++)
        {
            tmpStr += "(" + pointArr[i] + ")";
        }
        FeatureFilter = "{polygon : [ points  : " + tmpStr + " ] mode:ModeIntersect }";
    }
    else{
        return;
    }
    
    var newurl = "";
    var last = document.URL.lastIndexOf("/");
    var head = document.URL.substr(0, last);
    newurl = head+"/etc/resultIN.html";
    
    var postBody = "metadataId="+id+"&filter="+FeatureFilter+"&DCSfilter="+DCSFilter;
    if (window.postbodystr) {
        window.postbodystr = ""; 
    }
    window.postbodystr = postBody;     
    
    var ifObj = document.getElementById("AttrTableIf");
    var divObj = document.getElementById("AttrbuteTable");
    if (ifObj!=null) {
        ifObj.src = newurl;
        ifObj.style.display = "block";
        divObj.style.display = "block";
        ifObj.style.bottom = "0px";
   }
   
   var vecif = document.frames[vecSearchIF].document;
   vecif.getElementById("mapProcBar").style.visibility = "hidden";
}
/////////////////新样式数据获取列表方法////////////////////////////////



/**
* 图片下载类
*/
var MapUrl = "";
var downaloadUrl = "";

function VecDownloadClass()
{
    this.MapUrl = "catalogsvc/map.ashx";
    this.downaloadUrl = "catalogsvc/download.ashx";
}
var VecDownloadObj = new VecDownloadClass();

VecDownloadClass.prototype.DownloadMap= function(docName,mapName,width,height,points,mapinfo){
    
      var polgonObj = points.split(";");
        if(polgonObj.length <=0)
        {
          return;
        }
        var firstPolgon = polgonObj[0];
        var firstpoint = firstPolgon.split("|");
        if(firstpoint.length <= 0)
        {
            return;
        }
        var pxy = firstpoint[0].split(",");
	    var XMin = parseFloat(pxy[0]);
	    var XMax = parseFloat(pxy[0]);
	    var YMin = parseFloat(pxy[1]);
	    var YMax = parseFloat(pxy[1]);
        
        for(var i =0 ; i < polgonObj.length ; i ++)
        {
         if(polgonObj[i] == "" || polgonObj[i] == 'undefined'|| polgonObj[i] == null)
         {
           continue;
         }
         
         //获取范围
         var pointArr = polgonObj[i].split("|");
         for(var j = 0; j < pointArr.length ; j ++)
         {
            if(pointArr[j] == "" || pointArr[j] == 'undefined'|| pointArr[j] == null)
            {
                continue;
            }
            
            var pointxy = pointArr[j].split(",");
            if(parseFloat(pointxy[0]) < XMin)
	        {
	            XMin = parseFloat(pointxy[0]);
	        }
	        if(parseFloat(pointxy[0]) > XMax)
	        {
	            XMax = parseFloat(pointxy[0]);
	        }
	     
	        if(parseFloat(pointxy[1]) < YMin)
	        {
	            YMin = parseFloat(pointxy[1]);
	        }
	        if(parseFloat(pointxy[1]) > YMax)
	        {
	            YMax = parseFloat(pointxy[1]);
	        }
         }
        }
    var url = "/CatalogSvc/map.aspx?mapdoc=" + docName + "&mapname=" +mapName + "&width=" + width + "&height=" + height + "&box=" + XMin + "," + YMin + "," + XMax + "," +YMax + "&mapinfo=" + mapinfo;
    var data = "&mergepolygon="+points;
    PostSubmit(url,"mergepolygon",points);
}

VecDownloadClass.prototype.DownloadMetadata= function(id,width,height,points){
    
      var polgonObj = points.split(";");
        if(polgonObj.length <=0)
        {
          return;
        }
        var firstPolgon = polgonObj[0];
        var firstpoint = firstPolgon.split("|");
        if(firstpoint.length <= 0)
        {
            return;
        }
        var pxy = firstpoint[0].split(",");
	    var XMin = parseFloat(pxy[0]);
	    var XMax = parseFloat(pxy[0]);
	    var YMin = parseFloat(pxy[1]);
	    var YMax = parseFloat(pxy[1]);
        
        for(var i =0 ; i < polgonObj.length ; i ++)
        {
         if(polgonObj[i] == "" || polgonObj[i] == 'undefined'|| polgonObj[i] == null)
         {
           continue;
         }
         
         //获取范围
         var pointArr = polgonObj[i].split("|");
         for(var j = 0; j < pointArr.length ; j ++)
         {
            if(pointArr[j] == "" || pointArr[j] == 'undefined'|| pointArr[j] == null)
            {
                continue;
            }
            
            var pointxy = pointArr[j].split(",");
            if(parseFloat(pointxy[0]) < XMin)
	        {
	            XMin = parseFloat(pointxy[0]);
	        }
	        if(parseFloat(pointxy[0]) > XMax)
	        {
	            XMax = parseFloat(pointxy[0]);
	        }
	     
	        if(parseFloat(pointxy[1]) < YMin)
	        {
	            YMin = parseFloat(pointxy[1]);
	        }
	        if(parseFloat(pointxy[1]) > YMax)
	        {
	            YMax = parseFloat(pointxy[1]);
	        }
         }
        }
    var url = "/CatalogSvc/download.aspx?metadataid=" +id + "&width=" + width + "&height=" + height + "&box=" + XMin + "," + YMin + "," + XMax + "," +YMax;
    var data = "&mergepolygon="+points;
    PostSubmit(url,"mergepolygon",points);
}