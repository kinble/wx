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

$(function () {
    getwindowUrl();
    $(".userNameBox .mobile").val(cutList.memberMobile);
})


// 完善信息提交$ctxRoot+ /mall/user/perfect
function perfectAjax(type) {
    getwindowUrl()
    var userName = $(".userNameBox .userName").val();
    var mobile = $(".userNameBox .mobile").val();
    var type = $(".comInfoBox .machineType").val();
    var sn = $(".comInfoBox .sn").val();
    var memo = $(".comInfoBox .memo").val();
    var p_c_a = $("#sel_city").val();
    var openId = $("#openId").val();
    var plist = p_c_a.split(" ");
    if (plist.length == 2) {
        plist.push("");
    }
    var detailAddress = $(".comInfoBox .detailAddress textarea").val();
    /*var scr_1 = $("#filImg_1 img").attr("src");
    var scr_2 = $("#filImg_2 img").attr("src")
    var licenceBit = scr_1.split(",")[1];
    var doorBit = scr_2.split(",")[1];
    var licenceSuffix = scr_1.substring(scr_1.indexOf("/")+1,scr_1.indexOf(";"));
    var doorSuffix = scr_2.substring(scr_2.indexOf("/")+1,scr_2.indexOf(";")); */

    if (userName == "" || mobile == "" || sn == "" || detailAddress == "") {
        alert("请填写完整信息！");
    } else {

        var info = {
            openId: openId,
            mobile: mobile,
            linkName: userName,
            machineType: type,
            snCode: sn,
            description: memo,
            province: plist[0],
            city: plist[1],
            area: plist[2],
            address: detailAddress,
        };

        console.log(info);

        $(".spinnerBox").fadeIn();
        $.ajax({
            //url: "http://localhost:8081",
            url: "http://genvict.ngrok.xiaomiqiu.cn/genvict/onlineRepairSaveBackCallController.action",
            type: "POST",
            data: {"json": JSON.stringify(info)},
            success: function (data) {
                if (data.RESPONSETYPE == "SUCCESS") {
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
}

function infoLoad() {
    orderId = getwindowUrl().orderId;
    $.get("http://192.168.3.15:8081/genvict/findOrderBackCallController.action",
        {orderId: orderId}, function (info) {
            console.log(info);
            if ("SUCCESS" == info.RESPONSETYPE) {
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

$(".submitAudit").on("touchstart", function () {
    perfectAjax(0)
})
