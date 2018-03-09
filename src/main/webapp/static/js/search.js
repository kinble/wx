$(".his-recordBox").on("click",".his-record>div",function(){
    var text = $(this).text();
    $("#search_val").val(text);
    $(".search-content").show();
    keyAjax(encodeURIComponent(text),-1)
});

$("#search_val").bind("input propertychange",function(){
    $(".search-tip").show();
    $(".search-content").hide();
    wordAjax();

})



/*搜索记录相关*/
//从localStorage获取搜索时间的数组
var hisTime;
//从localStorage获取搜索内容的数组
var hisItem;
//从localStorage获取最早的1个搜索时间
var firstKey;
function init (){
    //每次执行都把2个数组置空
    hisTime = [];
    hisItem = [];
    //模拟localStorage本来有的记录
    localStorage.setItem("a",12333);
    //本函数内的两个for循环用到的变量
    var i=0
     
    for(;i<localStorage.length;i++){

        if(!isNaN(localStorage.key(i))){
          hisTime.push(localStorage.key(i));
        }
    }
    hisTime.sort();
    for(var y=hisTime.length;y>-1;y--){ 　
        hisItem.push(localStorage.getItem(hisTime[y]));  
    }
    i=0; 
    //执行init(),每次清空之前添加的节点 
    $(".his-record").html("");
    for(;i<hisItem.length;i++){
        if(hisItem[i] == null || hisItem[i] == ""){
            $(".his-record").html("");
        }else{
            $(".his-record").prepend('<div class="word-break">'+hisItem[i]+'</div>')
        }
        
    }
} 
init();
//增加搜索记录
function addRecord(val){
    var time = (new Date()).getTime();
    if($.inArray(val,hisItem)>=0){ 
        for(var j = 0;j<localStorage.length;j++){ 
            if(val==localStorage.getItem(localStorage.key(j))){ 
                localStorage.removeItem(localStorage.key(j)); 
            } 
        } 
        localStorage.setItem(time,val); 
    }else{
        if(hisItem.length>5){ 
            firstKey = hisTime[0]
            localStorage.removeItem(firstKey);
            localStorage.setItem(time,val);
        }else{ 
            localStorage.setItem(time,val) 
        } 
    } 
    init();
}
$(".search-btn").click(function(){ 
    var value = $("#search_val").val();  
    addRecord(value);
    //正式的时候要提交的！！！ //
    $(".search-content").show();
    keyAjax(encodeURIComponent(value),-1);
});
$(".search-tip ul").on("click", "li" , function(){
    var $this = $(this);
    var keyName = $this.find(".keyName").text();
    var key = $this.find("#key").val();
    var type = $this.find("#type").val();
    addRecord(keyName);
    $(".search-content").show();
    $("#search_val").val(keyName);
    keyAjax(encodeURIComponent(keyName),type);

})
//清除记录功能 
$("#his-dele").click(function(){ 
    var f = 0; 
    for(;f<hisTime.length;f++){ 
        localStorage.removeItem(hisTime[f]); 
    } 
    for(var i=0;i<localStorage.length;i++){ 
        localStorage.removeItem(localStorage.key(i)); 
    } 
    init(); 
});


//输入关键字提示
function wordAjax(){
    var word = $("#search_val").val();
    if(word != ""){
        $.ajax({
            url: $ctxRoot+"/act/search/word",
            type: "GET",
            async:false,
            data:{
                word:word
            },
            success: function (data) {
                if(data.repCode == 1){
                    $(".his-recordBox").hide();
                    var keyList = data.keyList;
                    var _key = "";
                    for(var i in keyList){
                        _key += '<li><span class="typeName">'+keyList[i].typeName+'</span>'
                                +'<span class="keyName">'+keyList[i].keyName+'</span>'
                                +'<input type="hidden" id="key" value="'+keyList[i].key+'" /><input type="hidden" id="type" value="'+keyList[i].type+'" /></li>'
                    }
                    $(".search-tip ul").html(_key);

                    $(".search-tip ul li").each(function(){
                        var _text = $(this).find(".keyName").html(); 
                        $(this).find(".keyName").html(_text.replace(word, '<em style="color:#ff7300">'+word+'</em>'));
                    })
                }
            }
        });
    }else{
        $(".search-tip ul").html("");
        $(".his-recordBox").show();
    }
}
//搜索$ctxRoot+ /act/search/key?key=风&type=-1
function keyAjax(key,type){
    $.ajax({
        url: $ctxRoot+"/act/search/key",
        type: "GET",
        data:{
            key: key,
            type: type
        },
        success: function (data) {
            if(data.repCode == 1){
                $(".his-recordBox").hide();
                $(".search-tip").hide();
                var prodList = data.prodList;
                var supplierList = data.supplierList;
                var prod = "", supp = "";
                for (var i in supplierList) {
                    supp += '<li><a href="vendor.html?supplierId='+supplierList[i].supplierId+'"><h2>'+supplierList[i].name+'</h2> <p>'+supplierList[i].spec+'</p><i class="icon-btn"></i></a></li>'
                }
                for (var j in prodList) {
                    prod += '<li class="clearfix"><a href="detail.html?prodId='+prodList[j].prodId+'"><img src="'+prodList[j].url+'" alt=""></a>'
                            +'<div class="prodNameBox"><a href="detail.html?prodId='+prodList[j].prodId+'"><h2><em>'+prodList[j].discount+'</em>'+prodList[j].prodName+'</h2></a>'
                                +'<div class="clearfix"><span>￥<em>'+prodList[j].price+'</em></span><span>￥'+prodList[j].cost+'<i></i></span><p class="addCart"><i></i>加入购物车<input type="hidden" id="orgId" value="'+prodList[j].orgId+'"><input type="hidden" id="prodId" value="'+prodList[j].prodId+'"><input type="hidden" id="qty" value="'+prodList[j].qty+'"></p></div></div></li>'
                }
                $(".search-content .vendorList").html(supp);
                $(".search-content .vendor-prodList").html(prod);
            }
        }
    });
}
