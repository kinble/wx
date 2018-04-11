package com.javen.weixin.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.javen.interceptor.JSSDKInterceptor;
import com.javen.model.TbCustomer;
import com.javen.model.TbOrderHeaders;
import com.javen.model.Users;
import com.javen.utils.WeiXinUtils;
import com.jfinal.aop.Before;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.SnsAccessToken;
import com.jfinal.weixin.sdk.api.SnsAccessTokenApi;
import com.jfinal.weixin.sdk.api.SnsApi;
import com.jfinal.weixin.sdk.api.UserApi;
import com.jfinal.weixin.sdk.jfinal.ApiController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Javen
 * 2015年12月5日下午2:20:44
 *
 */
public class WeiXinOauthController extends ApiController{
	static Log log = Log.getLog(WeiXinOauthController.class);
	/**
	 * 如果要支持多公众账号，只需要在此返回各个公众号对应的  ApiConfig 对象即可
	 * 可以通过在请求 url 中挂参数来动态从数据库中获取 ApiConfig 属性值
	 */
	public ApiConfig getApiConfig() {
		ApiConfig ac = new ApiConfig();
		
		// 配置微信 API 相关常量
		ac.setToken(PropKit.get("token"));
		ac.setAppId(PropKit.get("appId"));
		ac.setAppSecret(PropKit.get("appSecret"));
		
		/**
		 *  是否对消息进行加密，对应于微信平台的消息加解密方式：
		 *  1：true进行加密且必须配置 encodingAesKey
		 *  2：false采用明文模式，同时也支持混合模式
		 */
		ac.setEncryptMessage(PropKit.getBoolean("encryptMessage", false));
		ac.setEncodingAesKey(PropKit.get("encodingAesKey", "setting it in config file"));
		return ac;
	}
	
	public void index() {
		int  subscribe=0;
		//用户同意授权，获取code
		String code=getPara("code");
		String state=getPara("state");
		if (code!=null) {
			String appId=ApiConfigKit.getApiConfig().getAppId();
			String secret=ApiConfigKit.getApiConfig().getAppSecret();
			//通过code换取网页授权access_token
			SnsAccessToken snsAccessToken=SnsAccessTokenApi.getSnsAccessToken(appId,secret,code);
//			String json=snsAccessToken.getJson();
			String token=snsAccessToken.getAccessToken();
			String openId=snsAccessToken.getOpenid();
			//拉取用户信息(需scope为 snsapi_userinfo)
			if(false) {
				ApiResult apiResult = UserApi.getUserInfo(openId);
				log.warn("getUserInfo:" + apiResult.getJson());
				if (apiResult.isSucceed()) {
					JSONObject jsonObject = JSON.parseObject(apiResult.getJson());
					String nickName = jsonObject.getString("nickname");
					//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
					int sex = jsonObject.getIntValue("sex");
					String city = jsonObject.getString("city");//城市
					String province = jsonObject.getString("province");//省份
					String country = jsonObject.getString("country");//国家
					String headimgurl = jsonObject.getString("headimgurl");
					String unionid = jsonObject.getString("unionid");
					//获取用户信息判断是否关注
					ApiResult userInfo = UserApi.getUserInfo(openId);
					log.warn(JsonKit.toJson("is subsribe>>" + userInfo));
					if (userInfo.isSucceed()) {
						String userStr = userInfo.toString();
						subscribe = JSON.parseObject(userStr).getIntValue("subscribe");
					}
					Users.me.save(openId, WeiXinUtils.filterWeixinEmoji(nickName), unionid, headimgurl, country, city, province, sex);
				}
			}
			
			setSessionAttr("openId", openId);
			if (true) {
				//根据state 跳转到不同的页面
				if (state.equals("bx")) {//保修
					//redirect("/back/tuser.jsp");
					TbOrderHeaders order = TbOrderHeaders.me.findOneByOpenId(openId);
					if(null != order){
						setSessionAttr("province",order.get("province"));
						setSessionAttr("city",order.get("city"));
						setSessionAttr("area",order.get("area"));
						setSessionAttr("address",order.get("address"));
						setSessionAttr("link_name",order.get("link_name"));
						setSessionAttr("mobile",order.get("mobile"));
					}
					render("/view/online_fix.jsp?type=1");
					//forwardAction("/static/online_fix.html");
				}else if (state.equals("bz"))  {//报障
					TbOrderHeaders order = TbOrderHeaders.me.findOneByOpenId(openId);
					if(null != order){
						setSessionAttr("province",order.get("province"));
						setSessionAttr("city",order.get("city"));
						setSessionAttr("area",order.get("area"));
						setSessionAttr("address",order.get("address"));
						setSessionAttr("link_name",order.get("link_name"));
						setSessionAttr("mobile",order.get("mobile"));
					}
					render("/view/online_fix.jsp?type=0");
				}else if (state.equals("zxly"))  {

					TbCustomer cust = TbCustomer.me.findByOpenId(openId);
					if(null != cust){
						setSessionAttr("customer_name",cust.get("customer_name"));
						setSessionAttr("customer_mobile",cust.get("customer_mobile"));
					}
					render("/view/message.jsp");
				}else if (state.equals("zxzf"))  {
					//购买 在线支付
					redirect("/view/cust_pay.jsp");
				}else if (state.equals("orderlist"))  {
					//维修单列表
					redirect("/view/orderList.jsp");
				}else if (state.equals("pay"))  {
					render("/view/cust_pay.jsp");
				}else {
					redirect("/login");
				}
			}
			
			
		}else {
			renderText("code is  null");
		}
	}
	
	/**
	 * PC扫码登陆回调 
	 * 获取AccessToken以及用户信息跟微信公众号授权用户用户信息一样
	 */
	public void webCallBack() {
		//用户同意授权，获取code
		String code=getPara("code");
		String state=getPara("state");
		if (code!=null) {
			System.out.println("code>"+code+" state>"+state);
			String appId=PropKit.get("webAppId");
			String secret=PropKit.get("webAppSecret");
			//通过code换取网页授权access_token
			SnsAccessToken snsAccessToken=SnsAccessTokenApi.getSnsAccessToken(appId,secret,code);
			String json=snsAccessToken.getJson();
System.out.println("通过code获取access_token>>"+json);			
			String token=snsAccessToken.getAccessToken();
			String openId=snsAccessToken.getOpenid();
			//拉取用户信息(需scope为 snsapi_userinfo)
			ApiResult apiResult=SnsApi.getUserInfo(token, openId);
			
log.warn("getUserInfo:"+apiResult.getJson());
			if (apiResult.isSucceed()) {
				JSONObject jsonObject=JSON.parseObject(apiResult.getJson());
				String nickName=jsonObject.getString("nickname");
				//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
				int sex=jsonObject.getIntValue("sex");
				String city=jsonObject.getString("city");//城市
				String province=jsonObject.getString("province");//省份
				String country=jsonObject.getString("country");//国家
				String headimgurl=jsonObject.getString("headimgurl");
				String unionid=jsonObject.getString("unionid");
			}
			renderText("通过code获取access_token>>"+json+"  \n"+"getUserInfo:"+apiResult.getJson());
		}
		
	}
	
}
