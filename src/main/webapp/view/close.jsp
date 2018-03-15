<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@include file="jssdk.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
  + path + "/";
String openId = request.getSession().getAttribute("openId")+"";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
  </head>
  <body >
  </body>

  <script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
  <script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
  <link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.min.css">
  <link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css">
  <script>
      //alert("取消成功！我们将依照回寄地址将设备寄回。感谢您使用金溢科技客户服务！");
      $(function(){
          $.confirm("您确定要取消维修吗?取消之后我们将照回寄地址将设备寄回。", "取消维修?", function() {
              $.post("<%=path %>/scm/closeOrder",
                  {
                      orderId:'<%=request.getParameter("orderId")%>'
                  },
                  function(res){
                      if (res.code == 0) {
                          $.alert("我们将依照回寄地址将设备寄回。感谢您使用金溢科技客户服务！", "取消成功！",
                              function() {wx.closeWindow();});
                      }else{
                          $.alert(res.message, "取消失败！",
                              function() {wx.closeWindow();});
                      }
                  });
          }, function() {
              wx.closeWindow();
          });
      });
  </script>

</html>
