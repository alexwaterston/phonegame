import * as ex from "excalibur";
import { Phone } from "./phone";
import { Speciality } from "enums/speciality";
import { ColourBar } from "./colour_bar";

export class Call extends ex.Actor {
  arrivalTime: number;
  pickupTime: number | undefined;
  phone: Phone;
  speciality: Speciality;
  satisfaction: ColourBar;
  pickedup: Boolean = false;

  constructor(phone: Phone, queuePosition: number, speciality: Speciality) {
    //const speciality = random.integer(0, 2);
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
    this.arrivalTime = Date.now();
    this.satisfaction = new ColourBar(
      -(this.width + 20) / 2,
      -30,
      this.width + 20,
      10,
      100
    );
    this.addChild(this.satisfaction);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    super.onPreUpdate(engine, delta);
    if (!this.pickedup) {
      this.satisfaction.setValue(this.satisfaction.value - delta / 100);
    }
  }

  move_up() {
    this.pos.y += 100;
  }

  activate() {
    this.pos.y = this.phone.pos.y;
  }

  answer() {
    this.pickedup = true;
    this.pickupTime = Date.now();
  }
}
