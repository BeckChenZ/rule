;(function(){
  try{
    const b=$response&&$response.body; if(!b) return $done({});
    let d; try{d=JSON.parse(b)}catch(e){return $done({})}
    const AD=['splash','splashad','splashads','splashinfo','splashconfig','ad','ads','adinfo','adlist','admap','addata','addatas','popup','popups','popupad','popupconfig','dialog','dialogad','banner','banners','bannerad','float','floatad','floatingad','intro','introduce','guide','boot','launch','welcome','recommendad','marketing','advert','advertise','advertisement','cachecleanup'];
    const T=['showtime','displaytime','duration','delay','interval','countdown','countdown','expire','expiretime','validtime','starttime','endtime','effectstarttime','effectiveendtime'];
    const hint=o=>o&&typeof o==='object'&&['adtype','adid','creativeid','material','landing','deeplink','clickurl','imageurl','videourl'].some(k=>k in o);
    const isk=k=>k&&AD.some(x=>k.toLowerCase().includes(x));
    (function w(n){
      if(!n||typeof n!=='object')return;
      if(Array.isArray(n)){for(let i=n.length-1;i>=0;i--){hint(n[i])?n.splice(i,1):w(n[i])}return}
      for(const k in n){const v=n[k];
        if(isk(k)){n[k]=Array.isArray(v)?[]:(v&&typeof v==='object'?{}:'');continue}
        if(T.includes(k.toLowerCase())&&typeof v==='number')n[k]=0;
        if(v&&typeof v==='object')w(v)}
    })(d);
    $done({body:JSON.stringify(d)});
  }catch(e){$done({})}
})();