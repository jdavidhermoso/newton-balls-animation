import '../styles/main.scss';

const tapAdd = document.getElementById('tap-ad');
let balls = Array.from(document.getElementsByClassName("ball"));

tapAdd.addEventListener('click', () => {
  tapAdd.style.display = 'none';
  startVibration();
});

function startVibration() {
  balls.forEach((ball) => {
    ball.addEventListener("animationiteration", onBallImpact);
  });
}

function onBallImpact() {
  navigator.vibrate(200);
}

