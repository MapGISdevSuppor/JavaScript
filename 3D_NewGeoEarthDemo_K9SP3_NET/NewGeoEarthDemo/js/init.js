var ze = null;
        
function autoWidth() {
    var bodyWidth = document.body.offsetWidth;
    var bodyHeight = document.body.offsetHeight;
    var menuHeight = document.getElementById("_menu").offsetHeight;
    document.getElementById("_rightCtrl").style.width = (bodyWidth) + "px";
    document.getElementById("_rightCtrl").style.height = (bodyHeight - menuHeight) + "px";
    ze.style.width = bodyWidth + "px";
    ze.style.height = (bodyHeight - menuHeight) + "px";
}