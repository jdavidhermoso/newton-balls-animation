import '../styles/main.scss';

let balls = Array.from(document.getElementsByClassName("ball"));

balls.forEach((ball) => {
  ball.addEventListener("animationiteration", function (e) {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

  }, false);
});

