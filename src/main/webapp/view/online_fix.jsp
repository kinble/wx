<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + path;
%>
<!doctype html>
<html lang="en">
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
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta content="telephone=no" name="format-detection" />
    <link rel="stylesheet" type="text/css" href="/static/css/reset.css">
    <link rel="stylesheet" type="text/css" href="/static/css/main.css">
    <title>在线报修</title>
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
			<span>联系人</span>
			<input class="userName" type="text" name="" placeholder="输入姓名">
			<span>+</span>
			<input class="mobile" type="number" maxlength="11" name="" placeholder="输入手机号">
		</div>
		<div class="hr"></div>
    <div class="comInfoBox clearfix comTitle">
      <p><span>设备信息</span></p>
    </div>
    <div class="comInfoBox">
			<p class="comName clearfix"><span>设备类型</span>
        <select class="machineType" class="text" style="-webkit-appearance:none;appearance:none;border:none;padding:0px 10px;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;background-color: #FFFFFF;color:#333333;border-radius:4px;">
            <option value="ETC">--电子标签--</option>
            <option value="UNITOLL_ETC">--非电子标签--</option>
        </select>
			</p>
			<p class="comName clearfix"><span>SN号</span>
				<textarea class="sn" placeholder="输入SN号,多个请用逗号隔开"></textarea>
			</p>
			<p class="comName clearfix"><span>不良现象</span>
				<textarea class="memo" placeholder="输入不良现象"></textarea>
			</p>
    </div>
    <div class="hr"></div>
    <div class="comInfoBox clearfix comTitle">
      <p><span>回寄地址</span></p>
    </div>
		<div class="comInfoBox">
			<p class="layer clearfix">
				<span>所在地</span>
				<input id="sel_city" readonly="readonly" type="text" placeholder="省+市+区" onfocus="this.blur();">
				<input type="hidden" name="firstLayer" id="firstLayer" value="" />
				<input type="hidden" name="secondLayer" id="secondLayer" value="" />
				<input type="hidden" name="thirdLayer" id="thirdLayer" value="" />
				<input type="hidden" name="openId" id="openId" value="<%= request.getSession().getAttribute("openId")%>" />
			</p>
			<p class="detailAddress clearfix">
				<span>详细街道地址</span>
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
		<a class="submitAudit">提交</a>
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
<script src="/static/js/info.js"></script>
<script>
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
