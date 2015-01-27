<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Main.aspx.cs" Inherits="Main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>公交换乘示例</title>
    <script type="text/javascript" language="javascript" src="jslib/system.js"></script>
    <script type="text/javascript" src="jslib/prototype.js"></script>
    <script type="text/javascript" src="jslib/function.js"></script>
    <script type="text/javascript" src="jslib/IMSMaps.js"></script>
    <script type="text/javascript" src="jslib/IMSMapsExt.js"></script>
    <script type="text/javascript" src="jslib/IMSPathSearch.js"></script>
    <script type="text/javascript" src="jslib/IMSMapConfig.js"></script>
    <script type="text/javascript" src="js/initFunction.js"></script>
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body scroll="no">
    <form id="form1" runat="server">
    <div id="main">
        <div id="logoText">
            <div class="logoImg logoText">
            </div>
        </div>
        <div id="logoBtn">
            <div class="logoImg logoBtn">
            </div>
        </div>
        <div id="suggest" style="display: none; position: absolute; top: 100px; left: 100px;
            z-index: 1000;">
        </div>
        <div id='busStopBox'>
            <input type='text' id='bs1' onfocus="this.select();this.value=''" onkeyup="busstopquery(this.value,'C027',1,this.id)"
                value="请输入出发站" /><br />
            到<br />
            <input type='text' id='bs2' onfocus="this.select();this.value=''" onkeyup="busstopquery(this.value,'C027',2,this.id)"
                class="search_inputbox" value="请输入目的站" /><br />
            <input type='button' value='搜索' onclick="SearchBusWay()" /></div>
        <div id="trash">
            <div id="btn1" style="width: 45px; height: 80px; margin-left:5px;float:left;"
                onclick="ShowInputBox(this)">
            </div>
            <div id="btn2" style="width: 45px; height: 80px;margin-left:5px;float:left;"
                onclick="ClearResult()">
            </div>
        </div>
        <div id="zdims" style="position: absolute;">
        </div>
        <div id="condition" style="left: -220px;">
            <!--注意：因为style为负数，要让js获取得到,所以我在<style />标签 和html中重复写了left的值。-->
            <div id="left_part">
                <div id="condition_head">
                    <span id="s_rezult"
                        class="rezult" onclick="showRez()"></span>
                </div>
                <div id="layer_body_bg">
                    <div id="layer_body">
                        <div id="rezultframe" style="overflow: auto; height: 100%">
                            <iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="rsFrame">
                            </iframe>
                        </div>
                    </div>
                </div>
                <div id="layer_foot">
                </div>
            </div>
            <div id="right_part" class="go_left" onclick="showCondition2()">
            </div>
        </div>
    </div>
    </form>
</body>
</html>
