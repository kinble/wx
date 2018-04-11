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



	public TbOrderHeaders findNeedPayByOpenId(String openId,String orderId){
		if(orderId != null){
			this.findById(orderId);
		}
		return this.findFirst("select * from tb_order_headers where pay_status = 0" +
				" and order_status != '' and shelf_life = 'Y' and order_status not in('COMPLETE') " +
				" and "+(null != orderId ? "id":"open_id")+" = ? and ifnull(is_repair,'') != 'N' ", openId);
	}

	public TbOrderHeaders findOneByOpenId(String openId){
		return this.findFirst("select * from tb_order_headers where open_id = ? order by id desc ", openId);
	}

	public List<TbOrderHeaders> findByOpenId(String openId){
		return this.find("select a.*,b.meaning,DATE_FORMAT(a.CREATED_date,'%Y-%m-%d') as orderDate," +
				"if((pay_status = 0 and shelf_life = 'Y' and ifnull(is_repair,'') != 'N' and a.order_status not in('COMPLETE')),1,0) needPay, " +
				"if((pay_status = 1 and a.order_status in('APPROVED') " +
				" and exists (select 1 from bd_pay_log pl where pl.source_header_id = a.id and pl.status= 'SUCCESS'\n" +
				"and DATE_ADD(pl.last_update_date,INTERVAL 1 DAY)>now() )),1,0) cancel " +
				" from tb_order_headers a,tb_lookup_values b " +
				" where a.machine_type = b.LOOKUP_CODE and b.LOOKUP_TYPE = 'MACHINE_TYPE' and  a.open_id = ? order by a.id desc ", openId);
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
