<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="jssdk.jsp" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + path;
%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta content="telephone=no" name="format-detection"/>
    <link rel="stylesheet" type="text/css" href="/static/css/reset.css">
    <link rel="stylesheet" type="text/css" href="/static/css/main.css">
    <title>订单详情</title>

</head>
<body>
<div class="spinnerBox">
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</div>
<div class="userInfo">
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>联系人</span>
            <span class="linkName"></span>
        </p>
        <p>
            <span>手机号</span>
            <span class="mobile">13888888888</span>
        </p>
    </div>
    <div class="comInfoBox comTitle clearfix">
        <p><span>设备信息</span></p>
    </div>
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>设备类型</span>
            <span class="machineType">电子标签</span>
        </p>
        <p>
            <span>是否过保</span>
            <span class="shelfLife">否</span>
        </p>
        <p><span>SN号</span>
            <span class="snCode">电子标签</span>
        </p>
        <p><span>不良现象</span>
            <span class="description">输入不良现象</span>
        </p>
    </div>
    <div class="comInfoBox comTitle clearfix">
        <p><span>回寄地址</span></p>
    </div>
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>所在地</span>
            <span class="pca">fdsafdsafs</span>
        </p>
        <p>
            <span>详细地址</span>
            <span class="address">输入详细地址</span>
        </p>
    </div>
    <div class="comInfoBox comTitle clearfix">
        <p><span>订单信息</span></p>
    </div>
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>订单号</span>
            <span class="orderNum">11111111</span>
        </p>
        <p>
            <span>订单金额</span>
            <span style="width:.3rem">￥</span><span class="orderPrice">200.00</span>
        </p>
    </div>
    <div class="invoiceInfo">
        <div class="comInfoBox comTitle clearfix">
            <p><span>开票信息</span></p>
        </div>
        <div class="comInfoBox comInfo clearfix">
            <p>
                <span>发票类型</span>
                <span class="invType">
                    <select class="selInvType" class="text"
                            style="-webkit-appearance:none;appearance:none;border:none;padding:0px 10px;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;background-color: #FFFFFF;color:#333333;border-radius:4px;">
            <option value="VAT">--普通发票--</option>
            <option value="PLAIN">--增值税专用发票--</option>
        </select>
                </span>
            </p>
            <p>
                <span>开票抬头</span>
                <input class="invName" type="text" name="" placeholder="输入开票抬头"/>
            </p>
            <p>
                <span>开票税号</span>
                <input class="invCode" type="text" name="" placeholder="输入开票税号"/>
            </p>
            <div class="special" style="padding: 0;">
                <p>
                    <span>注册地址</span>
                    <input class="invAdress" type="text" name="" placeholder="输入注册地址"/>
                </p>
                <p>
                    <span>开户银行</span>
                    <input class="invBank" type="text" name="" placeholder="输入开户银行"/>
                </p>
                <p>
                    <span>开户账号</span>
                    <input class="invBanckNo" type="number" name="" placeholder="输入开户账号"/>
                </p>
                <p>
                    <span>联系人电话</span>
                    <input class="invMobile" type="number" name="" placeholder="输入联系人电话"/>
                </p>
            </div>
        </div>
    </div>
    <a class="invoiceBtn">不开票</a>
    <a class="pay submitBtn" style="float:none;">提交</a>
    <a class="pay" style="float:none;">返回</a>
    <div style="text-align:center; display:none;">
        <p style="display:inline-block;">
            <a class="pay">在线支付</a>
            <a class="noFix">不维修</a>
        </p>
    </div>
</div>
<!-- <div class="index">
    <div class="index-nav">
        <ul class="clearfix">
            <li><a class="index-btn" href="http://weixin.izhongpei.com/wx/act/index"><img src="images/gwj_index_bak.png" alt="" /></a></li>
            <li><a class="shopcar-btn" href="list.html"><i><em>0</em></i><em>购物车</em></a></li>
            <li class="active"><a class="count-btn" href="myLogin.html"><i></i><em>我的</em></a></li>
        </ul>
    </div>
</div> -->
<script src="/static/dist/jquery.min.js"></script>
<script src="/static/js/common.js"></script>
<!--<script src="dist/jquery.uploadView.js"></script>-->
<script src="/static/js/info.js"></script>
<script>
    infoLoad();
    //	$("#imgInput_1").uploadView({
    //		uploadBox: '.js_showBox',//设置上传框容器
    //		showBox : '#filImg_1',//设置显示预览图片的容器
    //		width : 10, //预览图片的宽度，单位px
    //		height : 15, //预览图片的高度，单位px
    //		allowType: ["gif", "jpeg", "jpg", "bmp", "png"], //允许上传图片的类型
    //		maxSize :3, //允许上传图片的最大尺寸，单位M
    //		success:function(e){
    //			$(".js_uploadText").text('更改');
    //			alert($('#filImg_1 img').attr('src'))
    //			// alert('图片上传成功');
    //		}
    //	});
    //	$("#imgInput_2").uploadView({
    //		uploadBox: '.js_showBox',//设置上传框容器
    //		showBox : '#filImg_2',//设置显示预览图片的容器
    //		width : 10, //预览图片的宽度，单位px
    //		height : 15, //预览图片的高度，单位px
    //		allowType: ["gif", "jpeg", "jpg", "bmp", "png"], //允许上传图片的类型
    //		maxSize :2, //允许上传图片的最大尺寸，单位M
    //		success:function(e){
    //			// $(".js_uploadText").text('更改');
    //			// alert('图片上传成功');
    //		}
    //	});
</script>
</body>
</html>
