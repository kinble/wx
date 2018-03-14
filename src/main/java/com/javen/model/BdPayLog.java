package com.javen.model;

import com.jfinal.kit.StrKit;
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
public class BdPayLog extends Model<BdPayLog> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(BdPayLog.class);
	
	public static final BdPayLog me = new BdPayLog();
	
	public boolean save(String source_type, Integer source_header_id, String pay_type, String out_trade_no,
						String pay_no, BigDecimal pay_amount,String status,String remark,String last_updated_by){
		BdPayLog me = new BdPayLog();
		me.set("source_type", source_type);
		me.set("source_header_id", source_header_id);
		me.set("pay_type", pay_type);
		me.set("out_trade_no", out_trade_no);
		me.set("pay_no", pay_no);
		me.set("pay_amount", pay_amount);
		me.set("status", status);
		me.set("remark", remark);
		me.set("last_updated_by", last_updated_by);
		me.set("last_update_date", new Date());
		return me.save();
	}
	
	public List<BdPayLog> getAll(){
		return me.find("select * from bd_pay_log");
	}


	public BdPayLog findByPayNo(String payNo){
		return this.findFirst("select * from bd_pay_log where pay_no=?", payNo);
	}
	public BdPayLog findByOutTradeNo(String outTradeNo){
		return this.findFirst("select * from bd_pay_log where out_trade_no=?", outTradeNo);
	}

	/**
	 * 根据map参数查找
	 * @param paras
	 * @return 
	 */
	public List<BdPayLog> findByMap(Map<String, Object> paras) {
		StringBuilder sql = new StringBuilder("select * from bd_pay_log ");
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
