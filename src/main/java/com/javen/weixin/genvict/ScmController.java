package com.javen.weixin.genvict;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.cache.EhCache;
import com.jfinal.weixin.sdk.api.*;
import com.jfinal.weixin.sdk.jfinal.MsgControllerAdapter;
import com.jfinal.weixin.sdk.msg.in.*;
import com.jfinal.weixin.sdk.msg.in.event.*;

/**
 * scm跳转过来的请求
 */
public class ScmController extends MsgControllerAdapter {
	static Log logger = Log.getLog(ScmController.class);
	EhCache ehCache = new EhCache();


    @Override
    protected void processInFollowEvent(InFollowEvent inFollowEvent) {
    }

    @Override
    protected void processInTextMsg(InTextMsg inTextMsg) {
    }

    @Override
    protected void processInMenuEvent(InMenuEvent inMenuEvent) {
    }

    /**
	 * 处理所有的菜单点击事件
	 */
	public void index(){
        String type=getPara("type");
        String openId=getPara("openId");
        openId = "oLdOB1NY_i_eRbTvPsDQH_iirgMc";
        if("FIX_NO_PRICE".equals(type)){
            String msg="您好！送修设备已收到！根据合同约定，设备处于质保期，我司将为您提供免费维修服务。设备回寄后，将另行通知。";
            ApiResult sendText =
                    CustomServiceApi.sendText(openId, msg);
        }else if("FIX_NEED_PRICE".equals(type)){
            String msg="您好，送修的设备已经收到！根据合同约定，设备已超过保修期，如需维修须支付维修费用。本次维修金额为XX元。" +
                    "\n请选择：" +
                    "\n<a href=\"http://www.baidu.com\">1.支付维修费用</a>" +
                    "\n<a href=\"http://www.baidu.com\">2.不维修，设备原路返回。</a>";
            ApiResult sendText =
                    CustomServiceApi.sendText(openId, msg);
        }else if("FIX_OK".equals(type)){
            String msg="您好，您送修的设备已经维修完毕。我们将依照回寄地址将设备寄回。感谢您使用金溢科技客户服务！";
            ApiResult sendText =
                    CustomServiceApi.sendText(openId, msg);
        }else if("FIX_GOTO10086".equals(type)){
            String msg="您送修的设备已经维修完毕，请在3个工作日后前往送修的营业厅领取设备及发票。感谢您使用金溢科技客户服务！";
            ApiResult sendText =
                    CustomServiceApi.sendText(openId, msg);
        }

	}


}






