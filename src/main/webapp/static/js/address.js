window.onload=function(){
	//侧滑显示删除按钮
	var expansion = null; //是否存在展开的list
	var container = document.querySelectorAll('.address-action .address-listBox ul li');
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


/*管理收货地址*/
// 地址列表
function address_listAjax(){
    $.ajax({
        url: $ctxRoot+"/mall/user/address_list",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        async: false,
        data:{},
        success: function (data) {
            if(data.repCode == 1){
                var address = "";
                var addressList = data.addressList;
                for(var i in addressList){
                    if(addressList[i].isDef == 1){
                        address += '<li class="usable selected"><div class="addressBox"><div class="nameBox clearfix"><span class="name">'+addressList[i].receiver+'</span><span class="mobile">'+addressList[i].mobile
                                +   '<i></i></span></div><div class="address"><i></i><p>'+addressList[i].address+'</p><input type="hidden" name="" id="addressId" value="'+addressList[i].id+'"></div><i class="modify-btn"></i><p></p></div><button>删除</button></li>'
                    }else if(addressList[i].status == 0){
                        address += '<li class="usable"><div class="addressBox"><div class="nameBox clearfix"><span class="name">'+addressList[i].receiver+'</span><span class="mobile">'+addressList[i].mobile
                                +   '<i></i></span></div><div class="address"><i></i><p>'+addressList[i].address+'</p><input type="hidden" name="" id="addressId" value="'+addressList[i].id+'"></div><i class="modify-btn"></i><p></p></div><button>删除</button></li>'
                    }else{
                        address += '<li class="disabled"><div class="addressBox"><div class="nameBox clearfix"><span class="name">'+addressList[i].receiver+'</span><span class="mobile">'+addressList[i].mobile
                                +   '<i></i></span></div><div class="address"><i></i><p>'+addressList[i].address+'</p><input type="hidden" name="" id="addressId" value="'+addressList[i].id+'"></div><i class="modify-btn"></i><p>'+addressList[i].statusName+'</p></div><button>删除</button></li>'
                    }

                }
                $(".address-listBox ul").html(address)
            }else{
                alert(data.repMsg);
            }
        }
    });
}

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
                    window.location.href="address_action.html";
                }else{
                    alert(data.repMsg);
                }
            }
        });
    }else{
        alert("提交信息不完全！")
    }
    
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

//编辑收货信息
$(".address-action .address-listBox").on("click", ".addressBox .modify-btn", function(event){
    event.stopPropagation();
    editShow();
    $(".edit-hide").show()
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
$(".address-action .address-listBox .add-addressBtn").on("click", function(){
    editShow();
    $(".edit-hide").show()
    $(".edit-address .edit-addressBox input").val("");
    $(".edit-addressBox #actionType").val(1);
})

//隐藏编辑信息
$(".edit-hide").on("click", function(){
    editHide();
    $(this).hide();
})

//提交编辑收货信息
$(".edit-address .edit-submitBtn").on("click" , function(){
    address_actionAjax();
    // editHide();
})

$(".address-listBox ul").on("touchstart" , " li button" , function(){
	$(this).parent().remove();
    var addressId = $(this).parents("li").find("#addressId").val();
    var receiver =  $(this).parents("li").find("#name").text();
    var mobile = $(this).parents("li").find("#mobile").text();
    var address = $(this).parents("li").find(".address p").text();
    $.ajax({
        url: $ctxRoot+"/mall/user/address_action",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        async: false,
        data:JSON.stringify({
            actionType: 3,
            addressId: addressId,
            receiver: receiver,
            mobile: mobile,
            address: address
        }),
        success: function (data) {
            if(data.repCode == 1){
                window.location.href="address_action.html";
            }else{
                alert(data.repMsg);
            }
        }
    });

})