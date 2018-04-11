<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="jssdk.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + path;
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>金溢科技-微信支付</title>
		<link rel="stylesheet" href="<%=path%>/static/weui/lib/weui.css" />
		<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
		<link rel="stylesheet" href="<%=path%>/css/index.css" />
	</head>
<body>
</body>
<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
<script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
<script src="<%=path %>/static/layer/layer.js"></script>
<%--<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>--%>
<script type="text/javascript">

    function wxpay(){
        $.showLoading("正在加载...");
        //测试时修改为自己的openId 如果不修改会出现【下单账号与支付账号不一致】的提示 这里最好授权获取
        $.post("<%=path %>/pay/gpay",
            {
                orderId:'<%=request.getParameter("orderId")%>'
            },
            function(res){
                $.hideLoading();
                if (res.code == 0) {
                    var data=$.parseJSON(res.data);
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data), false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data));
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(data));
                        }
                    }else{
                        onBridgeReady(data);
                    }
                }else{
					$.alert(res.message, "支付失败！",function() {wx.closeWindow();});
                }
            });
    }


    function onBridgeReady(json){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            json,
            function(res){
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    $.alert(res.message, "支付成功！\n如需取消订单,请在24小时内取消,过时将无法取消",function() {wx.closeWindow();});
                    //self.location="<%=path %>/course/getOrderCourseById?id=${course.id }+&openId=${openId} ";
                }else{
                    //alert(JSON.stringify(res));
                    layer.msg("支付失败", {shift: 6});
                    wx.closeWindow();
                }
            }
        );
    }

</script>
</html>