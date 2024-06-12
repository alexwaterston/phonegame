import * as ex from "excalibur";
import { ProgressBar } from "./progress_bar";

export class TimerBar extends ProgressBar {
  time_remaining: number = 0;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    max_time: number,
    color: ex.Color
  ) {
    super(x, y, width, height, max_time, color);
    this.time_remaining = max_time;
  }

  isFinished(): Boolean {
    return !(this.time_remaining > 0);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    this.time_remaining = Math.max(0, this.time_remaining - delta);
    super.setValue(this.time_remaining);
  }
}
