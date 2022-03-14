class GameObject {
  constructor(ctx, config, tiles) {
    this.tiles = tiles;
    this.ctx = ctx;
    this.config = config;

    this.x;
    this.y;
    this.size;
  }

  update() {}

  render() {}

  getBoundingBox() {
    return {
      x: this.x - this.size / 2,
      y: this.y - this.size / 2,
      w: this.size,
      h: this.size,
    };
  }
}

export default GameObject;
