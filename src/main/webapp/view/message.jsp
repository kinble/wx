<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@include file="jssdk.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
  + request.getServerName() + ":" + request.getServerPort()
  + path + "/";

String openId = request.getSession().getAttribute("openId")+"";

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>金溢科技-在线留言</title>
    <meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<meta name="description" content="Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description.
">
<link rel="stylesheet" type="text/css" href="/static/css/reset.css">
<link rel="stylesheet" type="text/css" href="/static/css/main.css">
<link rel="stylesheet" href="../static/weui/lib/weui.min.css">
<link rel="stylesheet" href="../static/weui/css/jquery-weui.css">
<link rel="stylesheet" href="../static/weui/demos/css/demos.css">

  </head>

  <body ontouchstart>
  <div class="spinnerBox">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>

    <header class='demos-header'>
      <h1 class="demos-title">在线留言</h1>
    </header>

    
    <div class="weui_cells weui_cells_form">
      <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">联系人</label></div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input userName" type="tel" placeholder="请输入联系人">
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_hd"><label class="weui_label">手机号</label></div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input mobile" type="tel" placeholder="请输入手机号">
        </div>
      </div>
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <textarea class="weui_textarea context" placeholder="请输入留言内容" rows="7" onpropertychange="LimitTextArea(this)" oninput="LimitTextArea(this)"></textarea>
            <div class="weui_textarea_counter"><span id="limit_span">0</span>/200</div>
          </div>
        </div>
    </div>
    <a href="javascript:;" class="weui_btn weui_btn_primary submitAudit">提交</a>
  </body>

  <script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
  <script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
  <script>
      // 完善信息提交$ctxRoot+ /mall/user/perfect
      function perfectAjax(type){
          var userName = $(".weui_cell_bd .userName").val();
          var mobile = $(".weui_cell_bd .mobile").val();
          var context = $(".weui_cell_bd .context").val();

          if(userName == "" || mobile == "" || context == ""){
              alert("请填写完整信息！");
          }else{
              var info = {
                  openId: '<%=openId%>',
                  userName: userName,
                  mobile: mobile,
                  context: context
              };
              console.log(info);
              $(".spinnerBox").fadeIn();
              $.ajax({
                  url: "<%=path %>/scm/createMessage",
                  type: "POST",
                  data:{"json": JSON.stringify(info)},
                  success: function (res) {
                      if (res.code == 0) {
                          $.alert("我们会及时回复您的留言。感谢您使用金溢科技客户服务！", "提交成功！",
                              function() {wx.closeWindow();});
                      }else{
                          $.alert(res.message, "提交失败！",
                              function() {wx.closeWindow();});
                      }
                      $(".spinnerBox").fadeOut();
                  }
              });
          }

      }

      $(".submitAudit").on("touchstart" , function(){
          perfectAjax(0)
      })

      $(function(){
          if("null" != "<%= request.getSession().getAttribute("customer_name")%>"){
              $(".weui_cell_bd .userName").val("<%= request.getSession().getAttribute("customer_name")%>");
              $(".weui_cell_bd .mobile").val("<%= request.getSession().getAttribute("customer_mobile")%>");
          }
          $(".spinnerBox").fadeOut(1000);
      })


      function LimitTextArea(field) {
          maxlimit = 200;
          if (field.value.length > maxlimit) {
              field.value = field.value.substring(0, maxlimit);
              alert("字数不得多于200！");
          }
          document.getElementById("limit_span").innerHTML=field.value.length;
      }

  </script>

</html>
