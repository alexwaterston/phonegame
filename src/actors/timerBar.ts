import * as ex from "excalibur";

const timer_colour = ex.Color.Green;

export class TimerBar extends ex.Actor {
  constructor(x: number, y: number, width: number, time_remaining: number) {
    super({
      name: "Timer",
      pos: new ex.Vector(x, y),
      width: width,
      height: 40,
      color: ex.Color.Black,
    });
    this.time_remaining = this.initial_time = time_remaining;
    this.full_width = width;
  }

  onPreUpdate(engine: ex.Engine, delta: number) {
    this.time_remaining = this.time_remaining - delta;
    //this.graphics.use(ex.Rectangle)
  }
}
