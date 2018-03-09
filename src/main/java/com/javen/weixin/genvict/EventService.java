package com.javen.weixin.genvict;

import com.javen.face.FaceService;
import com.javen.utils.WeiXinUtils;
import com.javen.weixin.controller.WeixinMsgController;
import com.javen.weixin.service.BaiduTranslate;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.cache.EhCache;
import com.jfinal.weixin.sdk.api.*;
import com.jfinal.weixin.sdk.api.CustomServiceApi.Articles;
import com.jfinal.weixin.sdk.jfinal.MsgControllerAdapter;
import com.jfinal.weixin.sdk.msg.in.*;
import com.jfinal.weixin.sdk.msg.in.event.*;
import com.jfinal.weixin.sdk.msg.in.speech_recognition.InSpeechRecognitionResults;
import com.jfinal.weixin.sdk.msg.out.OutCustomMsg;
import com.jfinal.weixin.sdk.msg.out.OutTextMsg;
import com.jfinal.weixin.sdk.msg.out.OutVoiceMsg;
import net.sf.ehcache.management.CacheManager;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 */
public class EventService extends WeixinMsgController {
	static Log logger = Log.getLog(EventService.class);





}






