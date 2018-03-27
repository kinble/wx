<%@ page import="com.javen.model.TbWiki" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@include file="jssdk.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
  + path + "/";
  List<TbWiki> list = TbWiki.me.getCJWTAll();
%>
<html lang="en" style="font-size: 16px;">
<head>
  <meta charset="utf-8">
  <title>常见问题</title>
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
  </style>

  <style type="text/css">.help {
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
  </style></head>
<body>
<div id="app">
  <div>
    <div>
      <div class="content page ">
        <div class="help fade-in">
          <div class="-list">
          <% if(list != null && list.size()>0){
              for (int ls = 0; ls < list.size(); ls ++ ){%>
            <div class="-c">
              <div class="-i">
                <div class="-title" onclick="showAnswer('<%= list.get(ls).get("id")%>')"><span class="-d"><%=list.get(ls).get("question") %></span><span class="-i"></span></div>
                <div class="-ct" style="display: none" id="answer_<%= list.get(ls).get("id")%>"><%= list.get(ls).get("answer") %></div>
              </div>
            </div>
            <%}
          }%>

</div><a class="-serv" href="tel:4008889369"><img src="../images/help_iphone.png" alt="">联系客服</a></div></div></div></div></div>

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