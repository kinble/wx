<%@ page import="java.util.Date" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + path;
%>
<!doctype html>
<html>
<head>
    <%@ include file="jssdk.jsp"%>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <!-- HTTP 1.1 -->
    <meta http-equiv="pragma" content="no-cache">
    <!-- HTTP 1.0 -->
    <meta http-equiv="cache-control" content="no-cache">
    <!-- Prevent caching at the proxy server -->
    <meta http-equiv="expires" content="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta content="telephone=no" name="format-detection" />

    <link rel="stylesheet" href="/static/weui/lib/weui.min.css">
    <link rel="stylesheet" href="/static/weui/css/jquery-weui.css">
    <link rel="stylesheet" type="text/css" href="/static/css/reset.css">
    <link rel="stylesheet" type="text/css" href="/static/css/main.css">
    <title>在线报${param.type == "1" ? "修" : "障"}</title>
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
    <div class="userNameBox clearfix">
        <span>联系人</span><span style="color: red;margin-left:0" >*</span>
        <input class="userName" type="text" name="" placeholder="输入姓名" style="width: 80px">
        <span>+</span>
        <input class="mobile" type="tel" maxlength="11" name="" placeholder="输入手机号">
    </div>
    <div class="hr"></div>
    <div class="comInfoBox clearfix comTitle">
        <p><span>设备信息</span></p>
    </div>
    <div class="comInfoBox">
        <p class="comName clearfix">
            <c:choose>
                <c:when test="${param.type == '1'}">
                    <span>设备类型</span><span style="color: red">*</span>
                    <select class="machineType" class="text" style="-webkit-appearance:none;appearance:none;border:none;padding:0px 10px;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;background-color: #FFFFFF;color:#333333;border-radius:4px;">
                        <option value="ETC">--电子标签--</option>
                        <option value="NO_ETC_FX">--发行设备--</option>
                        <option value="NO_ETC_LY">--蓝牙盒子--</option>
                        <option value="NO_ETC_WB">--微波天线--</option>
                        <option value="NO_ETC_IC">--IC卡读写器--</option>
                        <option value="QT_ETC">--其他--</option>
                    </select>
                </c:when>
                <c:otherwise>
                    <span>服务类型</span><span style="color: red">*</span>
                    <select class="machineType" class="text" style="-webkit-appearance:none;appearance:none;border:none;padding:0px 10px;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;background-color: #FFFFFF;color:#333333;border-radius:4px;">
                        <option value="MACHINE_REPLACE">--设备更换/维修--</option>
                        <option value="MACHINE_BUY">--配件更换/购买--</option
                        <option value="REMOTE_SERVICE">--远程支持服务--</option>
                        <option value="ONLINE_SERVICE">--现场服务--</option>
                        <option value="QT_SERVICE">--其他--</option>
                    </select>
                </c:otherwise>
            </c:choose>
        </p>
        <p class="comName clearfix"><span>SN号</span>
            <textarea class="sn" placeholder="输入SN号,多个请用逗号隔开"></textarea>
        </p>
        <p class="comName clearfix"><span>不良现象</span><span style="color: red">*</span>
            <textarea class="memo" placeholder="输入不良现象"></textarea>
        </p>
    </div>
    <div class="hr"></div>
    <div class="comInfoBox clearfix comTitle">
        <p><span>回寄地址</span></p>
    </div>
    <div class="comInfoBox">
        <p class="layer clearfix">
            <span>所在地</span><span style="color: red">*</span>
            <input id="sel_city" readonly="readonly" type="text" placeholder="省+市+区" onfocus="this.blur();">
            <input type="hidden" name="firstLayer" id="firstLayer" value="" />
            <input type="hidden" name="secondLayer" id="secondLayer" value="" />
            <input type="hidden" name="thirdLayer" id="thirdLayer" value="" />
            <input type="hidden" name="openId" id="openId" value="<%= request.getSession().getAttribute("openId")%>" />
        </p>
        <p class="detailAddress clearfix">
            <span>详细街道地址</span><span style="color: red">*</span>
            <textarea rows="2" placeholder="输入详细地址"></textarea>
        </p>
    </div>
    <!--<div class="uploadBox">-->
    <!--<h2>证件上传（图片小于2M）</h2>-->
    <!--<ul class="js_showBox clearfix">-->
    <!--<li>-->
    <!--<div class="fileBox">-->
    <!--<input type="file" id="imgInput_1" accept="image/*;" capture="camera" />-->
    <!--<div id="filImg_1"><img src="" alt=""></div>-->
    <!--</div>-->
    <!--<p>营业执照</p>-->
    <!--</li>-->
    <!--<li>-->
    <!--<div class="fileBox">-->
    <!--<input type="file" id="imgInput_2" accept="image/*;" capture="camera" />-->
    <!--<div id="filImg_2"><img src="" alt=""></div>-->
    <!--</div>-->
    <!--<p>门头招牌</p>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <a class="submitAudit" type="${param.type == '1' ? 1 : 0}">提交</a>
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
<script src="/static/dist/picker.min.js"></script>
<script src="/static/dist/city.js"></script>
<!--<script src="dist/jquery.uploadView.js"></script>-->
<script src="/static/weui/lib/fastclick.js"></script>
<script>
    $(function() {
        FastClick.attach(document.body);
    });
</script>
<script src="/static/weui/js/jquery-weui.js"></script>
<script src="/static/js/info.js?time=<%=new Date()%>" +></script>
<script type="text/javascript">
    if("null" != "<%= request.getSession().getAttribute("link_name")%>"){
        $(".userNameBox .userName").val("<%= request.getSession().getAttribute("link_name")%>");
        $(".userNameBox .mobile").val("<%= request.getSession().getAttribute("mobile")%>");
        $(".comInfoBox .detailAddress textarea").val("<%= request.getSession().getAttribute("address")%>");
    }
    if("null" != "<%= request.getSession().getAttribute("province")%>"){
        $("#sel_city").val("<%= request.getSession().getAttribute("province")%>"+" "+
            "<%= request.getSession().getAttribute("city")%>"+" "+
            "<%= request.getSession().getAttribute("area")%>");
    }
</script>

</body>
</html>
