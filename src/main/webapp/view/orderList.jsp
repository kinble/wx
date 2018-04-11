<%@ page import="com.javen.model.TbWiki" %>
<%@ page import="java.util.List" %>
<%@ page import="com.javen.model.TbOrderHeaders" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@include file="jssdk.jsp"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
  + path + "/";
  String openId = request.getSession().getAttribute("openId")+"";
  List<TbOrderHeaders> list = TbOrderHeaders.me.findByOpenId(openId);
%>
<html lang="en" style="font-size: 16px;">
<head>
  <meta charset="utf-8">
  <title>报修单列表</title>
  <meta name="format-detection" content="telephone=no, email=no">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="dns-prefetch" href="https://s.ankerjiedian.com">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta http-equiv="pragma" content="no-cache">
  <style type="text/css">
    body {
      min-height: 100%;
      font-family: "Hiragino Sans GB", "Helvetica Neue", Helvetica, "PingFang SC", STHeiTi, Arial, sans-serif;
      color: #333;
      background-color: #f7f7f7;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .help {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f7f7f7; }
  .help .-list {
    padding-bottom: 3.125rem; }
  .help .-list .-c .-i {
    background: #fff; }
  .help .-list .-c .-i .-title {
    border-bottom: 1PX solid rgba(238, 238, 238, .6);
    height: 2.75rem;
    line-height: 2.75rem;
    margin: 0 0.9375rem;
    overflow: hidden; }
  .help .-list .-c .-i .-title .-d {
    font-size: 0.875rem;
    color: #333;
    line-height: 2.75rem; }
  .help .-list .-c .-i .-title .-i {
    width: 0.6875rem;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    position: relative;
    float: right;
    height: 2.75rem;
  }
  .help .-list .-c .-i .-title .-i img {
    width: 100%;
    vertical-align: 0.15625rem; }
  .help .-list .-c .-i .-title .-i:before {
    content: '';
    position: absolute;
    top: -0.3125rem;
    right: -0.625rem;
    bottom: -0.3125rem;
    left: -0.625rem; }
  .help .-list .-c .-i .-title .-unfold {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg); }
  .help .-list .-c .-i .-ct {
    padding: 0.9375rem 2.375rem 0.9375rem 0.9375rem;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: #666;
    line-height: 1.25rem; }
  .help .-list .-c:last-child .-i .-title {
    border-bottom-width: 0; }
  .help .-list .-c:last-child .-i .-title-unfold {
    border-bottom: 1PX solid #eee; }
  .help .-serv {
    display: block;
    line-height: 2.75rem;
    height: 2.75rem;
    color: #666;
    font-size: 0.875rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0.03125rem solid #eee;
    background: #fff; }
  .help .-serv img {
    width: 0.875rem;
    display: inline-block;
    margin-right: 0.3125rem;
    position: relative;
    top: 0.03125rem; }
  </style>
</head>
<body>
<div id="app">
  <div>
    <div>
      <div class="content page ">
        <div class="help fade-in">
          <div class="-list">
          <% if(list != null && list.size()>0){
              for (int ls = 0; ls < list.size(); ls ++ ){
                String statuStr="";
                String statu = list.get(ls).get("order_status");
                String closeStatu = list.get(ls).get("close_status");
                if("SUBMIT".equals(statu)){
                  statuStr="已提交";
                }else if("APPROVED".equals(statu)){
                    if("CANCEL".equals(closeStatu)){
                      statuStr="已取消";
                    }else{
                      statuStr="处理中";
                    }
                }else if("COMPLETE".equals(statu)){
                  if("CANCEL".equals(closeStatu)){
                    statuStr="已取消";
                  }else if("AUTO_CLOSE".equals(closeStatu)){
                    statuStr="自动完成";
                  }else{
                    statuStr="已完成";
                  }
                }
          %>
            <div class="-c">
              <div class="-i">
                <div class="-title" onclick="showAnswer('<%= list.get(ls).get("id")%>')">
                  <span class="-d">
                    <%--标题--%>
                  <%= (ls+1)+"&nbsp;&nbsp;&nbsp;&nbsp;"+list.get(ls).get("order_num") + " " + list.get(ls).get("meaning") + "&nbsp;&nbsp;&nbsp;&nbsp;" +  list.get(ls).get("orderDate")+"   " +("1".equals(list.get(ls).get("needPay")+"")?"待支付":statuStr) %>
                  </span>
                  <span class="-i"></span>
                </div>
                <div class="-ct" style="display: none" id="answer_<%= list.get(ls).get("id")%>">
                  <%--内容--%>
                  <table>
                    <tr>
                      <td>订单号:<%=list.get(ls).get("order_num")%></td>
                      <td>订单金额:<%="SUBMIT".equals(list.get(ls).get("order_status")+"")?"待确定":list.get(ls).get("order_price")+"" %></td>
                    </tr>
                    <tr>
                      <td>设备类型:<%=list.get(ls).get("meaning")%> </td>
                      <td>SN: <%=list.get(ls).get("sn_code")%></td>
                    </tr>
                    <tr>
                      <td colspan="2">不良现象:<%=list.get(ls).get("description")%></td>
                    </tr>
                    <tr>
                      <td>是否过保:<%="SUBMIT".equals(list.get(ls).get("order_status")+"")?"待确定":("Y".equals(list.get(ls).get("shelf_life")+"")?"是":"否") %></td>
                      <td>支付状态:<%=("1".equals(list.get(ls).get("pay_status")+"")?"已支付":"未支付")%></td>
                    </tr>
                    <tr>
                      <td>订单状态:<%=statuStr %></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><a href="<%=path%>/view/order_info.jsp?orderId=<%=list.get(ls).get("id")%>">点击查看详情</a></td>
                      <td><%if("1".equals(list.get(ls).get("needPay")+"")){%><a href="<%=path%>/view/pay.jsp?orderId=<%=list.get(ls).get("id")%>">在线支付</a><%}%>
                        &nbsp;&nbsp;&nbsp;<%if("1".equals(list.get(ls).get("needPay")+"")){%><a href="<%=path%>/view/close.jsp?orderId=<%=list.get(ls).get("id")%>">不维修</a><%}%>
                        &nbsp;&nbsp;&nbsp;<%if("1".equals(list.get(ls).get("cancel")+"")){%><a href="<%=path%>/view/close.jsp?orderId=<%=list.get(ls).get("id")%>&type=24">取消订单</a><%}%></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <%}
          }%>

</div>
          <%--<a class="-serv" href="tel:4008889369"><img src="../images/help_iphone.png" alt="">联系客服</a>--%>
        </div></div></div></div></div>

</body>

<script>
  function showAnswer(id){
      if(document.getElementById("answer_"+id).style.display == 'none'){
          document.getElementById("answer_"+id).style.display = 'block';
      }else{
          document.getElementById("answer_"+id).style.display = 'none';
      }
  }
</script>
</html>