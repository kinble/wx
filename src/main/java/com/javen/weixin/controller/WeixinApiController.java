package com.javen.weixin.controller;

import com.jfinal.kit.PropKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.CallbackIpApi;
import com.jfinal.weixin.sdk.api.CustomServiceApi;
import com.jfinal.weixin.sdk.api.MenuApi;
import com.jfinal.weixin.sdk.api.QrcodeApi;
import com.jfinal.weixin.sdk.api.ShorturlApi;
import com.jfinal.weixin.sdk.api.TemplateMsgApi;
import com.jfinal.weixin.sdk.api.UserApi;
import com.jfinal.weixin.sdk.jfinal.ApiController;

public class WeixinApiController extends ApiController {

	/**
	 * 获取公众号菜单
	 */
	public void getMenu() {
		ApiResult apiResult = MenuApi.getMenu();
		if (apiResult.isSucceed()) {
			renderText(apiResult.getJson());
		} else {
			renderText(apiResult.getErrorMsg());
		}
	}

	/**
	 * 创建菜单
	 */
	public void createMenu()
	{
		String str = "{\n" +
				"     \"button\":[\n" +
				"     {    \n" +
				"          \"name\":\"自助服务\",\n" +
				"\t\t  \"sub_button\":[\n" +
				"           {    \n" +
				"               \"type\":\"view\",\n" +
				"               \"name\":\"在线报修\",\n" +
				"\t\t\t   \"url\":\""+ PropKit.get("domain")+"/redirect?state=bx\"\n" +
				"            },\n" +
				"            {\n" +
				"               \"type\":\"view\",\n" +
				"               \"name\":\"在线报障\",\n" +
				"\t\t\t   \"url\":\""+ PropKit.get("domain")+"/redirect?state=bz\"\n" +
				"            },\n" +
				"            {\n" +
				"               \"type\":\"view\",\n" +
				"               \"name\":\"在线支付\",\n" +
				//"\t\t\t   \"key\":\"V1001_ZZFF_ZXZF\"\n" +
				"\t\t\t   \"url\":\""+ PropKit.get("domain")+"/redirect?state=zxzf\"\n" +
				"            },\n" +
				"            {\n" +
				"               \"type\":\"view\",\n" +
				"               \"name\":\"我的订单\",\n" +
				"\t\t\t   \"url\":\""+ PropKit.get("domain")+"/redirect?state=orderlist\"\n" +
				"            }\n" +
				"]\n" +
				"      },\n" +
				"      {\n" +
				"           \"name\":\"人工服务\",\n" +
				"\t\t   \"sub_button\":[\n" +
				"           {    \n" +
				"               \"type\":\"click\",\n" +
				"               \"name\":\"在线客服\",\n" +
				"\t\t\t   \"key\":\"V1001_RGFW_ZXKF\"\n" +
				"            },\n" +
				"            {\n" +
				"               \"type\":\"view\",\n" +
				"               \"name\":\"在线留言\",\n" +
				"\t\t\t   \"url\":\""+ PropKit.get("domain")+"/redirect?state=zxly\"\n" +
				"            }]\n" +
				"           \n" +
				"      },\n" +
				"      {\n" +
				"           \"name\":\"更多服务\",\n" +
				"           \"sub_button\":[\n" +
				"           {    \n" +
				"               \"type\":\"view\",\n" +
				"               \"name\":\"常见问题\",\n" +
				"\t\t\t   \"url\":\""+ PropKit.get("domain")+"/view/FAQ.jsp\"\n" +
				"            },\n" +
				"            {\n" +
				"               \"type\":\"click\",\n" +
				"               \"name\":\"其他链接\",\n" +
				"\t\t\t   \"key\":\"V1001_GDFF_QTLJ\"\n" +
				"            }," +
				"            {\n" +
				"               \"type\":\"click\",\n" +
				"               \"name\":\"常用联系方式\",\n" +
				"\t\t\t   \"key\":\"V1001_ZZFF_CYLXFS\"\n" +
				"            }" +
				"]\n" +
				"       }]\n" +
				" }";
		ApiResult apiResult = MenuApi.createMenu(str);
		if (apiResult.isSucceed())
			renderText(apiResult.getJson());
		else
			renderText(apiResult.getErrorMsg());
	}

	/**
	 * 获取公众号关注用户
	 */
	public void getFollowers()
	{
		ApiResult apiResult = UserApi.getFollows();
		renderText(apiResult.getJson());
	}

	/**
	 * 获取用户信息
	 */
	public void getUserInfo()
	{
		ApiResult apiResult = UserApi.getUserInfo("oLdOB1NY_i_eRbTvPsDQH_iirgMc");
		renderText(apiResult.getJson());
	}

	/**
	 * 发送模板消息
	 */
	public void sendMsg()
	{
		String str = " {\n" +
				"           \"touser\":\"oLdOB1NY_i_eRbTvPsDQH_iirgMc\",\n" +
				"           \"template_id\":\"9SIa8ph1403NEM3qk3z9-go-p4kBMeh-HGepQZVdA7w\",\n" +
				"           \"url\":\"www.sina.com\",\n" +
				"           \"topcolor\":\"#FF0000\",\n" +
				"           \"data\":{\n" +
				"                   \"first\": {\n" +
				"                       \"value\":\"恭喜你购买成功！\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword1\":{\n" +
				"                       \"value\":\"去哪儿网发的酒店红包（1个）\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"keyword2\":{\n" +
				"                       \"value\":\"1元\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   },\n" +
				"                   \"remark\":{\n" +
				"                       \"value\":\"欢迎再次购买！\",\n" +
				"                       \"color\":\"#173177\"\n" +
				"                   }\n" +
				"           }\n" +
				"       }";
		ApiResult apiResult = TemplateMsgApi.send(str);
		renderText(apiResult.getJson());
	}

	/**
	 * 获取参数二维码
	 */
	public void getQrcode()
	{
		String str = "{\"expire_seconds\": 604800, \"action_name\": \"QR_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": 123}}}";
		ApiResult apiResult = QrcodeApi.create(str);
		renderText(apiResult.getJson());

//        String str = "{\"action_name\": \"QR_LIMIT_STR_SCENE\", \"action_info\": {\"scene\": {\"scene_str\": \"123\"}}}";
//        ApiResult apiResult = QrcodeApi.create(str);
//        renderText(apiResult.getJson());
	}
	/**
	 * 测试输出的结果
	 * create>>{"ticket":"gQFo8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0cwT21FZjNtM3RXbmd3REF6Ml82AAIEzyFQVwMEAAAAAA==","url":"http:\/\/weixin.qq.com\/q\/G0OmEf3m3tWngwDAz2_6"}
 qrcodeUrl:https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFo8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0cwT21FZjNtM3RXbmd3REF6Ml82AAIEzyFQVwMEAAAAAA==
	 * 
	 * 
	 */
	public void getQrcode2(){
		ApiResult apiResult = QrcodeApi.createPermanent(100);
		String qrcodeUrl = QrcodeApi.getShowQrcodeUrl(apiResult.getStr("ticket"));
		renderText("create>>"+apiResult.getJson()+" qrcodeUrl:"+qrcodeUrl);
	}

	/**
	 * 长链接转成短链接
	 */
	public void getShorturl()
	{
		String str = "{\"action\":\"long2short\"," +
				"\"long_url\":\"wap.koudaitong.com/v2/showcase/goods?alias=128wi9shh&spm=h56083&redirect_count=1\"}";
		ApiResult apiResult = ShorturlApi.getShorturl(str);
		renderText(apiResult.getJson());
	}

	/**
	 * 获取客服聊天记录
	 */
	public void getRecord()
	{
		String str = "{\n" +
				"    \"endtime\" : 987654321,\n" +
				"    \"pageindex\" : 1,\n" +
				"    \"pagesize\" : 10,\n" +
				"    \"starttime\" : 123456789\n" +
				" }";
		ApiResult apiResult = CustomServiceApi.getRecord(str);
		renderText(apiResult.getJson());
	}

	/**
	 * 获取微信服务器IP地址
	 */
	public void getCallbackIp()
	{
		ApiResult apiResult = CallbackIpApi.getCallbackIp();
		renderText(apiResult.getJson());
	}
	
}

