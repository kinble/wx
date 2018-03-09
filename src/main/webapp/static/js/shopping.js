window.onload=function(){
	//侧滑显示删除按钮
	var expansion = null; //是否存在展开的list
	var container = document.querySelectorAll('.shopping li .shop-info');
	for(var i = 0; i < container.length; i++){    
	    var x, y, X, Y, swipeX, swipeY;
	    container[i].addEventListener('touchstart', function(event) {
	        x = event.changedTouches[0].pageX;
	        y = event.changedTouches[0].pageY;
	        swipeX = true;
	        swipeY = true ;
	        if(expansion){   //判断是否展开，如果展开则收起
	            expansion.removeClass("swipeleft");
	        }        
	    });
	    container[i].addEventListener('touchmove', function(event){
	        
	        X = event.changedTouches[0].pageX;
	        Y = event.changedTouches[0].pageY;        
	        // 左右滑动
	        if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
	            // 阻止事件冒泡
	            event.stopPropagation();
	            if(X - x > 10){   //右滑
	                event.preventDefault();
	                // this.className = "";    //右滑收起
	                $(this).removeClass("swipeleft");
	            }
	            if(x - X > 10){   //左滑
	                event.preventDefault();
	                // this.className = "swipeleft";   //左滑展开
	                $(this).addClass("swipeleft");
	                expansion = $(this);
	            }
	            swipeY = false;
	        }
	        // 上下滑动
	        if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
	            swipeX = false;
	        }        
	    });
	}
}
//获取购物车商品总数
function productSum(){
	var productSum = 0;
	$(".num").each(function(){
		var num = parseInt($(this).val());
		productSum +=num;
	})
	$(".header h1").html("您的购物车共有"+productSum+"件商品");
}

$(function(){
	productSum();
	//点击删除商品
	$(".shop-info button").on("touchstart" , function(){
		var $this = $(this);
		var cartId = $this.siblings("#cartId").val();
		var objJSON = {"type":1,"cartIdList":[{"cartId":cartId}]}
		deleteCart(objJSON);
		if ($this.parents("ul").find("li").length-1 == 0) {
			$this.parents(".shop-group-item").remove();
		}
		if($(".shop-group-item").length==0){
			$(".shopping").remove();
		}
		$this.parents("li").remove();

		productSum();
		TotalPrice();
		productSum();
	})
	// 数量减
	$(".minus").on("touchstart" , function(){
		var $this = $(this);
		var orgId = $this.parents(".shop-group-item").find("#orgId").val();
		var prodId = $this.parents(".shop-info-text").find("#prodId").val();
		var data = {"orgId":orgId,"prodId":prodId,"type":0,"num":-1}
		var cartId = $this.parents(".shop-info-box").siblings("#cartId").val();
		var objJSON = {"type":1,"cartIdList":[{"cartId":cartId}]}
		var t = $this.parent().find('.num');
		t.val(parseInt(t.val()) - 1);
		if (t.val() <1) {
			t.val(1);
			$this.attr("disabled", true);
			if($this.attr("disabled")){
				return ;
			}

		}
		productSum();
		changNum(data,t);
		$(this).parents(".shop-price").find("#num").val(t.val());
		TotalPrice();
		productSum();
	});
	// 数量加
	$(".plus").on("touchstart" , function(){
		var orgId = $(this).parents(".shop-group-item").find("#orgId").val();
		var prodId = $(this).parents(".shop-info-text").find("#prodId").val();
		var data = {"orgId":orgId,"prodId":prodId,"type":0,"num":1}
		var t = $(this).parent().find('.num');
		t.val(parseInt(t.val()) + 1);
		$(this).siblings(".minus").removeAttr("disabled");
		changNum(data,t);
		TotalPrice();
		productSum();
		$(this).parents(".shop-price").find("#num").val(t.val());
	});

	$(".num").bind("change",function(){
	    var orgId = $(this).parents(".shop-group-item").find("#orgId").val();
		var prodId = $(this).parents(".shop-info-text").find("#prodId").val();
		var this_val = $(this).val();
		var _val =$(this).parents(".shop-price").find("#num").val();
		var num
		if(this_val<1 || this_val == ''){
			num = 0;
			alert("最小数量为1")
			window.location.reload();
		}else{
			num = Number(this_val-_val);
		}
		var data = {"orgId":orgId,"prodId":prodId,"type":0,"num":num}
	    changNum(data,$(this));
	    TotalPrice();
	    productSum();
	    $(this).parents(".shop-price").find("#num").val($(this).val());

	})
	  // 点击商品按钮
	$(".goodsCheck").click(function() {
	    var goods = $(this).closest(".shop-group-item").find(".goodsCheck"); //获取本站点的所有商品
	    var goodsC = $(this).closest(".shop-group-item").find(".goodsCheck:checked"); //获取本站点所有被选中的商品
	    var Shops = $(this).closest(".shop-group-item").find(".shopCheck"); //获取本站点的全选按钮
	    if ($(this).prop("checked") == true) {
	    	$(this).parent().addClass("active");
	    }else{
	    	$(this).parent().removeClass("active");
	    }
	    if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
	    	goods.addClass("active");
	    	Shops.parent().addClass("active");
			Shops.prop('checked', true); //站点全选按钮被选中
			if ($(".shopCheck").length == $(".shopCheck:checked").length) { //如果站点被选中的数量等于所有站点的数量
				$("#AllCheck").prop('checked', true); //全选按钮被选中
				$(".goods-check").parent().addClass("active");
				TotalPrice();
			} else {
				$("#AllCheck").prop('checked', false); //else全选按钮不被选中 
				$("#AllCheck").parent().removeClass("active");
				TotalPrice();
			}
	    } else { //如果选中的商品不等于所有商品
			Shops.prop('checked', false); //站点全选按钮不被选中
			Shops.parent().removeClass("active");
			$("#AllCheck").parent().removeClass("active")
			$("#AllCheck").prop('checked', false); //全选按钮也不被选中
			// 计算
			TotalPrice();
			// 计算
	    }
  	});
	// 点击站点按钮
	$(".shopCheck").click(function() {
		if ($(this).prop("checked") == true) { //如果站点按钮被选中
			$(this).parents(".shop-group-item").find(".goods-check").prop('checked', true); //站点内的所有商品按钮也被选中
			$(this).parents(".shop-group-item").find(".checked-box").addClass("active");
			if ($(".shopCheck").length == $(".shopCheck:checked").length) { //如果站点被选中的数量等于所有站点的数量
				$("#AllCheck").prop('checked', true); //全选按钮被选中
				$(".goods-check").parent().addClass("active");
				TotalPrice();
			} else {
				$("#AllCheck").prop('checked', false); //else全选按钮不被选中
				$("#AllCheck").parent().removeClass("active");
				TotalPrice();
			}
		} else { //如果站点按钮不被选中
			$(this).parents(".shop-group-item").find(".goods-check").prop('checked', false); //站点内的所有商品也不被全选
			$(this).parents(".shop-group-item").find(".checked-box").removeClass("active");
			$("#AllCheck").parent().removeClass("active");
			$("#AllCheck").prop('checked', false); //全选按钮也不被选中
			TotalPrice();
		}
	});
	// 点击全选按钮
	$("#AllCheck").click(function() {
		if ($(this).prop("checked") == true) { //如果全选按钮被选中
			$(".goods-check").prop('checked', true); //所有按钮都被选中
			$(".goods-check").parent().addClass("active");
			TotalPrice();
		} else {
			$(".goods-check").prop('checked', false); //else所有按钮不全选
			$(".goods-check").parent().removeClass("active");
			TotalPrice();
		}
		$(".shopCheck").change(); //执行站点全选的操作
	});
	//计算
	function TotalPrice() {
		var _text = $(".shopcar-btn>i em");
		// var sum = Number(_text.text());
		var allprice = 0; //总价
		$(".shop-group-item").each(function() { //循环每个站点
			var oprice = 0; //站点总价
			var sum = 0;
			$(this).find(".goodsCheck").each(function() { //循环站点里面的商品
			    if ($(this).is(":checked")) { //如果该商品被选中
			    	var num = parseInt($(this).parents(".shop-info").find(".num").val()); //得到商品的数量
			    	var price = parseFloat($(this).parents(".shop-info").find(".price").text()); //得到商品的单价
			    	var total = price * num; //计算单个商品的总价
			    	oprice += total; //计算该站点的总价
			    	sum += num;
			    	if(sum>98){
			    		_text.text("99+");
			    	}else{
			    		_text.text(sum);
			    	}
			    	
			    }
		    	$(this).closest(".shop-group-item").find(".ShopTotal").text(oprice.toFixed(2)); //显示被选中商品的站点总价
			});
			var oneprice = parseFloat($(this).find(".ShopTotal").text()); //得到每个站点的总价
			allprice += oneprice; //计算所有站点的总价
		});
		$("#AllTotal").text(allprice.toFixed(2)); //输出全部总价
	};

	$(".goods-check").prop('checked', true);
	$(".goods-check").parent().addClass("active");

	TotalPrice();
});


//获取购物车列表$ctxRoot+ /act/cart/list?type=0
addCdcList();
function addCdcList(){
	$.ajax({     
        url: $ctxRoot+"/act/cart/list?type=0",
        type: "GET",
        async:false,
        cache:false,
        data:{},
        success: function (data) {
            if (data.repCode == 1) {
		        var cdcList = data.cdc;
		        var cdc = "";
		    	for(var i in cdcList){
		        	
		        	var prodList = cdcList[i].prodList;
		    		cdc += '<div class="shop-group-item"><div class="shop-name"><input type="hidden" name="orgId" id="orgId" value="'+cdcList[i].orgId+'"><span class="checked-box"><input type="checkbox" class="check goods-check shopCheck"></span><h4><a href="#">'+cdcList[i].orgName+'</a></h4></div><ul>'		    			
		    		for (var j in prodList) {
		    			
		    			cdc += '<li class="clearfix"><div class="shop-info"><span class="checked-box"><input type="checkbox" class="check goods-check goodsCheck"></span><div class="shop-info-box">'
						cdc	+='<div class="shop-info-img"><a href="detail.html?prodId='+prodList[j].prodId+'"><img src="'+prodList[j].url+'" /></a></div>'
						cdc	+='<div class="shop-info-text"><input type="hidden" name="prodId" id="prodId" value="'+prodList[j].prodId+'"><h4>'+prodList[j].prodName+'</h4>'
						cdc		+='<div class="shop-price clearfix"><div class="shop-pices fl"><input type="hidden" id="num" value="'+prodList[j].num+'">￥<b class="price">'+prodList[j].price+'</b><span>￥'+prodList[j].cost+'<i></i></span></div>'
						cdc			+='<div class="shop-arithmetic fr clearfix"><input class="minus" type="button" value="-"><input type="number" name="num" class="num" value="'+prodList[j].num+'"><input class="plus" type="button" value="+"></div>'
						cdc		+='</div></div></div><input type="hidden" name="cartId" id="cartId" value="'+prodList[j].cartId+'"><button>删除</button></div><div class="hr"></div></li>'
						
		    		}
		    		cdc		+='</ul><div class="shopPrice">本站点总计：￥<span class="shop-total-amount ShopTotal">0.00</span></div></div>'
		    		$(".shopping").html(cdc);

		    	}

		    }
        }
    });

}
//删除商品$ctxRoot+ /act/cart/edit
function deleteCart(objJSON){
	$.ajax({     
	    url: $ctxRoot+"/act/cart/edit",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data:JSON.stringify(objJSON),
	    success: function (data) {
	        if(data.repCode == 1){
	        	window.location.reload();
	        }else{
	        	alert(data.repMsg);
	        }
	    }
	});

}

// 改变商品数量
function changNum(dt,t){
	$.ajax({     
	    url: $ctxRoot+"/act/cart/edit",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data:JSON.stringify(dt),
	    success: function (data) {
	    	if (data.repCode != 1) {
				alert(data.repMsg);
				location.reload(location.href);
			}
	        
	    }
	});

}


$(".go-settlement").on("click" , function(){
	var data = {};
	var cartIdList= [];
	$(".checked-box.active  .goodsCheck").each(function(){
		var cartId = $(this).parent().siblings("#cartId").val();
		cartIdList.push({"cartId":cartId});
	});
	var cartIdList_data = JSON.stringify({"cartIdList":cartIdList});
	if(cartIdList.length == 0){
		alert("购物车为空，请添加购物车！")
	}else{
		window.location.href = "cen.html?cartId="+cartIdList_data;
	}
	
})