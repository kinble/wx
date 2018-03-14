package com.javen.model;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 支付日志
 * @author LG
 */
public class TbMessage extends Model<TbMessage> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(TbMessage.class);
	
	public static final TbMessage me = new TbMessage();
	
	public boolean save(String cust_id, String phone, String context, String status,
						String created_by){
		TbMessage me = new TbMessage();
		me.set("open_id", cust_id);
		me.set("phone", phone);
		me.set("context", context);
		me.set("status", status);
		me.set("created_by", created_by);
		me.set("last_update_by", created_by);
		me.set("last_update_date", new Date());
		me.set("created_date", new Date());
		return me.save();
	}
	
	public List<TbMessage> getAll(){
		return me.find("select * from tb_message");
	}


}
