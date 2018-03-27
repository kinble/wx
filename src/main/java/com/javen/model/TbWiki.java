package com.javen.model;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 授权获取到的用户信息
 * @author Javen
 */
public class TbWiki extends Model<TbWiki> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(TbWiki.class);
	
	public static final TbWiki me = new TbWiki();

	public List<TbWiki> getAll(){
		return me.find("select * from tb_wiki where deleted_flag = 'N' order by id desc ");
	}

	public List<TbWiki> getCJWTAll(){
		return me.find("select * from tb_wiki where deleted_flag = 'N' AND type='CJWT' order by id desc ");
	}


	public TbWiki getNext(String dex){
		return me.findFirst("select * from tb_wiki where question like ? order by LENGTH(question) limit 1 ","%"+dex+"%");
	}


}
