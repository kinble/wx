<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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

  </head>

  <body >
  </body>
  <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
  <script type="text/javascript">
      // 8.7 关闭当前窗口
      wx.config({
          debug: false,
          appId:'${appId}',
          timestamp: '${timestamp}',
          nonceStr: '${nonceStr }',
          signature: '${signature}',
          jsApiList: [
              'closeWindow'
          ]
      });
      alert("建设中.....");
      wx.ready(function () {
          wx.closeWindow();
      });
      wx.error(function () {
          wx.closeWindow();
      });
      //WeixinJSBridge.call('closeWindow');

      //alert(wx);


  </script>
</html>
