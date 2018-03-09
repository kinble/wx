
function loginBtn(){
    var loginName = $('#loginName').val();
    var password = $('#password').val();
    var url = $ctxRoot+"/act/index";
    $.ajax({
        url: $ctxRoot+"/mall/check_user_login.do",
        data: {
            loginName: loginName,
            password: password
        },
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.reflag == true) {
                $(".login-tip").css({"opacity":"0"});
                $("form").submit();
            }else{
                if(data.nouser == false) {
                    console.log(data.nouser)
                    $(".login-tip").css({"opacity":"1"}).html("用户不存在!");
                    return false;
                }
                if(data.userlock == true) {
                    console.log(data.userlock)
                    $(".login-tip").css({"opacity":"1"}).html("您已经连续10次登录失败,账户已锁,请20分钟后再尝试登陆!!");
                    return false;
                }
                $(".login-tip").css({"opacity":"1"}).html("用户名或密码错误!");
            }
        }
    });
    return false;
}

$(".login-content input").on("change", function(){
    if($(this).val() !=""){
        $(this).siblings("i").show();
    }else{
        $(this).siblings("i").hide();
    }
});

function clearInput(obj){
    obj.siblings("input").val("");
    obj.hide();
}

/*重新获取验证码*/
var countdown=60; 
function settime(obj){
    if (countdown == 0) { 
        obj.attr("disabled", false);
        obj.removeClass("active").val("获取验证码");
        countdown = 60; 
        return;
    } else { 
        obj.attr("disabled", true);
        obj.addClass("active").val(countdown+"s后重发");
        countdown--; 
    } 
    setTimeout(function() { 
        settime(obj) 
    },1000);
}
/*获取短信验证码*/
function obtainSMS(obj,type){
    var mobile = $('#mobile').val();
    if (mobile=="" || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile))){
        alert("手机号码输入有误！")
    }else{
        $.ajax({
            url: $ctxRoot+"/mall/user/sms",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                mobile:mobile,
                validateType: type
            }),
            success: function (data) {
                if(data.repCode==1) {
                    
                }else{
                    alert(data.repMsg)
                }
            }
        });
        settime(obj);
    }
}

function register_checkAjax(obj,type){
    var field = $('#mobile').val();
    if (field=="" || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(field))){
        alert("手机号码输入有误！")
    }else{
        $.ajax({
            url: $ctxRoot+"/mall/user/register_check",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                field:field,
                fieldType: 1
            }),
            success: function (data) {
                if(data.repCode==1) {
                    if(data.useAble == 0){
                        alert("手机号已注册！")
                    }else{
                        obtainSMS(obj,type);
                    }
                    
                }
            }
        });
    }
}

/*校验密码格式*/
$(".psd").bind("input propertychange",function(){
    var passwordVal = $(this).parent().siblings().find("input.psd");
    if($(this).val()==""){
        $(this).siblings("em").css({"opacity":"0"}).html("");
    }else if (!(/^[A-Za-z][A-Za-z0-9]{7,19}$/.test($(this).val()))){
        $(this).siblings("em").css({"opacity":"1"}).html("密码格式错误！");
    }else if($(this).val() != passwordVal.val() && passwordVal.val() != ""){
        $(this).siblings("em").css({"opacity":"1"}).html("两次密码输入不一致！");
    }else{
        $(this).siblings("em").css({"opacity":"0"}).html("");
        passwordVal.siblings("em").css({"opacity":"0"}).html("");
    }
});

/*账号注册*/
function registerAjax(){
    var mobile = $('#mobile').val();
    var mobileCode = $("#smsCode").val();
    var password_1 = $(".psd_1").val();
    var password_2 = $(".psd_2").val();
    if (password_1!= password_2 || !(/^[A-Za-z][A-Za-z0-9]{7,19}$/.test(password_2))){
        alert("注册信息填写错误")
    }else{
        $.ajax({
            url: $ctxRoot+"/mall/user/register",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                mobile:mobile,
                pwd:password_1,
                mobileCode: mobileCode
            }),
            success: function (data) {
                if(data.repCode == 1){
                    window.location.href="online_fix.html?memberMobile="+data.memberMobile+"&memberId="+data.memberId
                }else{
                    alert(data.repMsg);
                }
            }
        });
    }
}

/*重置密码*/
$(".next-btn").on("touchstart" , function(){
    var mobile = $("#mobile").val();
    var mobileCode = $("#smsCode").val();
    $.ajax({
        url: $ctxRoot+"/mall/user/validate_sms",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data:JSON.stringify({
            mobile:mobile,
            validateType:0,
            mobileCode: mobileCode
        }),
        success: function (data) {
            if(data.repCode == 1){
               $(".codeBox").hide().siblings(".resetBox").show();
            }else{
                alert(data.repMsg);
            }
        }
    });
})
$(".reset-btn").on("touchstart" , function(){
    
    var mobile = $("#mobile").val();
    var password_1 = $(".psd_1").val();
    var password_2 = $(".psd_2").val();
    if (password_1!= password_2 || !(/^[A-Za-z][A-Za-z0-9]{7,19}$/.test(password_2))){
        alert("密码格式错误！")
    }else{
        $(".spinnerBox").fadeIn();
        $.ajax({
            url: $ctxRoot+"/mall/user/reset_pwd",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                mobile:mobile,
                pwd: password_2
            }),
            success: function (data) {
                if(data.repCode == 1){
                    $(".spinnerBox").fadeOut();
                   alert("密码重置成功");
                    window.location.href="login.html";
                }else{
                    $(".spinnerBox").fadeOut();
                    alert(data.repMsg);
                }
            }
        });
    }
})

// 可视化密码
function lookPwd(obj){
    obj.click(function(e){
        e.preventDefault()
        if($(this).hasClass("in")){
            $(this).siblings("input").attr("type" , "password");
            $(this).removeClass("in");
        }else{
            $(this).siblings("input").attr("type" , "text");
            $(this).addClass("in");
        }
        
    })
}
var look = $(".lookPwd");
lookPwd(look);





