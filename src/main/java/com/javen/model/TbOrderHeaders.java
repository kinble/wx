package com.javen.model;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;

import java.util.List;
import java.util.Map;

/**
 * 授权获取到的用户信息
 * @author Javen
 */
public class TbOrderHeaders extends Model<TbOrderHeaders> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(TbOrderHeaders.class);
	
	public static final TbOrderHeaders me = new TbOrderHeaders();
	
	public boolean save(String cust){
		
		return true;
	}
	
	public List<TbOrderHeaders> getAll(){
		return me.find("select * from tb_order_headers");
	}


	public TbOrderHeaders findByOpenId(String openId){
		return this.findFirst("select * from tb_order_headers where weixin_id=?", openId);
	}


	public TbOrderHeaders findNeedPayByOpenId(String openId){
		return this.findFirst("select * from tb_order_headers where pay_status = 0" +
				" and order_status != '' and shelf_life = 'Y' and open_id = ? ", openId);
	}

	/**
	 * 根据map参数查找
	 * @param paras
	 * @return 
	 */
	public List<TbOrderHeaders> findByMap(Map<String, Object> paras) {
		StringBuilder sql = new StringBuilder("select * from tb_order_headers where 1=1 ");

		if (paras.containsKey("openId")) {
			sql.append(" open_id = ");
			sql.append(paras.get("openId"));
			sql.append(" ");
		}

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
