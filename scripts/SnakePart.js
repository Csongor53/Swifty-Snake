import GameObject from './GameObject.js';

class SnakePart extends GameObject {
  constructor(ctx, config, tiles, partX, partY) {
    super(ctx, config, tiles);

    this.partX = partX;
    this.partY = partY;

    this.x;
    this.y;

    this.size = config.w / tiles;

    this.init();
  }

  init() {}

  update() {
    this.x = this.partX * this.size;
    this.y = this.partY * this.size;
  }

  render() {
    this.ctx.fillStyle = 'yellowgreen';
    this.ctx.fillRect(
      this.x,
      this.y,
      this.size - 2,
      this.size - 2 
    );
  }

  // used for collision detection
  getBoundingBox() {
    return super.getBoundingBox();
  }
}
export default SnakePart;
