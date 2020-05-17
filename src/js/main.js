import '../styles/main.scss';

let body = document.getElementById('body');

let sections = Array.from(document.getElementsByClassName('section'));
let timer = null;
let currentItemId = 'first';

window.addEventListener('scroll', function (event) {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    let scrollDirection = body.dataset.scrollDirection;
    let elementPositions;
    let closestElement;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (scrollDirection === 'both') {
      closestElement = sections.filter((element) => {
        elementPositions = element.getBoundingClientRect();
        return isElementTheHorizontalClosest(elementPositions, screenWidth, screenHeight) &&
          isElementTheVerticalClosest(elementPositions, screenWidth, screenHeight);
      });

      if (!closestElement.length) {
        document.getElementById(currentItemId).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        return;
      }

      currentItemId = closestElement[0].id;
    }

    if (scrollDirection === 'horizontal') {
      closestElement = sections.filter((element) => {
        elementPositions = element.getBoundingClientRect();
        return isElementTheHorizontalClosest(elementPositions, screenWidth, screenHeight) && isElementTheVerticalClosest(elementPositions, screenWidth, screenHeight);
      });

      currentItemId = closestElement[0].id;
    }

    if (scrollDirection === 'vertical') {
      closestElement = sections.filter((element) => {
        elementPositions = element.getBoundingClientRect();

        return isElementTheVerticalClosest(elementPositions, screenWidth, screenHeight);
      });


    }

    if (closestElement[0]) {
      currentItemId = closestElement[0].id;
      body.dataset.scrollDirection = closestElement[0].dataset.scrollDirection;
      closestElement[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }


  }, 100);
}, false);

function isElementTheVerticalClosest(elementPositions, screenWidth, screenHeight) {
  return (elementPositions.left < screenWidth && elementPositions.right > 0) &&
    (elementPositions.bottom > screenHeight / 2);
}

function isElementTheHorizontalClosest(elementPositions, screenWidth, screenHeight) {
  const elementIsVisible = elementPositions.top < screenHeight;
  const isLeftElement = (elementPositions.left >= 0 && (elementPositions.left < screenWidth / 2));
  const isRightElement = (elementPositions.right < screenWidth && (elementPositions.right > screenWidth / 2));

  return elementIsVisible &&
    (isLeftElement || isRightElement);
}
