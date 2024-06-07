import * as ex from "excalibur";
import { ProgressBar } from "./progress_bar";

const timer_colour = ex.Color.Green;

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
    self.time_remaining = max_time;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    self.time_remaining = self.time_remaining - delta;
    super.setValue(self.time_remaining);
  }
}
