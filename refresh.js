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
  {name:"东方卫视",id:"mg_live_dftv"},
  {name:"江苏卫视",id:"mg_live_jstv"},
  {name:"浙江卫视",id:"mg_live_zjtv"},
  {name:"湖南卫视",id:"mg_live_hntv"},
  {name:"北京卫视",id:"mg_live_bjtv"},
  {name:"广东卫视",id:"mg_live_gdtv"},
  {name:"深圳卫视",id:"mg_live_sztv"},
  {name:"安徽卫视",id:"mg_live_ahtv"},
  {name:"山东卫视",id:"mg_live_sdtv"},
  {name:"湖北卫视",id:"mg_live_hbtv"},
  {name:"四川卫视",id:"mg_live_sctv"},
  {name:"重庆卫视",id:"mg_live_cqtv"},
  {name:"河南卫视",id:"mg_live_hntv_hn"},
  {name:"河北卫视",id:"mg_live_hbtv_hb"},
  {name:"辽宁卫视",id:"mg_live_lntv"},
  {name:"江西卫视",id:"mg_live_jxtv"},
  {name:"福建东南卫视",id:"mg_live_fjtv"},
  {name:"广西卫视",id:"mg_live_gxtv"},
  {name:"贵州卫视",id:"mg_live_gztv"},
  {name:"云南卫视",id:"mg_live_yntv"},
  {name:"陕西卫视",id:"mg_live_sxtv"},
  {name:"甘肃卫视",id:"mg_live_gstv"},
  {name:"宁夏卫视",id:"mg_live_nxtv"},
  {name:"青海卫视",id:"mg_live_qhtv"},
  {name:"新疆卫视",id:"mg_live_xjtv"},
  {name:"内蒙古卫视",id:"mg_live_nmtv"},
  {name:"黑龙江卫视",id:"mg_live_hljtv"},
  {name:"吉林卫视",id:"mg_live_jltv"},
  {name:"天津卫视",id:"mg_live_tjtv"},
];

function getMiguUrl(programId) {
  return new Promise((resolve)=>{
    const opt = {
      hostname:"api.miguvideo.com",
      path:`/mgs/pc/live/getLiveUrl?programId=${programId}`,
      method:"GET"
    };
    const req = https.request(opt,(res)=>{
      let buf = "";
      res.on("data",d=>buf+=d);
      res.on("end",()=>{
        try{
          const json = JSON.parse(buf);
          if(json.data && json.data.playUrl){
            resolve(json.data.playUrl);
          }else resolve("");
        }catch(e){resolve("");}
      })
    });
    req.on("error",()=>resolve(""));
    req.end();
  })
}

(async function main(){
  let out = "#咪咕直播源自动刷新\n#更新时间:"+new Date().toLocaleString()+"\n";
  for(let ch of channels){
    const url = await getMiguUrl(ch.id);
    if(url){
      out += `${ch.name},${url}\n`
    }
  }
  fs.writeFileSync("./live.txt",out,"utf8");
  console.log("✅ live.txt 生成完毕");
})()
