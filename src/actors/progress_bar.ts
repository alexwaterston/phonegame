import * as ex from "excalibur";

export class ProgressBar extends ex.Actor {
  max: number;
  value: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    max: number,
    color: ex.Color
  ) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      color: color,
    });
    this.max = this.value = max;
    this.anchor = new ex.Vector(0, 0);
  }

  setValue(value: number) {
    this.value = value;
    if (this.value < 0) {
      this.value = 0;
    } else if (value > this.max) {
      this.value = this.max;
    }
    this.scale = new ex.Vector(this.value / this.max, 1);
  }

  decrement(value: number) {
    this.setValue(this.value - value);
  }

  increment(value: number) {
    this.setValue(this.value + value);
  }
}
