import * as ex from "excalibur";

const phone_colours = [
  ex.Color.Red,
  ex.Color.Blue,
  ex.Color.Orange,
  ex.Color.Yellow,
];

export class Phone extends ex.Actor {
  constructor(x: number, y: number, no: number) {
    super({
      name: "Phone " + no,
      pos: new ex.Vector(x, y),
      x: x,
      y: y,
      width: 80,
      height: 60,
      color: phone_colours[no],
    });
    this.phone_no = no;
    this.agent = undefined;
  }
}
