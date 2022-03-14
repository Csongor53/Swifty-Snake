import GameObject from './GameObject.js';
import SnakePart from './SnakePart.js';

class Snake extends GameObject {
  constructor(ctx, config, tiles, canvas) {
    super(ctx, config, tiles);
    this.canvas = canvas;

    this.directionFound = false;

    this.headX = tiles / 2;
    this.headY = tiles / 2;

    this.x;
    this.y;

    this.dx = 0;
    this.dy = 0;

    this.size = config.w / tiles;

    this.parts = [];
    this.snakeLenght = 2;

    this.init();
  }

  init() {
    // area of triangle (x1, y1), (x2, y2) and (x3, y3)
    let area = (x1, y1, x2, y2, x3, y3) => {
      return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    };

    // check if P(x, y) is inside triangle A(x1, y1), B(x2, y2) and C(x3, y3)
    let isInside = (px, py, x1, y1, x2, y2, x3, y3) => {
      // area of triangle ABC
      let A = area(x1, y1, x2, y2, x3, y3);

      // area of triangle PBC
      let A1 = area(px, py, x2, y2, x3, y3);

      //  area of triangle PAC
      let A2 = area(x1, y1, px, py, x3, y3);

      // area of triangle PAB
      let A3 = area(x1, y1, x2, y2, px, py);

      // if sum of A1, A2 and A3 is same as A
      // return true or false
      return Math.abs(A - A1 - A2 - A3) < 10e-10;
    };

    //#region KEYBOARD
    // keydown eventListener
    document.addEventListener('keydown', (e) => {
      if (!this.directionFound) {
        // left & right up & down
        if (e.code == 'KeyA') {
          if (this.dx == 1) return;
          this.dy = 0;
          this.dx = -1;
        } else if (e.code == 'KeyD') {
          if (this.dx == -1) return;
          this.dy = 0;
          this.dx = 1;
        } else if (e.code == 'KeyW') {
          if (this.dy == 1) return;
          this.dy = -1;
          this.dx = 0;
        } else if (e.code == 'KeyS') {
          if (this.dy == -1) return;
          this.dy = 1;
          this.dx = 0;
        }
        this.directionFound = true;
      }
    });
    //#endregion

    //#region TOUCH
    // touchstart: screen is touched,
    // touchmove: move finger while touching event listeners
    let touchHandler = (e) => {
      if (e.touches) {
        if (!this.directionFound) {
          // Left
          if (
            this.dx !== 1 &&
            isInside(
              // Point P
              e.touches[0].pageX - this.canvas.offsetLeft,
              e.touches[0].pageY - this.canvas.offsetTop,
              // Triangle vertices
              // A
              0,
              0,
              // B
              this.config.w / 2,
              this.config.h / 2,
              // C
              0,
              this.config.h
            )
          ) {
            this.dy = 0;
            this.dx = -1;
          }
          // Right
          if (
            this.dx !== -1 &&
            isInside(
              // Point P
              e.touches[0].pageX - this.canvas.offsetLeft,
              e.touches[0].pageY - this.canvas.offsetTop,
              // Triangle vertices
              // A
              this.config.w,
              0,
              // B
              this.config.w / 2,
              this.config.h / 2,
              // C
              this.config.w,
              this.config.h
            )
          ) {
            this.dy = 0;
            this.dx = 1;
          }
          // Up
          if (
            this.dy !== 1 &&
            isInside(
              // Point P
              e.touches[0].pageX - this.canvas.offsetLeft,
              e.touches[0].pageY - this.canvas.offsetTop,
              // Triangle vertices
              // A
              0,
              0,
              // B
              this.config.w / 2,
              this.config.h / 2,
              // C
              this.config.w,
              0
            )
          ) {
            this.dy = -1;
            this.dx = 0;
          }
          // Down
          if (
            this.dy !== -1 &&
            isInside(
              // Point P
              e.touches[0].pageX - this.canvas.offsetLeft,
              e.touches[0].pageY - this.canvas.offsetTop,
              // Triangle vertices
              // A
              0,
              this.config.h,
              // B
              this.config.w / 2,
              this.config.h / 2,
              // C
              this.config.w,
              this.config.h
            )
          ) {
            this.dy = 1;
            this.dx = 0;
          }
          this.directionFound = true;
        }

        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', touchHandler);
    document.addEventListener('touchmove', touchHandler);
    //#endregion

    //#region Mouse
    document.addEventListener('mousedown', (e) => {
      if (!this.directionFound) {
        // Left
        if (
          this.dx !== 1 &&
          isInside(
            // Point P
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop,
            // Triangle vertices
            // A
            0,
            0,
            // B
            this.config.w / 2,
            this.config.h / 2,
            // C
            0,
            this.config.h
          )
        ) {
          this.dy = 0;
          this.dx = -1;
        }
        // Right
        if (
          this.dx !== -1 &&
          isInside(
            // Point P
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop,
            // Triangle vertices
            // A
            this.config.w,
            0,
            // B
            this.config.w / 2,
            this.config.h / 2,
            // C
            this.config.w,
            this.config.h
          )
        ) {
          this.dy = 0;
          this.dx = 1;
        }
        // Up
        if (
          this.dy !== 1 &&
          isInside(
            // Point P
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop,
            // Triangle vertices
            // A
            0,
            0,
            // B
            this.config.w / 2,
            this.config.h / 2,
            // C
            this.config.w,
            0
          )
        ) {
          this.dy = -1;
          this.dx = 0;
        }
        // Down
        if (
          this.dy !== -1 &&
          isInside(
            // Point P
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop,
            // Triangle vertices
            // A
            0,
            this.config.h,
            // B
            this.config.w / 2,
            this.config.h / 2,
            // C
            this.config.w,
            this.config.h
          )
        ) {
          this.dy = 1;
          this.dx = 0;
        }
        this.directionFound = true;
      }
      e.preventDefault();
    });

    //#endregion
  }

  update() {
    //#region Snake Tail
    this.parts.push(
      new SnakePart(this.ctx, this.config, this.tiles, this.headX, this.headY)
    );
    while (this.parts.length > this.snakeLenght) {
      this.parts.shift();
    }

    this.parts.forEach((part) => {
      part.update();
    });
    //#endregion

    //#region Snake Head
    this.headX += this.dx;
    this.headY += this.dy;

    this.x = this.headX * this.size;
    this.y = this.headY * this.size;
    //#endregion
  }

  render() {
    //#region Snake Tail
    this.parts.forEach((part) => {
      part.render();
    });
    //#endregion

    //#region Snake Head
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.x, this.y, this.size - 2, this.size - 2);
    //#endregion

    this.directionFound = false;
  }

  appleCollected() {
    this.snakeLenght++;
  }

  // used for collision detection
  getBoundingBox() {
    return super.getBoundingBox();
  }
}
export default Snake;
