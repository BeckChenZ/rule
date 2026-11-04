;(function(){
  try{
    const b=$response&&$response.body; if(!b) return $done({});
    let d; try{d=JSON.parse(b)}catch(e){return $done({})}

    // 命中即删的键（模糊匹配）
    const AD=['splash','ad','ads','popup','pop','banner','float','dialog','boot','launch',
              'recommend','market','activity','advert','intro','guide','welcome','cache'];
    const isAd=k=>k&&AD.some(x=>k.toLowerCase().includes(x));

    // 广告物料特征字段
    const HINT=['adType','adId','creativeId','material','landing','deeplink','clickUrl','imageUrl','videoUrl','linkUrl','jumpUrl'];

    function walk(n){
      if(!n||typeof n!=='object')return;
      if(Array.isArray(n)){
        for(let i=n.length-1;i>=0;i--){
          const it=n[i];
          if(it&&typeof it==='object'&&HINT.some(h=>h in it)) n.splice(i,1);
          else walk(it);
        }
        return;
      }
      for(const k in n){
        const v=n[k];
        if(isAd(k)){
          n[k]=Array.isArray(v)?[]:(v&&typeof v==='object'?{}:'');
          continue;
        }
        if(v&&typeof v==='object') walk(v);
      }
    }
    walk(d);
    $done({body:JSON.stringify(d)});
  }catch(e){$done({})}
})();

