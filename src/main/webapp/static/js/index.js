(function ($) {
    $.extend({
        tipsBox: function (options) {
            options = $.extend({
                obj: null,  
                str: "+1", 
                startSize: ".24rem",
                endSize: ".3rem", 
                interval: 600, 
                color: "red", 
                callback: function () { } 
            }, options);
            $("body").append("<span class='numAdd'>" + options.str + "</span>");
            var box = $(".numAdd");
            var left = options.obj.offset().left + options.obj.width() / 2;
            var top = options.obj.offset().top - options.obj.height();
            box.css({
                "position": "absolute",
                "left": left + "px",
                "top": top + "px",
                "z-index": 9999,
                "font-size": options.startSize,
                "line-height": options.endSize,
                "color": options.color
            });
            box.animate({
                "font-size": options.endSize,
                "opacity": "0",
                "top": top - parseInt(options.endSize) + "px"
            }, options.interval, function () {
                box.remove();
                options.callback();
            });
        }
    });
})(jQuery);

// 供应商列表

function mainAjax(){
	var counter = 1;
	// 每页展示10个
	var num = 10;
	var page = 0;
	var url = $ctxRoot+"/act/main";
	$.ajax({
		url: url,
	    type: "GET",
	    async: false,
	    data:{},
	    success: function (data) {
	    	page = Math.ceil(data.supplierList.length/num);
	    	var classicList = data.classicList;
	    	var secClassicList = data.secClassicList;
	    	var classic = "" , secClassic = "";
	    	for (var i in classicList){
	    		classic += '<li><a href="/wx/static/act/classic.html?classicId='+classicList[i].classicId+'"><img src="'+classicList[i].url+'" alt=""></a>'
	    	}
	    	for (var i in secClassicList){
	    		secClassic += '<a href="/wx/static/act/classic.html?classicId='+secClassicList[i].classicId+'"><img src="'+secClassicList[i].url+'" alt=""></a>'
	    	}
	    	$(".index .floor_1 ul").html(classic);
	    	$(".index .floor_2").html(secClassic);
	    }
	});
    // dropload
    $('.index-content').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">没有更多了</div>'
        },

        loadUpFn : function(me){
        	$('.index-content ul').html("");
	        $.ajax({
		        type: 'GET',
		        url: url,
		        data:{
	    			pageNo:1,
	    			pageSize:num
		        },
		        success: function(data){
		        	var supplierList = data.supplierList;
	    			var supplier = ""
		            for(var i = 0; i < supplierList.length; i++){
    	    			supplier += '<li><a href="/wx/static/act/vendor.html?supplierId='+supplierList[i].supplierId+'"><img src="'+supplierList[i].specUrl+'" alt=""></a></li>'
		            }

	                $(".index-content ul").html(supplier);
	                // 每次数据加载完，必须重置
	                me.resetload();
	                // 重置索引值，重新拼接more.json数据
	                counter = 2;
	                // 解锁
	                me.unlock();
	                me.noData(false);
	                // me.lock('up');
		        },
		        error: function(xhr, type){
		            // alert('网络加载失败！');
		            // 即使加载出错，也得重置
		            me.resetload();
		        }
		    });
        },
        loadDownFn : function(me){
	  		$.ajax({
		        type: 'GET',
		        url: url,
		        data:{
	    			pageNo:counter,
	    			pageSize:num
		        },
		        success: function(data){
		        	var supplierList = data.supplierList;
	    			var supplier = ""
		            counter++;
		            if(counter>page){
		            	// 锁定
	                    me.lock();
	                    // 无数据
	                    me.noData();
	                    // return;
		            }
		            for(var i = 0; i < supplierList.length; i++){
       	    			supplier += '<li><a href="/wx/static/act/vendor.html?supplierId='+supplierList[i].supplierId+'"><img src="'+supplierList[i].specUrl+'" alt=""></a></li>'
		            }

	                $(".index-content ul").append(supplier);
	                // 每次数据加载完，必须重置
	                me.resetload();
		        },
		        error: function(xhr, type){
		            // alert('网络加载失败！');
		            // 即使加载出错，也得重置
		            me.resetload();
		        }
		    });
        },
        threshold : 50
    });
}
// 供应商商品列表
function prodsAjax(){
	getwindowUrl()
	var counter = 1;
	// 每页展示10个
	var num = 10;
	var page = 0;
	var url = $ctxRoot+"/act/search/supplier/prods";
	$.ajax({
		url: url,
	    type: "GET",
	    async: false,
	    data:{
	    	supplierId:cutList.supplierId,
	    	code:cutList.code
	    },
	    success: function (data) {
	    	page = Math.ceil(data.prodList.length/num)
	    }
	});
    // dropload
    $('.content').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">没有更多了</div>'
        },

        loadUpFn : function(me){
        	$('.vendor-prodList').html("");
	        $.ajax({
		        type: 'GET',
		        url: url,
		        data:{
		        	supplierId:cutList.supplierId,
	    			code:cutList.code,
	    			pageNo:1,
	    			pageSize:num
		        },
		        success: function(data){
		        	var prodList = data.prodList;
		            var prod = '';
		            for(var i = 0; i < prodList.length; i++){
		                 prod += '<li class="clearfix"><a href="detail.html?prodId='+prodList[i].prodId+'"><img src="'+prodList[i].url+'" alt=""></a>'
                        +'<div class="prodNameBox"><a href="detail.html?prodId='+prodList[i].prodId+'"><h2><em>'+prodList[i].discount+'</em>'+prodList[i].prodName+'</h2></a>'
                            +'<div class="clearfix"><span>￥<em>'+prodList[i].price+'</em></span><span>￥'+prodList[i].cost+'<i></i></span><p class="addCart"><i></i>加入购物车<input type="hidden" id="orgId" value="'+prodList[i].orgId+'"><input type="hidden" id="prodId" value="'+prodList[i].prodId+'"><input type="hidden" id="qty" value="'+prodList[i].qty+'"></p></div></div></li>';
		            }

	                $('.vendor-prodList').html(prod);
	                $(".vendor-infoBox img").attr("src",data.logoUrl);
		            $(".vendor-infoBox h2").text(data.supplierName)
		            $(".vendor-infoBox p").text(data.spec)
	                // 每次数据加载完，必须重置
	                me.resetload();
	                // 重置索引值，重新拼接more.json数据
	                counter = 2;
	                // 解锁
	                me.unlock();
	                me.noData(false);
	                // me.lock('up');
		        },
		        error: function(xhr, type){
		            // alert('网络加载失败！');
		            // 即使加载出错，也得重置
		            me.resetload();
		        }
		    });
        },
        loadDownFn : function(me){
	  		$.ajax({
		        type: 'GET',
		        url: url,
		        data:{
		        	supplierId:cutList.supplierId,
	    			code:cutList.code,
	    			pageNo:counter,
	    			pageSize:num
		        },
		        success: function(data){
		        	var prodList = data.prodList;
		            var prod = '';
		            counter++;
		            if(counter>page){
		            	// 锁定
	                    me.lock();
	                    // 无数据
	                    me.noData();
	                    // return;
		            }
		            for(var i = 0; i < prodList.length; i++){
		                 prod += '<li class="clearfix"><a href="detail.html?prodId='+prodList[i].prodId+'"><img src="'+prodList[i].url+'" alt=""></a>'
                        +'<div class="prodNameBox"><a href="detail.html?prodId='+prodList[i].prodId+'"><h2><em>'+prodList[i].discount+'</em>'+prodList[i].prodName+'</h2></a>'
                            +'<div class="clearfix"><span>￥<em>'+prodList[i].price+'</em></span><span>￥'+prodList[i].cost+'<i></i></span><p class="addCart"><i></i>加入购物车<input type="hidden" id="orgId" value="'+prodList[i].orgId+'"><input type="hidden" id="prodId" value="'+prodList[i].prodId+'"><input type="hidden" id="qty" value="'+prodList[i].qty+'"></p></div></div></li>';
		            }

	                $('.vendor-prodList').append(prod);
	                $(".vendor-infoBox img").attr("src",data.logoUrl);
		            $(".vendor-infoBox h2").text(data.supplierName)
		            $(".vendor-infoBox p").text(data.spec)
	                // 每次数据加载完，必须重置
	                me.resetload();
		        },
		        error: function(xhr, type){
		            // alert('网络加载失败！');
		            // 即使加载出错，也得重置
		            me.resetload();
		        }
		    });
        },
        threshold : 50
    });
}

// 品类商品列表

function classicAjax(){
	getwindowUrl()
	var counter = 1;
	// 每页展示10个
	var num = 10;
	var page = 0;
	var url = $ctxRoot+"/act/search/classic/prods";
	$.ajax({
		url: url,
	    type: "GET",
	    async: false,
	    data:{
	    	classicId:cutList.classicId,
	    	code:cutList.code
	    },
	    success: function (data) {
	    	page = Math.ceil(data.prodList.length/num)
	    }
	});
	$('.content').css({
		"marginTop" : "0.9rem"
	})
	$(".vendor-header").css({
		"backgroundColor" : "#ff7300"
	})
    // dropload
    $('.content').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">没有更多了</div>'
        },

        loadUpFn : function(me){
        	$('.vendor-prodList').html("");
	        $.ajax({
		        type: 'GET',
		        url: url,
		        data:{
		        	classicId:cutList.classicId,
	    			pageNo:1,
	    			pageSize:num
		        },
		        success: function(data){
		        	var prodList = data.prodList;
		            var prod = '';
		            for(var i = 0; i < prodList.length; i++){
		                 prod += '<li class="clearfix"><a href="detail.html?prodId='+prodList[i].prodId+'"><img src="'+prodList[i].url+'" alt=""></a>'
                        	+'<div class="prodNameBox"><a href="detail.html?prodId='+prodList[i].prodId+'"><h2><em>'+prodList[i].discount+'</em>'+prodList[i].prodName+'</h2></a>'
                            +'<div class="clearfix"><span>￥<em>'+prodList[i].price+'</em></span><span>￥'+prodList[i].cost+'<i></i></span><p class="addCart"><i></i>加入购物车<input type="hidden" id="orgId" value="'+prodList[i].orgId+'"><input type="hidden" id="prodId" value="'+prodList[i].prodId+'"><input type="hidden" id="qty" value="'+prodList[i].qty+'"></p></div></div></li>';
		            }

	                $('.vendor-prodList').html(prod);
	                $("title").text(data.classicName)
	                // 每次数据加载完，必须重置
	                me.resetload();
	                // 重置索引值，重新拼接more.json数据
	                counter = 2;
	                // 解锁
	                me.unlock();
	                me.noData(false);
	                // me.lock('up');
		        },
		        error: function(xhr, type){
		            // alert('网络加载失败！');
		            // 即使加载出错，也得重置
		            me.resetload();
		        }
		    });
        },
        loadDownFn : function(me){
	  		$.ajax({
		        type: 'GET',
		        url: url,
		        data:{
		        	classicId:cutList.classicId,
	    			pageNo:counter,
	    			pageSize:num
		        },
		        success: function(data){
		        	var prodList = data.prodList;
		            var prod = '';
		            counter++;
		            if(counter>page){
		            	// 锁定
	                    me.lock();
	                    // 无数据
	                    me.noData();
	                    // return;
		            }
		            for(var i = 0; i < prodList.length; i++){
		                 prod += '<li class="clearfix"><a href="detail.html?prodId='+prodList[i].prodId+'"><img src="'+prodList[i].url+'" alt=""></a>'
                        	+'<div class="prodNameBox"><a href="detail.html?prodId='+prodList[i].prodId+'"><h2><em>'+prodList[i].discount+'</em>'+prodList[i].prodName+'</h2></a>'
                            +'<div class="clearfix"><span>￥<em>'+prodList[i].price+'</em></span><span>￥'+prodList[i].cost+'<i></i></span><p class="addCart"><i></i>加入购物车<input type="hidden" id="orgId" value="'+prodList[i].orgId+'"><input type="hidden" id="prodId" value="'+prodList[i].prodId+'"><input type="hidden" id="qty" value="'+prodList[i].qty+'"></p></div></div></li>';
		            }

	                $('.vendor-prodList').append(prod);
	                $("title").text(data.classicName)
	                // 每次数据加载完，必须重置
	                me.resetload();
		        },
		        error: function(xhr, type){
		            // alert('网络加载失败！');
		            // 即使加载出错，也得重置
		            me.resetload();
		        }
		    });
        },
        threshold : 50
    });
}

// 添加购物车 
function addEditAjax(obj,type,num){
	checkloginAjax();
	var orgId = obj.find("#orgId").val();
	var prodId = obj.find("#prodId").val();
	var qty = obj.find("#qty").val();
	var _text = $(".shopcar-btn>i em");
	var sum = Number(_text.text());
	$.ajax({     
	    url: $ctxRoot+"/act/cart/edit",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data:JSON.stringify({
	    	prodId: prodId,
            orgId: orgId,
            type: type,
            num: num
	    }),
	    success: function (data) {
	    	if(data.repCode ==1){
	    		$.tipsBox({
			        obj: obj,
			        str: "+1",
			        callback: function () {
			        	sum +=1;
		                if(sum > 99){
		                    _text.text("99+");
		                }else{
		                    if(_text.text() == "99+"){
		                        _text.text("99+");
		                    }else{
		                        _text.text(sum);
		                    } 
		                    
		                }
			        }
			    });
			    
	    	}else{
	    		alert(data.repMsg);
	    	}
	    }
	});
}

$(".vendor-prodList").on("touchstart" , ".addCart" , function(){
	var $this = $(this);
	addEditAjax($this,0,1);
})

