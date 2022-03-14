import GameObject from './GameObject.js';

class Apple extends GameObject {
  constructor(ctx, config, tiles) {
    super(ctx, config, tiles);

    this.appleX = 5;
    this.appleY = 5;

    this.x;
    this.y;

    this.size = config.w / tiles;

    this.init();
  }

  init() {}

  update() {
    this.x = this.appleX * this.size;
    this.y = this.appleY * this.size;
  }

  render() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.size - 2, this.size - 2);
  }

  newApple() {
    this.appleX = Math.floor(Math.random() * this.tiles);
    this.appleY = Math.floor(Math.random() * this.tiles);
  }

  // used for collision detection
  getBoundingBox() {
    return super.getBoundingBox();
  }
}
export default Apple;
