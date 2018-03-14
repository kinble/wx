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

var actiionType = ["REPAIR_CREATE", "REPAIR_UPDATE"];

// 完善信息提交$ctxRoot+ /mall/user/perfect
function perfectAjax(type) {
  if(type == 0) {
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
    var detailAddress = $(".comInfoBox .detailAddress textarea").val();

    if (userName == "" || mobile == "" || sn == "" || detailAddress == "") {
        alert("请填写完整信息！");
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
    if(type == 1) {
        var info = {
          "fpType": $(".invoiceInfo .selInvType").val(),
          "invoiceName": $(".invoiceInfo .invName").val(),
          "invoiceCode": $(".invoiceInfo .invCode").val(),
          "invoiceAddress": $(".invoiceInfo .invAdress").val(),
          "invoiceBank": $(".invoiceInfo .invBanck").val(),
          "invoiceBankno": $(".invoiceInfo .invBanckNo").val(),
          "invoiceMobile": $(".invoiceInfo .invMobile").val(),
        };

        if (info.fpType != "VAT"
        && (info.invoiceName == "" || info.invoiceCode == ""
        || info.invoiceAddress == "" || info.invoiceBank == ""
        || info.invoiceBankno == "" || info.invoiceMobile == "")) {
            alert("请填写完整信息！");
            return;
        } else if(info.invoiceName == "" || info.invoiceCode == "") {
            alert("请填写完整信息！");
            return;
        }
    }

    $(".spinnerBox").fadeIn();
    $.ajax({
        //url: "http://localhost:8081",
        url: "http://genvict.ngrok.xiaomiqiu.cn/genvict/onlineRepairSaveBackCallController.action?ifaceNum="+actiionType[type],
        type: "POST",
        data: {"json": JSON.stringify(info)},
        success: function (data) {
            if (data.RESPONSETYPE === "SUCCESS") {
                $(".spinnerBox").fadeOut();
                alert("提交成功！");
                wx.closeWindow();
                //window.location.href = "login.html"
            } else {
                alert(data.RESPONSEMESSAGE);
                $(".spinnerBox").fadeOut();
            }
        }
    });
}

function infoLoad() {
    orderId = getwindowUrl().orderId;
    $.get("http://192.168.3.15:8081/genvict/findOrderBackCallController.action",
        {orderId: orderId}, function (info) {
            if ("SUCCESS" === info.RESPONSETYPE) {
                info = info.RESPONSEMESSAGE;
                $(".userInfo .linkName").text(info.linkName);
                $(".userInfo .mobile").text(info.mobile);
                $(".userInfo .machineType").text(info.machineType);
                $(".userInfo .shelfLife").text(info.shelfLife == "Y" ? "是" : "否 ");
                $(".userInfo .snCode").text(info.snCode);
                $(".userInfo .description").text(info.description);
                $(".userInfo .pca").text(info.province + " " + info.city + " " + info.area);
                $(".userInfo .address").text(info.address);
                $(".userInfo .orderNum").text(info.orderNum);
                $(".userInfo .orderPrice").text(info.orderPrice);
            }
        });
}

$(".closeBtn").on("touchstart", function () {
    wx.closeWindow();
})

$(".submitBtn").on("touchstart", function () {
    perfectAjax(1);
})

$(".selInvType").on("change", function() {
  $(".special").toggle();
})

$(".invoiceBtn").on("touchstart", function () {
    $(".invoiceInfo").toggle();
    var btn = $(".invoiceBtn").text();
    if (btn === "申请开票"){
      $(".invoiceBtn").text("不开票");
    } else {
      $(".invoiceBtn").text("申请开票");
    }
})

$(".submitAudit").on("touchstart", function() {
    perfectAjax(0);
})
