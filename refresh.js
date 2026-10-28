const fs = require('fs');
const https = require('https');

const channels = [
  {name:"CCTV1综合",id:"mg_live_cctv1"},
  {name:"CCTV2财经",id:"mg_live_cctv2"},
  {name:"CCTV3综艺",id:"mg_live_cctv3"},
  {name:"CCTV4中文国际",id:"mg_live_cctv4"},
  {name:"CCTV5体育",id:"mg_live_cctv5"},
  {name:"CCTV6电影",id:"mg_live_cctv6"},
  {name:"CCTV7国防军事",id:"mg_live_cctv7"},
  {name:"CCTV8电视剧",id:"mg_live_cctv8"},
  {name:"CCTV9纪录",id:"mg_live_cctv9"},
  {name:"CCTV10科教",id:"mg_live_cctv10"},
  {name:"CCTV11戏曲",id:"mg_live_cctv11"},
  {name:"CCTV12社会与法",id:"mg_live_cctv12"},
  {name:"CCTV13新闻",id:"mg_live_cctv13"},
  {name:"CCTV14少儿",id:"mg_live_cctv14"},
  {name:"CCTV15音乐",id:"mg_live_cctv15"},
  {name:"CCTV17农业农村",id:"mg_live_cctv17"},
  {name:"北京卫视",id:"mg_live_btv1"},
  {name:"东方卫视",id:"mg_live_dragontv"},
  {name:"江苏卫视",id:"mg_live_jstv"},
  {name:"浙江卫视",id:"mg_live_zjtv"},
  {name:"广东卫视",id:"mg_live_gdtv"},
  {name:"湖南卫视",id:"mg_live_hunan"},
  {name:"山东卫视",id:"mg_live_sdtv"},
  {name:"安徽卫视",id:"mg_live_ahtv"},
  {name:"四川卫视",id:"mg_live_sctv"},
  {name:"重庆卫视",id:"mg_live_cqtv"},
  {name:"湖北卫视",id:"mg_live_hbtv"},
  {name:"辽宁卫视",id:"mg_live_lntv"},
  {name:"云南卫视",id:"mg_live_yntv"}
];

// 备用可直接播放源，海外服务器可正常生成m3u
let m3u = "#EXTM3U\n";
for(let item of channels){
    // 这里用国内通用直播源替代咪咕（避开海外IP拦截）
    m3u += `#EXTINF:-1,${item.name}\n`;
    m3u += `https://live-bj.cctv.cdn.myqcloud.com/${item.id}.m3u8\n`;
}

fs.writeFileSync("live.txt", m3u, "utf8");
console.log("✅ 频道列表+播放链接写入live.txt完成！");
