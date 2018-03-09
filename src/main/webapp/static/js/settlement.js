function cenAjax(){
	getwindowUrl();
	$.ajax({     
	    url: $ctxRoot+"/act/cart/cen",
	    type: "POST",
	    async: false,
	    contentType: "application/json;charset=utf-8",
	    data:cutList.cartId,
	    success: function (data) {
	      if(data.repCode == 1){
	      	   var cdcList = data.cdcList;
		       var addressList = data.addressList;
		       var cdc = "";
		       var address = "";
		       for (var i in cdcList){
		       		cdc += '<div class="shop-group-item"><input type="hidden" name="" class="totalSave" value="'+cdcList[i].totalSave+'"><div class="shop-name"><i></i><h4><a href="#">发货门店：'+cdcList[i].orgName+'</a></h4><input type="hidden" name="" id="orgId" value="'+cdcList[i].orgId+'" /><input type="hidden" name="" id="isCenter" value="'+cdcList[i].isCenter+'" /></div><ul>'
		       		var prodList = cdcList[i].prodList;
		       		var serCdcList = cdcList[i].serCdcList
		       		for(var j in prodList){
		       			cdc += '<li class="clearfix"><div class="shop-info"><a href="detail.html?prodId='+prodList[j].prodId+'"><div class="shop-info-box"><div class="shop-info-img"><img src="'+prodList[j].url
		       			cdc	+='" /></div><div class="shop-info-text"><h4>'+prodList[j].prodName+'</h4><input type="hidden" name="" id="cartId" value="'+prodList[j].cartId+'"><div class="shop-price clearfix"><div class="shop-pices fl">￥<b class="price">'+prodList[j].price
		       			cdc +='</b><span><i></i>￥'+prodList[j].cost+'</span></div><div class="shop-arithmetic fr clearfix">x<span class="num" >'+prodList[j].num+'</span></div></div></div></div></div></a><div class="hr"></div></li>'
		       		}
		       		cdc += '</ul><div class="shopPrice">本站点总计：￥<span class="shop-total-amount ShopTotal">'+cdcList[i].storeTotalPrice+'</span></div><div class="pay-infoBox"><p class="pay-header">发货至售后门店：'+cdcList[i].serCdcList[0].serOrgName+'<input type="hidden" name="" id="serOrgId" value="'+cdcList[i].serCdcList[0].serOrgId+'" /></p><div class="pay-info">选择支付方式</div><i class="icon-btn"></i></div>'		       		
		       }
		       $(".settlement").html(cdc);

		       for(var i in addressList){
		       		if(addressList[i].isDef == 1){
		       			$(".cen-address .name").text(addressList[i].receiver);
		       			$(".cen-address .mobile").text(addressList[i].mobile);
		       			$(".cen-address .address p").text(addressList[i].address);
		       			$(".cen-address .address input").val(addressList[i].id);
		       			address += '<li class="usable selected"><div class="addressBox"><div class="nameBox clearfix"><span class="name">'+addressList[i].receiver+'</span><span class="mobile">'+addressList[i].mobile
		       					+	'<i></i></span></div><div class="address"><i></i><p>'+addressList[i].address+'</p><input type="hidden" name="" id="addressId" value="'+addressList[i].id+'"></div><i class="modify-btn"></i><p></p></div></li>'
		       		}else if(addressList[i].status == 0){
		       			$(".cen-address .name").text(addressList[0].receiver);
		       			$(".cen-address .mobile").text(addressList[0].mobile);
		       			$(".cen-address .address p").text(addressList[0].address);
		       			$(".cen-address .address input").val(addressList[0].id);
		       			address += '<li class="usable"><div class="addressBox"><div class="nameBox clearfix"><span class="name">'+addressList[i].receiver+'</span><span class="mobile">'+addressList[i].mobile
		       					+	'<i></i></span></div><div class="address"><i></i><p>'+addressList[i].address+'</p><input type="hidden" name="" id="addressId" value="'+addressList[i].id+'"></div><i class="modify-btn"></i><p></p></div></li>'
		       		}else{
		       			address += '<li class="disabled"><div class="addressBox"><div class="nameBox clearfix"><span class="name">'+addressList[i].receiver+'</span><span class="mobile">'+addressList[i].mobile
		       					+	'<i></i></span></div><div class="address"><i></i><p>'+addressList[i].address+'</p><input type="hidden" name="" id="addressId" value="'+addressList[i].id+'"></div><i class="modify-btn"></i><p>'+addressList[i].statusName+'</p></div></li>'
		       		}

		       }
				$(".popup .popup-address ul").html(address);
				$("#code").val(data.actPromoCode);
	      }else{
	      	$(".cen-address .address p").text(data.repMsg);
	      }

	    }
	});
}
cenAjax();

//订单提交
function submitAjax(){
	var channel = 1;
	var addressId = $(".cen-address .address #addressId").val();
	var cartIdList=[], cdc = [];
	$(".shop-group-item>ul li").each(function(){
		var cartId = Number($(this).find("#cartId").val());
		cartIdList.push({"cartId":cartId});
	})
	$(".shop-group-item").each(function(){
		var $this = $(this);
		var orgId = $this.find("#orgId").val();
		var shipCode = "BYMD";
		var payCode = $(".popup-pay li input:checked").val();
		var serOrgId = $("#serOrgId").val();
		var content = null;
		cdc.push({"orgId":orgId,"shipCode":shipCode,"payCode":payCode,"serOrgId":serOrgId,"content":content});

	})

	if($(".popup-pay li input:checked").val() == undefined){
		alert("请选择支付方式")
	}else{
		$.ajax({
			url: $ctxRoot+"/act/cart/submit",
		    type: "POST",
		    contentType: "application/json;charset=utf-8",
		    data: JSON.stringify({
		    	cartIdList:cartIdList,
		    	cdc:cdc,
		    	addressId:addressId,
		    	channel:channel
		    }),
		    success: function (data) {
		    	if(data.repCode == 1){
		    		var payCode = $(".popup-pay li input:checked").val();
		    		window.location.href="goOrder.html?payCode="+payCode;
		    	}else{
		    		alert(data.repMsg);
		    	}
		    }

		});
	}
	
}
// 校验code
function couponCheckAjax(){
	var code = $("#code").val();
	if(code == ''){
		alert("交易码为空")
	}else{
		$.ajax({
			url: $ctxRoot+"/act/couponCheck",
		    type: "POST",
		    contentType: "application/json;charset=utf-8",
		    data: JSON.stringify({
		    	code:code
		    }),
		    success: function (data) {
		    	if(data.repCode == 1){
		    		submitAjax()
		    	}else{
		    		alert(data.repMsg);
		    	}
		    }

		});
	}	
}

function popupShow(){//弹出显示
	$(".popup").css({
		"left":"0",
		"opacity": "1"
	});
}
function popupHide(){//弹出隐藏
	$(".popup").css({
		"left":"100%",
		"opacity": "0"
	});
}
function editShow(){//弹出显示
	$(".edit-address").css({
		left:"0",
		opacity:"1"
	});
}
function editHide(){//弹出隐藏
	$(".edit-address").css({
		"left":"-100%",
		"opacity": "0"
	});
}

/* 收货信息 */
function address_actionAjax(){
    var actionType = $("#actionType").val();
    var addressId = $(".edit-addressBox #addrId").val();
    var receiver = $("#receiver").val();
    var mobile = $("#mobile").val();
    var address = $("#address").val();
    var areaId = $("#areaId").val();
    if(receiver!="" && mobile!="" && address!=""){
        $.ajax({
            url: $ctxRoot+"/mall/user/address_action",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            async: false,
            data:JSON.stringify({
                actionType: actionType,
                addressId: addressId,
                receiver: receiver,
                mobile: mobile,
                areaId: areaId,
                address: address
            }),
            success: function (data) {
                if(data.repCode == 1){
                	window.location.reload();
                }else{
                    alert(data.repMsg);
                }
            }
        });
    }else{
        alert("提交信息不完全！")
    }
    
}

//显示收货信息列表
$(".cen-address").on("click" , function(){
	popupShow();//显示
	$(".popup-address").show();
})

//选择收货信息
$(".popup .popup-address .usable").on("click", function(){
	popupHide();//隐藏
	$(".popup-address").fadeOut(500);
	var name = $(this).find(".name").text();
	var mobile = $(this).find(".mobile").text();
	var address = $(this).find(".address p").text();
	var addressId = $(this).find(".address input").val();
	$(this).addClass("selected").siblings().removeClass("selected");
	$(".cen-address .nameBox .name").text(name);
	$(".cen-address .nameBox .mobile").text(mobile);
	$(".cen-address .address p").text(address);
	$(".cen-address .address input").val(addressId);
})

//编辑收货信息
$(".addressBox .modify-btn").on("click", function(event){
	event.stopPropagation();
	editShow();
	$(".edit-hide").show();
	var addressId = $(this).siblings(".address").find("#addressId").val();
    var address = $(this).siblings(".address").find("p").text();
    var name = $(this).siblings(".nameBox").find(".name").text();
    var mobile = $(this).siblings(".nameBox").find(".mobile").text();
    // console.log(address+"/"+name+"/"+mobile)
    $(".edit-addressBox #addrId").val(addressId);
    $(".edit-addressBox #actionType").val(0);
    $("#receiver").val(name);
    $("#mobile").val(mobile);
    $("#address").val(address);
    $("#sel_city").val("");
})
picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
    $("#areaId").val(selectedVal[2]);
});

//新增收货信息
$(".popup .popup-address .add-addressBtn").on("click", function(){
	editShow();
	$(".edit-hide").show();
	$(".edit-address .edit-addressBox input").val("");
    $(".edit-addressBox #actionType").val(1);
})

//隐藏编辑信息
$(".edit-hide").on("click", function(){
	editHide();
	$(this).hide();
})
// //提交编辑收货信息
$(".edit-address .edit-submitBtn").on("click" , function(){
	address_actionAjax();
	editHide();
})

/*支付信息*/
//显示

$(".shop-group-item .pay-infoBox").on("click" , function(){
	popupShow()
	
})
// 隐藏
$(".popup-pay li").on("click" , function(){
	var _text = $(this).find("p").text();
	$(this).find(".pay-check").prop("checked" , true);
	$(this).siblings().find(".pay-check").prop("checked" , false);
	$(".pay-infoBox .pay-info").text(_text);
	popupHide()
})
//结算计算
function countPrice(){
	var allprice = 0; //总价
	var payment = 0;//需要支付
	var totalS = 0;
	$(".price").each(function(){
		var price = parseFloat($(this).text()); //单价
		var num = parseInt($(this).parent().siblings().find(".num").text()); //数量
		var total = price * num; //计算单个商品的总价
		allprice += total; //所有商品总计
	});
	$(".totalSave").each(function(){
		var totalSave = parseFloat($(this).val()); 
		totalS += totalSave; 
	});
	$("#allprice").text(allprice.toFixed(2));
	$("#totalSave").text(totalS.toFixed(2));
	payment = allprice;
	$("#payment").text(payment.toFixed(2))
}
countPrice()

//订单提交
$(".payment-nav .go-order").on("click" , function(){
	couponCheckAjax();
})
