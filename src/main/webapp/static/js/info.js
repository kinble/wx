$(".userTypeBox ul li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
})

$(".comInfoBox .checked-addr span i").on("click", function () {
    $(this).addClass("active");
    $(this).parent().siblings().find("i").removeClass("active");
})

$(".comInfoBox .checked-addr span:last i").on("click", function () {
    $(".comInfoBox .addrBox").fadeIn();
})
$(".comInfoBox .checked-addr span:first i").on("click", function () {
    $(".comInfoBox .addrBox").fadeOut();
})

var serverApi = "http://192.168.31.19:8083/genvict/";
//var serverApi = "http://genvict.ngrok.xiaomiqiu.cn/genvict/";
//var serverApi = "http://test.imema.top/genvict/";


//0-创建订单，1-修改订单
var actionTypeCfg = ["REPAIR_CREATE", "REPAIR_UPDATE"];

//0-在线报障，1-在线报修
var fixTypeCfg = ["onlineBugSaveBackCallController.action", "onlineRepairSaveBackCallController.action"];

// 完善信息提交$ctxRoot+ /mall/user/perfect
function perfectAjax(fixType,  actionType) {
    if (actionType == 0) {
        var userName = $(".userNameBox .userName").val();
        var mobile = $(".userNameBox .mobile").val();
        var machineType = $(".comInfoBox .machineType").val();
        var sn = $(".comInfoBox .sn").val();
        var memo = $(".comInfoBox .memo").val();
        var p_c_a = $("#sel_city").val();
        var openId = $("#openId").val();
        var plist = p_c_a.split(" ");
        if (plist.length == 2) {
            plist.push("");
        }

        if (machineType == "NO_ETC_LY") {
            $.alert("您好！有关蓝牙盒子的报修问题，请拨打<a href=\"tel:400-888-9369\">400-888-9369</a>，由客服专员为您服务。", "提示");
            return;
        }

        var detailAddress = $(".comInfoBox .detailAddress textarea").val();
        if (mobile.length != 11) {
            $.alert("请输入完整的手机号码！", "提示");
            return;
        }

        if (userName == "" ) {
            $.alert("请填写联系人！", "提示");
            return;
        }

        if (sn == "" && plist[0] == "广东省" && machineType == "ETC") {
            $.alert("广东省电子标签请填写SN号！", "提示");
            return;
        }

        if (memo == "" ) {
            $.alert("请填写设备不良现象！", "提示");
            return;
        }
        if (p_c_a == "" ) {
            $.alert("请选择回寄设备的省市县！", "提示");
            return;
        }
        if (detailAddress == "" ) {
            $.alert("请填写回寄设备的详细地址！", "提示");
            return;
        }

        var info = {
            openId: openId,
            mobile: mobile,
            linkName: userName,
            machineType: machineType,
            snCode: sn,
            description: memo,
            province: plist[0],
            city: plist[1],
            area: plist[2],
            address: detailAddress
        };

    }
    /*var scr_1 = $("#filImg_1 img").attr("src");
     var scr_2 = $("#filImg_2 img").attr("src")
     var licenceBit = scr_1.split(",")[1];
     var doorBit = scr_2.split(",")[1];
     var licenceSuffix = scr_1.substring(scr_1.indexOf("/")+1,scr_1.indexOf(";"));
     var doorSuffix = scr_2.substring(scr_2.indexOf("/")+1,scr_2.indexOf(";")); */
    if (actionType == 1) {
        var info = {
            "id": $(".userInfo .orderId").val(),
            "fpType": $(".invoiceInfo .selInvType").val(),
            "invoiceName": $(".invoiceInfo .invName").val(),
            "invoiceCode": $(".invoiceInfo .invCode").val(),
            "invoiceAddress": $(".invoiceInfo .invAdress").val(),
            "invoiceBank": $(".invoiceInfo .invBank").val(),
            "invoiceBankno": $(".invoiceInfo .invBanckNo").val(),
            "invoiceMobile": $(".invoiceInfo .invMobile").val(),
        };

        if (info.fpType === "VAT"
            && (info.invoiceName === "" || info.invoiceCode === ""
            || info.invoiceAddress === "" || info.invoiceBank === ""
            || info.invoiceBankno === "" || info.invoiceMobile === "")) {
            $.alert("请填写完整信息！", "操作错误！");
            //$.toast("请填写完整信息!");
            return;
        } else if (info.invoiceName === "" || info.invoiceCode === "") {
            $.alert("请填写完整信息！", "操作错误！");
            return;
        }
    }
    $.confirm("您确定要提交"+((actionType == 1 ?"发票信息":(fixType==0?"报障信息":"报修信息")))+"吗?", "确认操作?", function() {
        $(".spinnerBox").fadeIn();
        $.ajax({
            //url: "http://localhost:8081",
            url: serverApi + fixTypeCfg[fixType] + "?ifaceNum=" + actionTypeCfg[actionType],
            type: "POST",
            data: {"json": JSON.stringify(info)},
            success: function (data) {
                if (data.RESPONSETYPE === "SUCCESS") {
                    $(".spinnerBox").fadeOut();
                    //$.alert("提交成功！", "提示");
                    alert("提交成功！");
                    wx.closeWindow();
                    //window.location.href = "login.html"
                } else {
                    //$.alert(data.RESPONSEMESSAGE, "警告！");
                    alert(data.RESPONSEMESSAGE);
                    $(".spinnerBox").fadeOut();
                }
            }
        });
    }, function() {
        return false;
    });
}

function infoLoad() {
    var paramData = getwindowUrl();
    orderId = paramData.orderId;
    needInvoice = paramData.needInvoice;

    $.get(serverApi + "findOrderBackCallController.action?t="+Math.random(),
        {orderId: orderId}, function (info) {
            if ("SUCCESS" === info.RESPONSETYPE) {
                info = info.RESPONSEMESSAGE;
                $(".userInfo .linkName").text(info.linkName);
                $(".userInfo .mobile").text(info.mobile);
                $(".userInfo .machineType").text(info.machineType);
                $(".userInfo .snCode").text(info.snCode);
                $(".userInfo .description").text(info.description);
                $(".userInfo .pca").text(info.province + " " + info.city + " " + info.area);
                $(".userInfo .address").text(info.address);
                $(".userInfo .orderNum").text(info.orderNum);
                $(".userInfo .payStatus").text(info.payStatus == "1" ? "已支付" : "未支付");
                $(".userInfo .orderId").val(info.id);
                $(".userInfo .lgCode").text(info.lgCode);
                $(".userInfo .lgCompany").text(info.lgCompany);
                if(info.orderStatus == 'SUBMIT'){
                    $(".userInfo .shelfLife").text("待确认");
                    $(".userInfo .orderPrice").text("待确认");
                }else{
                    $(".userInfo .shelfLife").text(info.shelfLife == "Y" ? "是" : "否 ");
                    $(".userInfo .orderPrice").text(info.orderPrice);
                }
                if(info.orderType == "ONLINE_REPAIR"){
                    document.title = '报修订单详情';
                }else{
                    $(".bug_hide").hide();
                    document.title = '报障订单详情';
                }
                var order_status = info.orderStatus;
                var close_status = info.closeStatus;
                var statuStr="";

                if("SUBMIT" == order_status){
                    statuStr="已提交";
                }else if("APPROVED"==order_status){
                    if("CANCEL"==close_status){
                        statuStr="已取消";
                    }else{
                        statuStr="处理中";
                    }
                }else if("COMPLETE"==order_status){
                    if("CANCEL"==close_status){
                        statuStr="已取消";
                    }else if("AUTO_CLOSE"==close_status){
                        statuStr="自动完成";
                    }else{
                        statuStr="已完成";
                    }
                }

                $(".userInfo .orderStatus").text(statuStr);




                if (needInvoice === "1") {
                    $(".invoiceInfo .selInvType").val(info.fpType);
                    $(".invoiceInfo .invName").val(info.invoiceName);
                    $(".invoiceInfo .invCode").val(info.invoiceCode);
                    $(".invoiceInfo .invAdress").val(info.invoiceAddress);
                    $(".invoiceInfo .invBank").val(info.invoiceBank);
                    $(".invoiceInfo .invBanckNo").val(info.invoiceBankno);
                    $(".invoiceInfo .invMobile").val(info.invoiceMobile);
                    if(info.fpType === "VAT") {
                        $(".invoiceInfo .selInvType").change();
                    }
                }
            }
        });
}


$(".closeBtn").on("touchstart", function () {
    if(history.length>1){
        window.history.go(-1);
    }else{
        wx.closeWindow();
    }

})

$(".submitBtn").on("touchstart", function () {
    perfectAjax(1, 1);
})

$(".selInvType").on("change", function () {
    $(".special").toggle();
})

$(".invoiceBtn").on("touchstart", function () {
    $(".invoiceInfo").toggle();
    var btn = $(".invoiceBtn").text();
    if (btn === "申请开票") {
        $(".invoiceBtn").text("不开票");
    } else {
        $(".invoiceBtn").text("申请开票");
    }

    $(".submitBtn").toggle();
    $(".closeBtn").toggle();
})

$(".submitAudit").on("touchstart", function () {
    var type = $(this).attr("type");
    perfectAjax(type, 0);
})
