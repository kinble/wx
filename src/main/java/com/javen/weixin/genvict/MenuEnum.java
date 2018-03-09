package com.javen.weixin.genvict;

public enum MenuEnum {
	
	/**
	 *
	 */
	MENU_ZXZF("V1001_ZZFF_ZXZF"), //在线支付
	MENU_LXFS("V1001_ZZFF_CYLXFS"),//常用联系方式
	MENU_ZXKF("V1001_RGFW_ZXKF"),//在线客服
	MENU_QTLJ("V1001_GDFF_QTLJ"),//其他链接
	MENU_BX("V1001_ZZFF_ZXBX"),//在线报修
	MENU_BZ("V1001_ZZFF_ZXBZ");//在线报障

	private String name;

	private MenuEnum(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
