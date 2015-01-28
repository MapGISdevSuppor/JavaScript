    // JScript 文件

/*
请不要在这个文件中添加事件响应函数的实体
如果需要处理对应的事件，请在对应的事件函数中调用事件处理函数
*/

function TdeCtrl_toBool(s) 
{
    if (s == "1") return true;
    else if (s == "0") return false;
    else return undefined;
}

function TdeCtrl_parseState(state) 
{
    var o = new Object();
    var vals = state.split(',');
    if (vals.length >= 11) 
    {
        var index = -1;
        o.altKey = TdeCtrl_toBool(vals[++index]);
        o.altLeft = TdeCtrl_toBool(vals[++index]);
        o.ctrlKey = TdeCtrl_toBool(vals[++index]);
        o.ctrlLeft = TdeCtrl_toBool(vals[++index]);
        o.shiftKey = TdeCtrl_toBool(vals[++index]);
        o.shiftLeft = TdeCtrl_toBool(vals[++index]);
        o.keyCode = parseInt(vals[++index]);
        o.repeat = parseInt(vals[++index]);
        o.button = parseInt(vals[++index]);
        o.x = parseInt(vals[++index]);
        o.y = parseInt(vals[++index]);
        o.mouseWheel = parseInt(vals[++index]);
    } 
    
    return o;
}

//键盘按键按下
function TdeCtrl_OnFireEvent(callback, state) 
{
    var o = TdeCtrl_parseState(state);

    try  
    {
        var s = callback + "(o);";
        eval(s);
    }
    catch(exception) 
    {
    }

}

//call back function, don't call this
//ToolTip
function TdeCtrl_OnSetToolTipInfo(left, top, width, height, info, type) 
{
    LabelCallBack_SetToolTipFrame(left, top, width, height, info, type);
}

//call back function, don't call this
//tooltip
function TdeCtrl_OnSetToolTipPos(left, top) 
{
    LabelCallBack_SetToolTipPos(left, top);
}

//call back function, don't call this
//ToolTip
function TdeCtrl_OnRemoveToolTip() 
{
    LabelCallBack_HideToolTipFrame();
}

//call back function, don't call this
//ToolTip Close Button
function TdeCtrl_OnToolTipCloseBt() 
{
    LabelOpObj.RemoveToolTip();
}

