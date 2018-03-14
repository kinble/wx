package com.javen.model;

import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 授权获取到的用户信息
 * @author Javen
 */
public class TbCustomer extends Model<TbCustomer> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(TbCustomer.class);
	
	public static final TbCustomer me = new TbCustomer();
	
	public boolean save(String customer_name,String customer_address,String customer_mobile,String openId){
		TbCustomer me = new TbCustomer();
		me.set("weixin_id", openId);
		me.set("customer_name", customer_name);
		me.set("customer_address", customer_address);
		me.set("customer_mobile", customer_mobile);
		me.set("created_by", customer_name);
		me.set("created_date", new Date());
		 return me.save();
	}
	
	public List<TbCustomer> getAll(){
		return me.find("select * from tb_customer");
	}


	public TbCustomer findByOpenId(String openId){
		return this.findFirst("select * from tb_customer where weixin_id=?", openId);
	}

	/**
	 * 根据map参数查找
	 * @param paras
	 * @return 
	 */
	public List<TbCustomer> findByMap(Map<String, Object> paras) {
		StringBuilder sql = new StringBuilder("select * from users ");
		if (paras.containsKey("order")) {
			sql.append(" ORDER BY ");
			sql.append(paras.get("order"));
			sql.append(" ");
		}
		if (paras.containsKey("limit")) {
			sql.append(" LIMIT ");
			sql.append(paras.get("limit"));
		}
		return this.find(sql.toString());
	}

}
