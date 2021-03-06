<%@ page import="java.util.Date" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + path;
%>
<!doctype html>
<html>
<head>
    <%@ include file="jssdk.jsp" %>
    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="stylesheet" href="/static/weui/lib/weui.min.css">
    <link rel="stylesheet" href="/static/weui/css/jquery-weui.css">
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
    <input type="hidden" class="orderId" value="" />
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>联系人</span>
            <span class="linkName"></span>
        </p>
        <p>
            <span>手机号</span>
            <span class="mobile"></span>
        </p>
    </div>
    <div class="comInfoBox comTitle clearfix">
        <p><span>设备信息</span></p>
    </div>
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>设备类型</span>
            <span class="machineType"></span>
        </p>
        <p class = 'bug_hide'>
            <span>是否过保</span>
            <span class="shelfLife"></span>
        </p>
        <p><span>SN号</span>
            <span class="snCode"></span>
        </p>
        <p><span>不良现象</span>
            <span class="description"></span>
        </p>
    </div>
    <div class="comInfoBox comTitle clearfix">
        <p><span>回寄地址</span></p>
    </div>
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>所在地</span>
            <span class="pca"></span>
        </p>
        <p>
            <span>详细地址</span>
            <span class="address"></span>
        </p>
    </div>
    <div class="comInfoBox comTitle clearfix">
        <p><span>订单信息</span></p>
    </div>
    <div class="comInfoBox comInfo clearfix">
        <p>
            <span>订单号</span>
            <span class="orderNum"></span>
        </p>
        <p class = 'bug_hide'>
            <span>订单金额</span>
            <span style="width:.3rem">￥</span><span class="orderPrice"></span>
        </p>
        <p class = ''>
            <span>订单状态</span>
            <span class="orderStatus"></span>
        </p>
        <p class = 'bug_hide'>
            <span>支付状态</span>
            <span class="payStatus"></span>
        </p>
        <p class = 'bug_hide'>
            <span>物流公司</span>
            <span class="lgCompany"></span>
        </p>
        <p class = 'bug_hide'>
            <span>物流单号</span>
            <span class="lgCode"></span>
        </p>
    </div>
<c:if test="${param.needInvoice == '1'}">
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
            <option value="PLAIN">--普通发票--</option>
            <option value="VAT">--增值税专用发票--</option>
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
                    <span>电话</span>
                    <input class="invMobile" type="number" name="" placeholder="输入电话"/>
                </p>
            </div>
        </div>
    </div>
    <br>
    <a class="invoiceBtn">不开票</a>
    <br>
    <span >&nbsp;&nbsp;&nbsp;&nbsp;注:更多关于发票信息可联系我们的在线客服</span>

    <div style="text-align:center; ">
        <p style="display:inline-block;">
            <a class="pay closeBtn">返回</a>
            <a class="noFix submitBtn">提交</a>
        </p>
    </div>
    </c:if>
    <a class="pay closeBtn" style="float: none;
            display: ${param.needInvoice == '1' ? 'none' : 'block'};">返回</a>
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
<script src="/static/weui/js/jquery-weui.js"></script>
<script src="/static/weui/lib/fastclick.js"></script>
<script>
    $(function() {
        FastClick.attach(document.body);
    });
</script>
<script src="/static/js/common.js"></script>
<!--<script src="dist/jquery.uploadView.js"></script>-->
<script src="/static/js/info.js?time=<%=new Date()%>"></script>
<script>


    $(function(){
        infoLoad();
    });
</script>
</body>
</html>
