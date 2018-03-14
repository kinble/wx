package com.javen.weixin.genvict;

import com.alibaba.fastjson.JSONObject;
import com.javen.model.TbCustomer;
import com.javen.model.TbMessage;
import com.javen.model.TbOrderHeaders;
import com.javen.vo.AjaxResult;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.cache.EhCache;
import com.jfinal.weixin.sdk.api.*;
import com.jfinal.weixin.sdk.jfinal.MsgControllerAdapter;
import com.jfinal.weixin.sdk.msg.in.*;
import com.jfinal.weixin.sdk.msg.in.event.*;
import net.sf.ehcache.transaction.xa.EhcacheXAException;

/**
 * scm跳转过来的请求
 */
public class ScmController extends MsgControllerAdapter {
	static Log logger = Log.getLog(ScmController.class);
    private AjaxResult ajax = new AjaxResult();
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
        String orderId=getPara("orderId");
        //openId = "oLdOB1NY_i_eRbTvPsDQH_iirgMc";
        if("FIX_NO_PRICE".equals(type)){
            TbOrderHeaders order =TbOrderHeaders.me.findById(orderId);
            if(order != null){
                String msg="您好！\n" +
                        "订单编号为:<a href=\"" + PropKit.get("domain") + "/view/orderDetail?orderId=" + order.get("id") + "\">" +order.get("order_num")+"</a>"+
                        "的送修设备已收到！根据合同约定，设备处于质保期，我司将为您提供免费维修服务。设备回寄后，将另行通知。";
                ApiResult sendText =
                        CustomServiceApi.sendText(openId, msg);
            }
        }else if("FIX_NEED_PRICE".equals(type)){
            String msg= getPayMsg(openId,orderId);
            ApiResult sendText = CustomServiceApi.sendText(openId, msg);
        }else if("FIX_OK".equals(type)){
            TbOrderHeaders order =TbOrderHeaders.me.findById(orderId);
            if(order != null){
                String msg="您好!\n" +
                        "订单编号为:<a href=\"" + PropKit.get("domain") + "/view/orderDetail?orderId=" + order.get("id") + "\">" +order.get("order_num")+"</a>"+
                        "的设备已经维修完毕。我们将依照回寄地址将设备寄回。感谢您使用金溢科技客户服务！";
                ApiResult sendText =
                        CustomServiceApi.sendText(openId, msg);
            }
        }else if("FIX_GOTO10086".equals(type)){
            TbOrderHeaders order =TbOrderHeaders.me.findById(orderId);
            if(order != null){
                String msg="您好!\n" +
                        "订单编号为:<a href=\"" + PropKit.get("domain") + "/view/orderDetail?orderId=" + order.get("id") + "\">" +order.get("order_num")+"</a>"+
                        "的设备已经维修完毕，请在3个工作日后前往送修的营业厅领取设备及发票。感谢您使用金溢科技客户服务！";
                ApiResult sendText =
                        CustomServiceApi.sendText(openId, msg);
            }

        }else if("MSG_HF".equals(type)){
            TbMessage msg =TbMessage.me.findById(orderId);
            if(null != msg){
                String msgStr="您的在线留言客服已经回复:!\n" +
                        "您:" + msg.get("context") +
                        "\n回复:"+msg.get("back_context");
                ApiResult sendText =
                        CustomServiceApi.sendText(openId, msgStr);
            }
        }
	}

    /**
     * 关闭订单
     * @return
     */
    public void closeOrder(){
        String orderId = getPara("orderId");
        String openId = null;
        TbOrderHeaders order = TbOrderHeaders.me.findById(orderId);
        if (order != null && "0".equals(order.get("pay_status")+"") && "Y".equals(order.get("shelf_life")+"")) {
            openId = order.get("open_id");
            order.set("order_status","APPROVED");
            order.set("is_repair","N");
            order.update();
            ApiResult sendText = CustomServiceApi.sendText(openId,
                    "您好!" +
                        "\n订单编号:<a href=\"" + PropKit.get("domain") + "/view/orderDetail?orderId=" + order.get("id") + "\">" +order.get("order_num")+"</a>"+
                        "取消成功！我们将依照回寄地址将设备寄回。感谢您使用金溢科技客户服务！");
        } else {
            ajax.addError("订单状态异常,无法取消!");
            renderJson(ajax);
            return;
        }
        ajax.success(null);
        renderJson(ajax);
        return;
    }

	public String getPayMsg(String openId,String orderId){
        TbOrderHeaders order = null;
        if(orderId != null){
            order=TbOrderHeaders.me.findById(orderId);
        }else{
            order=TbOrderHeaders.me.findNeedPayByOpenId(openId,null);
        }
        String domain = PropKit.get("domain");
        String msg;
        if(order != null){
            msg="您好，送修的设备已经收到！根据合同约定，设备已超过保修期，如需维修须支付维修费用。本次维修金额为"+order.get("order_price")+"元。" +
                    "\n订单号:<a href=\"" + domain + "/view/orderDetail.jsp?orderId=" + order.get("id") + "\">"+order.get("order_num")+"</a>" +
                    "\n请选择：" +
                    "\n<a href=\""+domain+"/view/pay.jsp?orderId="+order.get("id")+"\">1.在线支付</a>" +
                    "\n<a href=\""+domain+"/view/close.jsp?orderId="+order.get("id")+"\">2.不维修，设备原路返回。</a>";
        }else{
            msg="您好，暂时没有需要支付的维修单。";
        }
        return msg;
    }



    /**
     * 创建在线留言
     * @return
     */
    public void createMessage(){
        try{
            JSONObject json = JSONObject.parseObject(this.getPara("json"));
            String openId = json.getString("openId");
            String mobile = json.getString("mobile");
            String userName = json.getString("userName");
            String context = json.getString("context");
            TbCustomer customer = TbCustomer.me.findByOpenId(openId);
            if(customer == null){
                customer.save(userName,null,mobile,openId);
            }
            TbMessage.me.save(openId,mobile,context,"0",userName);
        }catch (Exception e){
            ajax.addError("留言保存失败,请稍后再试!"+e.getMessage());
            renderJson(ajax);
            return;
        }
        ajax.success(null);
        renderJson(ajax);
        return;
    }


}






