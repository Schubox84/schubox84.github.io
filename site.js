(function(){
  var bg=document.querySelector('.page-bg');
  if(!bg) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ticking=false;
  function frame(){
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    var p=Math.min(Math.max(window.scrollY/max,0),1);
    // pan the scene: 0% = left edge (gears & desk) -> 100% = right edge (tree)
    bg.style.backgroundPosition='left '+(p*100).toFixed(2)+'% center';
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame);}},{passive:true});
  window.addEventListener('resize',frame);
  frame();
})();
