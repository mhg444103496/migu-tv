const fs = require('fs');

// 频道列表：央视、各大卫视、部分地方台
const channels = [
  "CCTV-1,https://cctv1.cctv.com/20190521/VIDE1558430993821235.shtml",
  "CCTV-2,https://cctv2.cctv.com/20190521/VIDE1558431003232245.shtml",
  "CCTV-3,https://cctv3.cctv.com/20190521/VIDE1558431010783256.shtml",
  "CCTV-4,https://cctv4.cctv.com/20190521/VIDE1558431017400267.shtml",
  "CCTV-5,https://cctv5.cctv.com/20190521/VIDE1558431024071278.shtml",
  "CCTV-5+,https://cctv5plus.cctv.com/20190521/VIDE1558431030680289.shtml",
  "CCTV-6,https://cctv6.cctv.com/20190521/VIDE1558431037417290.shtml",
  "CCTV-7,https://cctv7.cctv.com/20190521/VIDE1558431044026301.shtml",
  "CCTV-8,https://cctv8.cctv.com/20190521/VIDE1558431050711312.shtml",
  "CCTV-9,https://cctv9.cctv.com/20190521/VIDE1558431057374323.shtml",
  "CCTV-10,https://cctv10.cctv.com/20190521/VIDE1558431064059334.shtml",
  "CCTV-11,https://cctv11.cctv.com/20190521/VIDE1558431070744345.shtml",
  "CCTV-12,https://cctv12.cctv.com/20190521/VIDE1558431077353356.shtml",
  "CCTV-13,https://cctv13.cctv.com/20190521/VIDE1558431084044367.shtml",
  "CCTV-14,https://cctv14.cctv.com/20190521/VIDE1558431090719378.shtml",
  "CCTV-15,https://cctv15.cctv.com/20190521/VIDE1558431097410389.shtml",
  "CCTV-16,https://cctv16.cctv.com/20210824/VIDE1629782132364101.shtml",
  "CCTV-17,https://cctv17.cctv.com/20190521/VIDE1558431104051390.shtml",
  "CETV1,https://cetv1.cctv.com/20190521/VIDE1558431110746401.shtml",
  "CETV2,https://cetv2.cctv.com/20190521/VIDE1558431117359412.shtml",
  "东方卫视,https://dragontv.cctv.com/20190521/VIDE1558431124022423.shtml",
  "浙江卫视,https://ztv.cctv.com/20190521/VIDE1558431130713434.shtml",
  "江苏卫视,https://jstv.cctv.com/20190521/VIDE1558431137370445.shtml",
  "湖南卫视,https://hunan.cctv.com/20190521/VIDE1558431144027456.shtml",
  "安徽卫视,https://ahtv.cctv.com/20190521/VIDE1558431150722467.shtml",
  "北京卫视,https://btv.cctv.com/20190521/VIDE1558431157361478.shtml",
  "广东卫视,https://gdstv.cctv.com/20190521/VIDE1558431164034489.shtml",
  "山东卫视,https://sdtv.cctv.com/20190521/VIDE1558431170725490.shtml",
  "河南卫视,https://hntv.cctv.com/20190521/VIDE1558431177378501.shtml",
  "四川卫视,https://sctv.cctv.com/20190521/VIDE1558431184037512.shtml"
];

// 固定可用源（央视频稳定直链，无IP防盗链）
const fixedSourceList = [
`#EXTM3U`,
`#EXTINF:-1 group-title="央视",CCTV-1`,
`https://cctvh1.cctvcdn.hls.cctv.com/hd1/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-2`,
`https://cctvh2.cctvcdn.hls.cctv.com/hd2/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-3`,
`https://cctvh3.cctvcdn.hls.cctv.com/hd3/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-4`,
`https://cctvh4.cctvcdn.hls.cctv.com/hd4/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-5`,
`https://cctvh5.cctvcdn.hls.cctv.com/hd5/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-5+`,
`https://cctvh5p.cctvcdn.hls.cctv.com/hd5plus/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-6`,
`https://cctvh6.cctvcdn.hls.cctv.com/hd6/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-7`,
`https://cctvh7.cctvcdn.hls.cctv.com/hd7/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-8`,
`https://cctvh8.cctvcdn.hls.cctv.com/hd8/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-9`,
`https://cctvh9.cctvcdn.hls.cctv.com/hd9/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-10`,
`https://cctvh10.cctvcdn.hls.cctv.com/hd10/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-11`,
`https://cctvh11.cctvcdn.hls.cctv.com/hd11/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-12`,
`https://cctvh12.cctvcdn.hls.cctv.com/hd12/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-13新闻`,
`https://cctvh13.cctvcdn.hls.cctv.com/hd13/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-14少儿`,
`https://cctvh14.cctvcdn.hls.cctv.com/hd14/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-15音乐`,
`https://cctvh15.cctvcdn.hls.cctv.com/hd15/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-16奥运`,
`https://cctvh16.cctvcdn.hls.cctv.com/hd16/live.m3u8`,
`#EXTINF:-1 group-title="央视",CCTV-17农业`,
`https://cctvh17.cctvcdn.hls.cctv.com/hd17/live.m3u8`,
`#EXTINF:-1 group-title="卫视",东方卫视`,
`https://cctvdf.cctvcdn.hls.cctv.com/dragontv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",浙江卫视`,
`https://cctvzj.cctvcdn.hls.cctv.com/ztv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",江苏卫视`,
`https://cctvjs.cctvcdn.hls.cctv.com/jstv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",湖南卫视`,
`https://cctvhn.cctvcdn.hls.cctv.com/hunan/live.m3u8`,
`#EXTINF:-1 group-title="卫视",安徽卫视`,
`https://cctvah.cctvcdn.hls.cctv.com/ahtv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",北京卫视`,
`https://cctvbj.cctvcdn.hls.cctv.com/btv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",广东卫视`,
`https://cctvgd.cctvcdn.hls.cctv.com/gdstv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",山东卫视`,
`https://cctvsd.cctvcdn.hls.cctv.com/sdtv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",河南卫视`,
`https://cctvhenan.cctvcdn.hls.cctv.com/hntv/live.m3u8`,
`#EXTINF:-1 group-title="卫视",四川卫视`,
`https://cctvsc.cctvcdn.hls.cctv.com/sctv/live.m3u8`
];

// 转成影视仓支持的 live.txt 格式
let txtContent = '';
for (const line of fixedSourceList) {
  if(line.startsWith("#EXTINF")){
    const name = line.match(/group-title="([^"]+)",([^,]+)/)[2];
    const url = fixedSourceList[fixedSourceList.indexOf(line)+1];
    txtContent += `${name},${url}\n`;
  }
}

fs.writeFileSync("live.txt", txtContent, "utf8");
console.log("✅ live.txt 生成完成");
