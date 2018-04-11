<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="jssdk.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + path;
	String openId = request.getSession().getAttribute("openId")+"";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport"
		  content="width=device-width,initial-scale=1,user-scalable=0">
	<title>金溢科技-在线支付</title>
	<link rel="stylesheet" href="<%=path%>/static/weui/lib/weui.css" />
	<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
	<link rel="stylesheet" href="<%=path%>/css/index.css" />
</head>
<body>
<div class="container js_container"></div>
<div class="page">

	<%--<div class="hd">--%>
		<%--<h3 ><p class="page_desc">设备购买在线支付</p></h3>--%>
	<%--</div>--%>

	<div class="bd">
		<div class="weui_cells_title">微信支付</div>
		<div class="weui_cells">
			<div class="weui_cell">
				<div class="weui_cell_hd">
					<label class="weui_label">金额(¥)</label>
				</div>
				<div class="weui_cell_bd weui_cell_primary">
					<input class="weui_input" type="number" id="count" placeholder="请输入数字金额,单位元">
				</div>
			</div>
			<div class="weui_cell">
				<div class="weui_cell_hd">
					<label class="weui_label">备注</label>
				</div>
				<div class="weui_cell_bd weui_cell_primary">
					<input class="weui_input" type="" id="remark" placeholder="请输入备注信息">
				</div>
			</div>
			<div class="weui_cells weui_cells_checkbox">
				<label class="weui_cell weui_check_label" for="needInv">
					<div class="weui_cell_hd">
						<input type="checkbox" class="weui_check needInv" name="remember" id="needInv" >
						<i class="weui_icon_checked"></i>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>开票</p>
					</div>
				</label>
			</div>

			<div id = 'inv' class="inv">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label class="weui_label">发票类型</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<select class="selInvType" class="text"
								style="-webkit-appearance:none;appearance:none;border:none;padding:0px 10px;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;background-color: #FFFFFF;color:#333333;border-radius:4px;font-size:17px;">
							<option value="PLAIN">--普通发票--</option>
							<option value="VAT">--增值税专用发票--</option>
						</select>
					</div>
				</div>

				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label class="weui_label">开票抬头</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input invName" type="text" name="" placeholder="输入开票抬头"/>
					</div>
				</div>

				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label class="weui_label">开票税号</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input invCode" type="text" name="" placeholder="输入开票税号"/>
					</div>
				</div>
				<div class="special" style="padding: 0;">
					<div class="weui_cell">
						<div class="weui_cell_hd">
							<label class="weui_label">注册地址</label>
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<input class="weui_input invAdress" type="text" name="" placeholder="输入注册地址"/>
						</div>
					</div>
					<div class="weui_cell">
						<div class="weui_cell_hd">
							<label class="weui_label">开户银行</label>
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<input class="weui_input invBank" type="text" name="" placeholder="输入开户银行"/>
						</div>
					</div>
					<div class="weui_cell">
						<div class="weui_cell_hd">
							<label class="weui_label">开户账号</label>
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<input class="weui_input invBanckNo" type="number" name="" placeholder="输入开户账号"/>
						</div>
					</div>
					<div class="weui_cell">
						<div class="weui_cell_hd">
							<label class="weui_label">电话</label>
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<input class="weui_input invMobile" type="number" name="" placeholder="输入电话"/>
						</div>
					</div>
				</div>

			</div>
			<div class="weui_btn_area">
				<input type="button"  onclick="wxpay_cust();" class="weui_btn weui_btn_primary"   value="提交"/>
			</div>
		</div>
	</div>

</div>
<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
<script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
<!-- layer -->
<script src="<%=path %>/static/layer/layer.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
<script type="text/javascript">
	/* 微信支付 */
    function wxpay_cust(){
        var total_fee=$("#count").val();
        var remark=$("#remark").val();
        if(total_fee == ""){
            $.alert("请输入正确的支付金额", "提示！");
            return;
		}
        $.showLoading("正在加载...");
        var info;
        if($("#needInv").prop("checked")){
            info = {
                openId:'<%=openId%>',
                total_fee:total_fee,
                remark:remark,
                fpType: $(".selInvType").val(),
                invoiceName: $(" .invName").val(),
                invoiceCode: $(" .invCode").val(),
                invoiceAddress: $(" .invAdress").val(),
                invoiceBank: $(" .invBank").val(),
                invoiceBankno: $(" .invBanckNo").val(),
                invoiceMobile: $(" .invMobile").val()
            };
		}else{
            info = {
                openId:'<%=openId%>',
                total_fee:total_fee,
                remark:remark
            };
		}
        $.post("<%=path %>/pay",info
            ,
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
                    $.alert(res.message, "支付失败！",function() {
                        //wx.closeWindow();
                    });
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
                    layer.msg("支付成功", {shift: 6});
                    wx.closeWindow();
                    //self.location="<%=path %>/course/getOrderCourseById?id=${course.id }+&openId=${openId} ";
                }else{
                    //alert(JSON.stringify(res));
                    layer.msg("支付失败", {shift: 6});
                    //wx.closeWindow();
                }
            }
        );
    }

    $(".selInvType").on("change", function () {
        $(".special").toggle();
    })

    $(".needInv").on("change", function () {
        $(".inv").toggle();
    })

    $(".special").toggle();
    $(".inv").toggle();
</script>
</body>
</html>