(function(){
  var bg=document.querySelector('.page-bg');
  if(!bg) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var mobile=window.matchMedia('(max-width:768px)');
  var ticking=false;
  function frame(){
    var vh=window.innerHeight;
    var doc=document.documentElement.scrollHeight;
    var max=Math.max(1,doc-vh);
    var p=Math.min(Math.max(window.scrollY/max,0),1);
    if(mobile.matches){
      var travel=(doc*1.7*0.55)-vh;
      bg.style.backgroundPosition='center '+(-(p*Math.max(0,travel)))+'px';
    }else{
      bg.style.backgroundSize='100% '+doc+'px';
      bg.style.backgroundPosition='center '+(-(p*(doc-vh)))+'px';
    }
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame);}},{passive:true});
  window.addEventListener('resize',frame);
  frame();
})();
