import * as ex from "excalibur";
import { Phone } from "./phone";
import { Speciality } from "enums/speciality";
import { ColourBar } from "./colour_bar";

export class Call extends ex.Actor {
  phone: Phone;
  speciality: Speciality;
  pickedup: Boolean = false;

  constructor(phone: Phone, queuePosition: number, speciality: Speciality) {
    super({
      pos: new ex.Vector(phone.pos.x, phone.pos.y - 100 * (queuePosition + 1)),
      width: 30,
      height: 30,
      color:
        speciality === Speciality.Software
          ? ex.Color.Red
          : speciality == Speciality.Security
          ? ex.Color.Blue
          : ex.Color.Yellow,
    });

    const random = new ex.Random();

    this.speciality = speciality;
    this.phone = phone;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    super.onPreUpdate(engine, delta);
  }

  move_up() {
    this.pos.y += 100;
  }

  activate() {
    this.pos.y = this.phone.pos.y;
  }

  answer() {
    this.pickedup = true;
  }
}
