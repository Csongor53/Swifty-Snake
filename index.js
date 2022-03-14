import Snake from './scripts/Snake.js';
import Apple from './scripts/Apple.js';
import PointsDisplay from './scripts/PointsDisplay.js';

let started;

let snake;
let apple;
let pointsDisplay;

let canvas;
let ctx;
let tileSlider;
let sliderDisplay;

let fps;

let gameObjects = [];

let tiles;

let config = {
  w: undefined,
  h: undefined,
};

const biteSound = new Audio('./assets/Bite.mp3');
const gameOverSound = new Audio('./assets/GameOver.mp3');




const init = () => {
  // Get responsive values (width & height)
  let screenSize;
  if (
    document.querySelector('body').getBoundingClientRect().width <=
    document.querySelector('body').getBoundingClientRect().height
  )
    screenSize =
      document.querySelector('body').getBoundingClientRect().width * 0.95;
  else
    screenSize =
      document.querySelector('body').getBoundingClientRect().height * 0.95;
  config.w = screenSize;
  config.h = screenSize;

  // instantiate canvas & set values from config object
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = config.w;
  canvas.height = config.h;

  // instantiate apple
  apple = new Apple(ctx, config, tiles);
  gameObjects.push(apple);

  //instantiate snake
  snake = new Snake(ctx, config, tiles, canvas);
  gameObjects.push(snake);

  // instantiate points display
  pointsDisplay = new PointsDisplay(ctx, config);
  gameObjects.push(pointsDisplay);

  // console.log(canvas.offsetLeft)

  // set frames per second
  fps = tiles / 6;
  // start game loop
  gameLoop();
};

const gameLoop = () => {
  // create timeout window to iterate the game loop
  setTimeout(() => {
    if (started) {
      update();
    }
    gameLoop();
  }, 1000 / fps);
};

const update = () => {
  //#region update all game objects
  gameObjects.forEach((gameObject) => {
    gameObject.update();
  });
  //#endregion

  //#region Apple Collection
  if (snake.headX == apple.appleX && snake.headY == apple.appleY) {
    apple.newApple();
    snake.appleCollected();
    pointsDisplay.increase();
    fps += 0.2;
    biteSound.play();
  }
  //#endregion

  //#region Check for game over
  if (!(snake.dx === 0 && snake.dy == 0)) {
    // // walls
    if (snake.headX < 0) {
      started = false;
    } else if (snake.headX >= tiles) {
      started = false;
    } else if (snake.headY < 0) {
      started = false;
    } else if (snake.headY >= tiles) {
      started = false;
    }
    // body
    snake.parts.forEach((part) => {
      if (snake.headX == part.partX && snake.headY == part.partY) {
        started = false;
      }
    });
  }

  pointsDisplay.checkHiScore()

  if (!started) gameOver();

  //#endregion

  if (started) render();
};

const render = () => {
  // clear the canvas
  ctx.resetTransform();
  ctx.clearRect(0, 0, config.w, config.h);

  // render all game objects
  gameObjects.forEach((gameObject) => {
    gameObject.render();
  });
};

const gameOver = () => {
  document.getElementById('gameOver').hidden = false;
  gameOverSound.play();
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

// ==========================================================================
// Main Menu related code
// ==========================================================================

let hideMainMenu = (id) => {
  let childElements = document.getElementById(id).children;

  for (let i = 0; i < childElements.length; i++) {
    if (childElements[i].children.length !== 0) {
      for (let j = 0; j < childElements[i].children.length; j++) {
        hideMainMenu(childElements[i].id);
      }
    }

    childElements[i].hidden = true;
  }
};

// when everything is loaded the game starts by clicking enter or clicking on the start button
window.addEventListener('load', () => {
  //#region Tile Count Slider
  // get and set defoult values of the tile count selector
  tileSlider = document.getElementById('sliderValue');
  sliderDisplay = document.getElementById('sliderDisplay');

  let value = 30;
  sliderDisplay.innerHTML = value;
  tiles = value;

  // refresh the tile count
  tileSlider.oninput = () => {
    console.log(tileSlider.value, value);
    switch (tileSlider.value - 1) {
      case 0:
        value = 20;
        break;
      case 1:
        value = 30;
        break;
      case 2:
        value = 40;
        break;
    }
    sliderDisplay.innerHTML = value;
    tiles = value;
  };
  //#endregion

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && !started) {
      started = true;
      hideMainMenu('startBox');
      document.getElementById('canvas').hidden = false;
      init();
    }
  });

  document.getElementById('start').addEventListener('click', () => {
    started = true;
    hideMainMenu('startBox');
    document.getElementById('canvas').hidden = false;
    init();
  });
});
