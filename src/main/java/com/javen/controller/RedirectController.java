package com.javen.controller;

import com.javen.model.TUser;
import com.jfinal.core.Controller;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.PropKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.CustomServiceApi;
import com.jfinal.weixin.sdk.jfinal.ApiController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Javen
 * 2016年3月20日
 */
public class RedirectController extends Controller {
	public void index(){
		String url="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+PropKit.get("appId")
				+"&redirect_uri=http://t8pg9w.natappfree.cc/oauth?response_type=code&scope=snsapi_base&state="+getPara("state")+"&connect_redirect=1#wechat_redirect";
		System.out.println(url);
		redirect(url);
	}
	
}
