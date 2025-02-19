const SCALE_FACTOR = 1;

type Coordinate = {
  x: number;
  y: number;
};

class Dimension2D {
  constructor(
    public width: number,
    public height: number
  ) {
    this.width *= SCALE_FACTOR;
    this.height *= SCALE_FACTOR;
  }
}

class CarConfig {
  spriteDimensions = new Dimension2D(2000, 1700);
  dimensions = new Dimension2D(this.spriteDimensions.width / 3, 750);

  bgPosition(row: number, col: number): Coordinate {
    const x = -col * this.dimensions.width;
    const y = row === 0 ? 0 : -913 * SCALE_FACTOR;
    return { x, y };
  }
}

export const carConfig = new CarConfig();
