const fs = require('fs');
const https = require('https');

const channels = [
  // CCTV央视
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

  // 省级卫视
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
  {name:"云南卫视",id:"mg_live_yntv"},
  {name:"河北卫视",id:"mg_live_hebtv"},
  {name:"河南卫视",id:"mg_live_hntv"},
  {name:"江西卫视",id:"mg_live_jxtv"},
  {name:"广西卫视",id:"mg_live_gxtv"},
  {name:"贵州卫视",id:"mg_live_gztv"},
  {name:"山西卫视",id:"mg_live_sxtv"},
  {name:"陕西卫视",id:"mg_live_sxtv2"},
  {name:"吉林卫视",id:"mg_live_jltv"},
  {name:"黑龙江卫视",id:"mg_live_hljtv"},
  {name:"内蒙古卫视",id:"mg_live_nmtv"},
  {name:"宁夏卫视",id:"mg_live_nxtv"},
  {name:"甘肃卫视",id:"mg_live_gstv"},
  {name:"青海卫视",id:"mg_live_qhtv"},
  {name:"新疆卫视",id:"mg_live_xjtv"},
  {name:"海南卫视",id:"mg_live_hntv2"},
  {name:"厦门卫视",id:"mg_live_xmtv"},
  {name:"深圳卫视",id:"mg_live_sztv"},

  // 地方台（河南本地，你鹤壁能用）
  {name:"河南都市频道",id:"mg_live_hndushi"},
  {name:"河南民生频道",id:"mg_live_hnms"},
  {name:"河南电视剧频道",id:"mg_live_hndsj"},
  {name:"河南新闻频道",id:"mg_live_hnxw"},
  {name:"河南乡村频道",id:"mg_live_hnxc"},
  {name:"鹤壁综合频道",id:"mg_live_hebi1"},
  {name:"鹤壁科教频道",id:"mg_live_hebi2"}
];

let m3u = "#EXTM3U\n";
for(let item of channels){
    m3u += `#EXTINF:-1,${item.name}\n`;
    m3u += `https://live-bj.cctv.cdn.myqcloud.com/${item.id}.m3u8\n`;
}

fs.writeFileSync("live.txt", m3u, "utf8");
console.log("✅ 全部频道写入live.txt完成！");
