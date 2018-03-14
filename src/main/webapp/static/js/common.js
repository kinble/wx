/*重置字体大小*/
!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = (width / 7.5) + "px");
        };

    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);

}(document, window));
/*横竖屏切换刷新*/
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
	if (window.orientation === 180 || window.orientation === 0) {
	    location.replace(location.href);
	}
	if (window.orientation === 90 || window.orientation === -90 ){
	    location.replace(location.href);
	}
}, false);

$(function(){
    $(".spinnerBox").fadeOut(1000);
})

// function checkRefresh(){
//     var b_refresh = $("#b_refresh");
//     if(b_refresh.val() == "no"){
//         b_refresh.val("yes");
//     }else{
//         window.location.reload();
//     }
// }
/*截取当前页面链接字符串*/
function getwindowUrl() {
    var url = window.location.href;
    var pos, param_str, param, tmp_str;
    var data = {};
    pos = url.indexOf("?");
    param_str = decodeURI(url.substring(pos+1));
    param = param_str.split("&");
    for(var i=0; i<param.length; i++){
        tmp_str = param[i];
        pos = tmp_str.indexOf("=");
        var k = tmp_str.substring(0, pos);
        if(k.length != 0){
            data[k] = tmp_str.substring(pos+1)
        }
    }
    cutList = data;
    return data;
};

var $ctxRoot = "http://weixin.izhongpei.com/wx";

/*检查是否登录*/

function checkloginAjax(){
    $.ajax({
        url: $ctxRoot+"/mall/login_info",
        type: "GET",
        success: function (data) {
            if (data.repCode != 1) {
                window.location.href = "login.html";
            }else{
                infoAjax()
            }
        }
    });
}

function infoAjax(){
    $.ajax({
        url: $ctxRoot+"/mall/user/info",
        type: "GET",
        success: function (data) {
            if (data.repCode == 1) {
                var info = "";
                info += '<p>'+data.loginName+'</p>'
                      + '<p>所属公司：'+data.customerName+'</p>'
                      + '<p>联系手机：'+data.mobile+'</p>'
                $(".Personal .userInfoBox").html(info);
                $(".go-order a").attr("href","myOrder_all.html")
                $(".logistic a").attr("href","myOrder_split.html")
                $(".infoBox p:first a").attr("href","online_fix.html?memberMobile="+data.mobile+"&memberId="+data.memberId)
                $(".infoBox p:last a").attr("href","resetPassword.html")
                $(".addressBox a").attr("href","address_action.html")
                // if(data.actPromoCode != ''){
                    $(".Personal .codeBox").text("交易码："+data.actPromoCode);
                // }

                if(data.state == 0){
                    alert("资料未完善！")
                    window.location.href="online_fix.html?memberMobile="+data.mobile+"&memberId="+data.memberId
                }else if(data.state == 1){
                    alert("客户资料审核驳回："+data.rejectReason)
                    window.location.href="online_fix.html?memberMobile="+data.mobile+"&memberId="+data.memberId
                }else if(data.state == 2){
                     alert("客户资料审核中！")
                }
            }
        }
    });
}

/*格式化日期时间*/
function formatTime(str){
    var Year = str.substr(0,4);
    var Month = str.substr(4,2);
    var Day = str.substr(6,2);
    var Hour = str.substr(8,2);
    var Minute = str.substr(10,2);
    var Second = str.substr(12,2);
    return Year+"-"+Month+"-"+Day+" "+Hour+":"+Minute+":"+Second
}
window.alert = function(name){
    var iframe = document.createElement("iframe");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
