
$(".userTypeBox ul li").on("click" , function(){
    $(this).addClass("active").siblings().removeClass("active");
})

$(".comInfoBox .checked-addr span i").on("click" , function(){
    $(this).addClass("active");
    $(this).parent().siblings().find("i").removeClass("active");
})

$(".comInfoBox .checked-addr span:last i").on("click" , function(){
    $(".comInfoBox .addrBox").fadeIn();
})
$(".comInfoBox .checked-addr span:first i").on("click" , function(){
    $(".comInfoBox .addrBox").fadeOut();
})

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
    $("#firstLayer").val(selectedVal[0]);
    $("#secondLayer").val(selectedVal[1]);
    $("#thirdLayer").val(selectedVal[2]);
});

$(function(){
    getwindowUrl();
    $(".userNameBox .mobile").val(cutList.memberMobile);
})


// 完善信息提交$ctxRoot+ /mall/user/perfect
function perfectAjax(type){
    getwindowUrl()
    var userName = $(".userNameBox .userName").val();
    var mobile = $(".userNameBox .mobile").val();
    var type = $(".comInfoBox .machieType").val();
    var sn = $(".comInfoBox .sn").val();
    var memo = $(".comInfoBox .memo").val();
    var firstLayer = $("#firstLayer").val();
    var secondLayer = $("#secondLayer").val();
    var thirdLayer = $("#thirdLayer").val();
    var detailAddress = $(".comInfoBox .detailAddress textarea").val();
    /*var scr_1 = $("#filImg_1 img").attr("src");
    var scr_2 = $("#filImg_2 img").attr("src")
    var licenceBit = scr_1.split(",")[1];
    var doorBit = scr_2.split(",")[1];
    var licenceSuffix = scr_1.substring(scr_1.indexOf("/")+1,scr_1.indexOf(";"));
    var doorSuffix = scr_2.substring(scr_2.indexOf("/")+1,scr_2.indexOf(";")); */
    var address= {"receiver":userName, "mobile":mobile, "areaId":thirdLayer, "address":detailAddress};

    if(userName == "" || mobile =="" || sn == "" || detailAddress == ""){
        alert("请填写完整信息！");
    }else{
       var info = {
           mobile: mobile,
           name: userName,
           type: type,
           sn: sn,
           memo: memo,
           province: firstLayer,
           city: secondLayer,
           county: thirdLayer,
           detailAddres: detailAddress,
       };

       console.log(info);

        $(".spinnerBox").fadeIn();
        $.ajax({
            url: $ctxRoot+"/mall/user/perfect",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                userNameMobile: mobile,
                userName: userName,
                type: type,
                sn: sn,
                memo: memo,
                firstLayer: firstLayer,
                secondLayer: secondLayer,
                thirdLayer: thirdLayer,
                detailAddres: detailAddress,
                // licenceBit: licenceBit,
                // licenceSuffix: licenceSuffix,
                // doorBit: doorBit,
                // doorSuffix: doorSuffix,
                address: address
            }),
            success: function (data) {
                if(data.repCode == 1){
                    $(".spinnerBox").fadeOut();
                    alert("提交成功！");
                    window.location.href = "login.html"
                }else{
                    alert(data.repMsg);
                    $(".spinnerBox").fadeOut();
                }
            }
        });
    }

}
$(".submitAudit").on("touchstart" , function(){
    perfectAjax(0)
})
