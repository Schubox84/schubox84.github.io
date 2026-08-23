(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var bg=document.querySelector('.page-bg');
  if(!bg) return;
  var ticking=false;
  function frame(){
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    var p=Math.min(Math.max(window.scrollY/max,0),1);
    // gentle drift: rises and slides as you scroll the page
    bg.style.transform='translate3d(0,'+(p*7)+'%,0)';
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame);}},{passive:true});
  window.addEventListener('resize',frame);
  frame();
})();
