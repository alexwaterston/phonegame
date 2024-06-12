import * as ex from "excalibur";
import { ProgressBar } from "./progress_bar";

const bar_colours = [ex.Color.Red, ex.Color.Orange, ex.Color.Green];
export class ColourBar extends ProgressBar {
  mid: number;
  high: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    max: number
  ) {
    super(x, y, width, height, max, bar_colours[0]);
    this.mid = max / 3;
    this.high = this.mid * 2;
    this.setColour();
  }

  setColour() {
    this.color = bar_colours[2];
    if (this.value < this.mid) {
      this.color = bar_colours[0];
    } else if (this.value < this.high) {
      this.color = bar_colours[1];
    }
  }
  setValue(value: number): void {
    super.setValue(value);
    this.setColour();
  }
}
