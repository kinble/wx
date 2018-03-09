
$(function(){
	checkItem_length();
	$(".reason").on("touchstart" , "a" , function(){
		$(this).addClass("active").siblings("a").removeClass("active");
	})

	$(".searchBox .refresh").on("click" , function(){
		 window.location.reload()
	})
})
function checkItem_length(){
	var item_length  = $(".order-content .shop-group-item").length;
	if(item_length == 0){
		$(".order-blank").show()
	}else{
		$(".order-blank").hide()
	}
}

function SetRemainTime(obj,time) { 
    var SysSecond = parseInt(time);
    var InterValObj = setInterval(function(){
        if (SysSecond > 0) { 
            SysSecond = SysSecond - 1; 
            var second = Math.floor(SysSecond % 60);                  
            var minite = Math.floor((SysSecond / 60) % 60);
            var hour = Math.floor((SysSecond / 3600));
            if(second<10){
                second = "0"+second
                
            }
            if(minite<10){
                minite = "0"+minite
            }
            if(hour<10){
                hour = "0"+hour
            }
            obj.text("剩余支付时间："+hour+"："+minite+"："+second);
        } else {
            clearInterval(InterValObj);
        }
    }, 1000);
    
}
/*我的订单*/
function myOrderAjax(type,str){
	$.ajax({
		url: $ctxRoot+"/mall/order/list",
	    type: "POST",
	    async: false,
	    contentType: "application/json;charset=utf-8",
	    data:JSON.stringify({
	    	queryType: type,
	    	queryParam: str
	    }),
	    success: function (data) {
	    	var order = "";
	    	var orderList;
	    	if(type == 2){
	    		orderList = data.orderList;
	    	}
	    	if(type == 3){
	    		orderList = data.payOrderList;
	    	}
	    	if(type == 4){
	    		orderList = data.pickOrderList;
	    	}
	    	if(type == 5){
	    		orderList = data.actOrderList;
	    	}
	    	for(var i in orderList) {
	    		var prodList = orderList[i].prodList;
	    		order +='<div class="shop-group-item"><input type="hidden" id="orgId" value="'+orderList[i].orgId+'" /><div class="shop-name"><i></i><a href="orderDetail.html?id='+orderList[i].id+'"><h4 class="clearfix">'+orderList[i].orgName+'<span>'+orderList[i].status+'</span></h4></a></div><ul>'
	    		for(var j in prodList){
	    			order+='<li class="clearfix"><input type="hidden" id="prodId" value="'+prodList[j].prodId+'" /><a href="orderDetail.html?id='+orderList[i].id+'"><div class="shop-info"><div class="shop-info-box"><div class="shop-info-img"><img src="'+prodList[j].url+'" /></div>'
					order+=		'<div class="shop-info-text"><h4>'+prodList[j].prodName+'</h4><div class="shop-price clearfix"><div class="shop-pices fl">￥<b class="price">'+prodList[j].price+'</b><span><i></i>￥'+prodList[j].cost+'</span></div>'
					order+=		'<div class="shop-arithmetic fr clearfix">x<span class="num" >'+prodList[j].num+'</span></div></div></div></div></div></a></li>'
	    		}
	    		order +='</ul><div class="allpriceBox"><img src="images/gwj_logo.png" alt="中配节Logo" /><p>共'+orderList[i].totalProdNum
			    order	+='件商品&nbsp;合计<span>￥<b class="allprice">'+orderList[i].totalPrice
			    order	+='</b></span>节省<span>￥<b>'+orderList[i].totalSave
			    order	+='</b></span></p><div class="stateBox clearfix"><input type="hidden" id="orderId" value="'+orderList[i].id+'" />'
				if(orderList[i].actionStatus == -1){
					order += '<a class="buy-again">再次购买</a>'
				}else if(orderList[i].actionStatus == 0){
					order +='<a href="http://weixin.izhongpei.com/wx/get-weixin-code.html?appid=wx3373d8a8b3fe0d99&scope=snsapi_base&redirect_uri=http://weixin.izhongpei.com/wx/mall/pay/third_pay&state='+orderList[i].id+'">立即付款</a><a class="cancel">取消订单</a>'
				}else if(orderList[i].actionStatus == 1){
					order +='<a class="buy-again">再次购买</a>'
				}else if(orderList[i].actionStatus == 3){
					order +='<a class="cancel">取消订单</a>'
				}else if(orderList[i].actionStatus == 4){
					order +='请尽快到POS机付款处付款<a class="cancel">取消订单</a>'
				}

				if(orderList[i].actionStatus == -1){
					order +='</div><span class="pay-time"><input type="hidden" id="validPaySeconds" value="0" /><span></div></div>'
				}else{
					order +='</div><span class="pay-time"><input type="hidden" id="validPaySeconds" value="'+orderList[i].validPaySeconds+'" /><span></div></div>'

				}
				
				
	    	}
	    	$(".order-content").html(order);
	    }
	});
}

// 订单详情
function orderDetailAjax(){
	getwindowUrl();
	$.ajax({
		url: $ctxRoot+"/act/order/detail",
	    type: "POST",
	    async: false,
	    contentType: "application/json;charset=utf-8",
	    data:JSON.stringify({
	    	id: cutList.id
	    }),
	    success: function (data) {
	    	if(data.repCode == 1){
	    		var prodList = data.prodList;
	    		var prod = "";
	    		$(".order-detailheader .shop-name h4 a").text(data.orgName);
	    		$(".order-detailheader .shop-name h4 span").text(data.statusName);
	    		$(".order-detailheader .orderCode").text("订单号："+data.code);
	    		$(".order-detailheader .createDate").text("下单时间："+formatTime(data.createDate));
	    		$(".order-detail .addressBox .name").text(data.addUser);
	    		$(".order-detail .addressBox .mobile").text(data.addMobile);
	    		$(".order-detail .addressBox .address p").text(data.address);
    			$(".order-detail .pay-infoBox p").text("支付方式："+data.payName);
	    		
	    		$(".cen-info #allprice").text(Number(data.totalPrice)+Number(data.totalSave));
	    		$(".cen-info #totalSave").text(data.totalSave);
	    		$(".cen-info p:last span em").text(data.totalPrice);
	    		if(data.actionStatus == -1){
	    			$(".payment-nav").html('');
	    		}else if(data.actionStatus == 0){
	    			$(".payment-nav").html('<p>需要支付：<span>￥</span><i id="payment">'+data.totalPrice+'</i></p><a class="go-order" href="http://weixin.izhongpei.com/wx/get-weixin-code.html?appid=wx3373d8a8b3fe0d99&scope=snsapi_base&redirect_uri=http://weixin.izhongpei.com/wx/mall/pay/third_pay&state='+data.id+'">立即支付</a>');
	    		}else if(data.actionStatus == 1){
	    			$(".payment-nav").html('');
	    		}else if(data.actionStatus == 2){
	    			$(".payment-nav").html('<a class="go-order">联系客服</a>');
	    		}else if(data.actionStatus == 3){
	    			$(".payment-nav").html('<a class="go-order">取消订单</a>');
	    		}else if(data.actionStatus == 4){
	    			$(".payment-nav").html('<p>需要POS机支付：<span>￥</span><i id="payment">'+data.totalPrice+'</i><a class="go-order">取消订单</a></p>');
	    		}
	    		for(var i in prodList){
	    			prod +='<li class="clearfix"><a href="detail.html?prodId='+prodList[i].prodId+'"><div class="shop-info"><div class="shop-info-box"><div class="shop-info-img"><img src="'+prodList[i].url+'" /></div>'
							+'<div class="shop-info-text"><h4>'+prodList[i].prodName+'</h4><div class="shop-price clearfix"><div class="shop-pices fl">￥<b class="price">'+prodList[i].price+'</b></span><span><i></i>￥'+prodList[i].cost+'</span></div>'
								+'<div class="shop-arithmetic fr clearfix">x<span class="num" >'+prodList[i].num+'</span></div></div></div></div></div></a></li>'
	    		}
	    		$(".order-detail>ul").html(prod);
	    	}
	    }
	});
}

// 物流拆分
function deliverysAjax(type){
	$(".spinnerBox").fadeIn();
	$.ajax({
		url: $ctxRoot+"/act/order/deliverys",
	    type: "POST",
	    async: false,
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify({
	    	queryType:type
	    }),
	    success: function (data) {
	    	$(".spinnerBox").fadeOut();
	    	var order = "";
	    	var orderList;
	    	if(type == 4){
	    		orderList = data.cancelOrderList;
	    	}
	    	if(type == 5){
	    		orderList = data.sendOrderList;
	    	}
	    	for(var i in orderList) {
	    		var prodList = orderList[i].prodList;
	    		order +='<div class="shop-group-item"><div class="shop-name"><i></i><h4 class="clearfix">'+orderList[i].orgName+'<span>'+orderList[i].status+'</span></h4></div>'
	    		if(type == 5){
	    			order +='<div class="order-code"><p>订单号：'+orderList[i].code+'</p><p>配送时间：'+formatTime(orderList[i].time)+'</p></div><ul>'
	    		}else if(type == 4){
	    			order +='<div class="order-code"><p>订单号：'+orderList[i].code+'</p><p>申请时间：'+formatTime(orderList[i].time)+'</p></div><ul>'
	    		}
	    		for(var j in prodList){
	    			order+='<li class="clearfix"><div class="shop-info"><div class="shop-info-box"><div class="shop-info-img"><img src="'+prodList[j].url+'" /></div>'
					order+=		'<div class="shop-info-text"><h4>'+prodList[j].prodName+'</h4><div class="shop-price clearfix"><div class="shop-pices fl">￥<b class="price">'+prodList[j].price+'</b><span><i></i>￥'+prodList[j].cost+'</span></div>'
					order+=		'<div class="shop-arithmetic fr clearfix">x<span class="num" >'+prodList[j].num+'</span></div></div></div></div></div></li>'
	    		}
	    		order +='</ul><div class="allpriceBox"><img src="images/gwj_logo.png" alt="中配节Logo" /><p>共'+orderList[i].totalProdNum
			    order	+='件商品&nbsp;合计<span>￥<b class="allprice">'+orderList[i].totalPrice
			    order	+='</b></span></p><div class="stateBox clearfix"><input type="hidden" id="orderId" value="'+orderList[i].id+'" />'
			    if(orderList[i].actionStatus == 1){
			    	order	+='<a class="confirm-btn">确认收货</a></div></div></div>'
			    }else{
			    	order	+='</div></div></div>'
			    }
			    	
	    	}
	    	$(".order-content").html(order);
	    	if(orderList.length == 0){
				$(".order-blank").show()
			}else{
				$(".order-blank").hide()
			}
	    }
	});
}


// 确认收货 
function receiveAjax(obj){
	var orderId = obj.siblings("#orderId").val();
	$.ajax({
		url: $ctxRoot+"/act/order/receive",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data:JSON.stringify({
	    	orderId:Number(orderId)
	    }),
	    success: function (data) {
	    	if(data.repCode == 1){
	    		location.reload(location.href);
	    	}else{
	    		alert(data.repMsg)
	    	}
	    },
	});
}

$(".order-content").on("click" , ".stateBox .cancel" , function(){
	var orderId = $(this).siblings("#orderId").val();
	$.ajax({
		url: $ctxRoot+"/act/order/cancel",
	    type: "POST",
	    data: JSON.stringify({orderId:orderId}),
	    contentType: "application/json;charset=utf-8",
	    success: function (data) {
	    	if(data.repCode == 1){
	    		location.reload(location.href);
	    	}else{
	    		alert(data.repMsg)
	    	}
	    }
	});
});

// 物流拆分导航
$(".split-navBox li").on("click" , function(){
	var _index = $(this).index();
	if(_index == 0){
		deliverysAjax(5);
	}else if(_index == 1){
		deliverysAjax(4);
	}
	
	$(this).addClass("active").siblings().removeClass("active");
	
})

// 剩余支付时间
$(function(){
	$(".pay-time").each(function(){
		var $this = $(this);
		var time = $(this).find("input").val();
		SetRemainTime($this,time);
	})
})

// 再次购买
$(".order-content").on("click", ".stateBox .buy-again" , function(){
	var $this = $(this);
	var orgId = $this.parents(".shop-group-item").find("#orgId").val();
	var prodList = $this.parents(".shop-group-item").find("ul li");
	prodList.each(function(){
		var prodId = $(this).find("#prodId").val();
		$.ajax({     
	        url: $ctxRoot+"/act/cart/edit",
	        type: "POST",
	        contentType: "application/json;charset=utf-8",
	        data:JSON.stringify({
	            prodId: prodId,
	            orgId: orgId,
	            type: 0,
	            num: 1
	        }),
	        success: function (data) {
	            if (data.repCode == 1) {
	            	$(".spinnerBox").fadeIn();
	                setTimeout(function() {
                        window.location.href="list.html"
                    },2000);
	            }else{
	                alert(data.repMsg);
	            }
	        }
	    });
	})

})

// 确认收货
$(".order-content").on("click", ".stateBox .confirm-btn" , function(){
	var $this = $(this);
	receiveAjax($this);
})