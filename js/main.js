'use strict';

{
  // HTMLのストップ、スタート、タイマー、リセット操作するためのもの
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
let startTime; 
let timeoutId;
let elapsedTime = 0;

// タイマーを進める。現在の時間から押した時の時間を１０ミリ秒ごとに繰り返し続ける.
function countUp() {
const d = new Date(Date.now() - startTime + elapsedTime );
const m =String(d.getMinutes()).padStart(2,'0');
const s =String(d.getSeconds()).padStart(2,'0');
const ms =String(d.getMilliseconds()).padStart(3,'0');
timer.textContent = `${m}:${s}.${ms}`;

 timeoutId = setTimeout(() => {countUp()},10);
};
// startが何回も押されると不具合起きるから１回クリックされたら非表示化する
function initial(){
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.add('inactive');
}
// stopが何回も押されると不具合起きるから１回クリックされたら非表示化する
function running(){
  start.classList.add('inactive');
  stop.classList.remove('inactive');
  reset.classList.add('inactive');
}
// resetが何回も押されると不具合起きるから１回クリックされたら非表示化する
function stopped(){
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.remove('inactive');
}

initial();


// スタート押されたら、押された時の時間をstartTimeに代入して、 カウントアップ関数スタートさせて
start.addEventListener('click',() => {
  if(start.classList.contains('inactive')){
    return;}
  
  startTime = Date.now();
  countUp();
   running();
  
});

// タイマーを止める
stop.addEventListener('click',()=>{
  if(stop.classList.contains('inactive')){
    return;}
  clearTimeout(timeoutId);
  elapsedTime += Date.now() - startTime;
  stopped();
});

// タイマーリセット
reset.addEventListener('click',()=>{
  if(reset.classList.contains('inactive')){
    return;}

  timer.textContent = '00:00.000';
  elapsedTime = 0;
  initial();
});


}