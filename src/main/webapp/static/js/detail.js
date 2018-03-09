
/*TAB*/
$(".tab-btnBox li").on("touchstart" , function(){
	var tab_index = $(this).index();
	var product_content = $(".tab-content .product-content");
	$(this).addClass("active");
	$(this).siblings().removeClass("active");
	$(product_content[tab_index]).fadeIn().siblings().fadeOut();
})


// 获取详情信息
function loadAjax(){
   getwindowUrl();
	$.ajax({
        url: $ctxRoot+"/act/search/prod/detail",
        type: "GET",
        async:false,
        data:{
            prodId: cutList.prodId,
            code: cutList.code
        },
        success: function (data) {
            var prod = data.prod;
        	var urlList = prod.urlList;
            var baseSpecList = prod.baseSpecList;
            var exSpecList = prod.exSpecList;
        	var url = "";
            var basic ="";
            var extend ="";
            var img = "";
            var marketingInfo ="";

            $("#ID").val(prod.prodId);
            $("#orgId").val(prod.orgId);


            $(".priceBox p:first").html('<span><em>¥</em>'+prod.cost+'<i></i></span>');

            $(".priceBox p:last").html('<em>¥</em>'+prod.price);

        	$(".nameBox h1").html('<span>'+prod.discount+'</span>'+prod.prodName);

            $(".product-info tr:first td:last").text(prod.madeIn);
            $(".product-info tr:eq(1) td:last").text(prod.okVeh);
            $(".product-info tr:eq(2) td:last").text(prod.pno);
            $(".product-info tr:last td:last").text(prod.qty);

            //默认站点
            $('.storeBox p').text(prod.orgName);

            //banner
        	for(var i = 0; i < urlList.length; i++){
        		url += '<li><a><img src="'+urlList[i].url+'" alt=""></a></li>'
                img += '<img src="'+urlList[i].url+'" alt="" />'
        	}
            //基本参数
            for(var i = 0; i < baseSpecList.length; i++){
                if(typeof baseSpecList[i] =='object'  && baseSpecList[i]){
                    basic += '<tr><td>'+baseSpecList[i].name+'</td><td>'+baseSpecList[i].val+'</td></tr>'
                }
               
            }
            //扩展参数
            for(var i = 0; i < exSpecList.length; i++){
                extend += '<tr><td>'+exSpecList[i].name+'</td><td>'+exSpecList[i].val+'</td></tr>'
            }

        	$('.slider ul').html(url);
            $('.basic').html(basic);
            $('.extend').html(extend);
            $('.tab-content .product-content:last').html(img);

                 
        }
    });
}
//获取购物车数量
$.get($ctxRoot+"/act/cart/list?type=1",function(data){
    if (data.repCode == 1) {
        if(data.totalNum>99){
            $("#sum").text("99+");
        }else{
            $("#sum").text(data.totalNum);
        }
        
    }
})
loadAjax();

//加入购物车
 function addCart(type,num){
    checkloginAjax()
    var ID = Number($("#ID").val());
    var orgId = Number($("#orgId").val());
    var sum = Number($("#sum").text());
    console.log(sum);
    
    $.ajax({     
        url: $ctxRoot+"/act/cart/edit",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify({
            prodId: ID,
            orgId: orgId,
            type: type,
            num: num
        }),
        success: function (data) {
            if (data.repCode == 1) {
                sum +=1;
                if(sum > 99){
                    $("#sum").text("99+");
                }else{
                    if($("#sum").text() == "99+"){
                        $("#sum").text("99+");
                    }else{
                        $("#sum").text(sum);
                    } 
                    
                }
                
            }else{
                alert(data.repMsg);
            }
        }
    });

 }

 //立即购买
  function buy(type,num){
    addCart(type,num);
    window.location.href= "list.html";
 }





