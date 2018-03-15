<%@ page import="com.jfinal.weixin.sdk.api.JsTicket" %>
<%@ page import="com.jfinal.weixin.sdk.api.JsTicketApi" %>
<%@ page import="com.jfinal.kit.HashKit" %>
<%@ page import="com.jfinal.weixin.sdk.api.ApiConfigKit" %>
<%@ page import="java.util.UUID" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    //jssdk鉴权公用页面
    JsTicket jsApiTicket = JsTicketApi.getTicket(JsTicketApi.JsApiType.jsapi);
    String jsapi_ticket = jsApiTicket.getTicket();
    String nonce_str = UUID.randomUUID().toString();
    // 注意 URL 一定要动态获取，不能 hardcode.
    String url = "http://" + request.getServerName() // 服务器地址
            + request.getContextPath() // 项目名称
            + request.getServletPath();// 请求页面或其他地址
    String qs = request.getQueryString(); // 参数
    if (qs != null) {
        url = url + "?" + (request.getQueryString());
    }
    String timestamp = Long.toString(System.currentTimeMillis() / 1000);
    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    //注意这里参数名必须全部小写，且必须有序
    String  str = "jsapi_ticket=" + jsapi_ticket +
            "&noncestr=" + nonce_str +
            "&timestamp=" + timestamp +
            "&url=" + url;
    String signature = HashKit.sha1(str);
    String appId = ApiConfigKit.getApiConfig().getAppId();
    String nonceStr = nonce_str;

//  System.out.println("url>>>>" + url);
//  System.out.println("appId " + ApiConfigKit.getApiConfig().getAppId()
//          + "  nonceStr " + nonce_str + " timestamp " + timestamp);
//  System.out.println("url " + url + " signature " + signature);
//  System.out.println("nonceStr " + nonce_str + " timestamp " + timestamp);
//  System.out.println(" jsapi_ticket " + jsapi_ticket);
//  System.out.println("nonce_str  " + nonce_str);

%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body>
</body>
<script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.3.2.js?_=20180314"></script>
<script type="text/javascript">
    wx.config({
        debug: false,
        appId:'<%=appId%>',
        timestamp: '<%=timestamp%>',
        nonceStr: '<%=nonceStr %>',
        signature: '<%=signature%>',
        jsApiList: [
            'checkJsApi',
            'closeWindow',
            'openCard'
        ]
    });
    //        'onMenuShareTimeline',
    //        'onMenuShareAppMessage',
    //        'onMenuShareQQ',
    //        'onMenuShareWeibo',
    //        'hideMenuItems',
    //        'showMenuItems',
    //        'hideAllNonBaseMenuItem',
    //        'showAllNonBaseMenuItem',
    //        'translateVoice',
    //        'startRecord',
    //        'stopRecord',
    //        'onRecordEnd',
    //        'playVoice',
    //        'pauseVoice',
    //        'stopVoice',
    //        'uploadVoice',
    //        'downloadVoice',
    //        'chooseImage',
    //        'previewImage',
    //        'uploadImage',
    //        'downloadImage',
    //        'getNetworkType',
    //        'openLocation',
    //        'getLocation',
    //        'hideOptionMenu',
    //        'showOptionMenu',
    //        'scanQRCode',
    //        'chooseWXPay',
    //        'openProductSpecificView',
    //        'addCard',
    //        'chooseCard',

    wx.ready(function () {
        try{
            wxpay();
        }catch (e){}
    });

    wx.error(function (res) {
        //alert(res.errMsg);
    });

</script>
</html>