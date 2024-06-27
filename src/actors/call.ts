import * as ex from "excalibur";
import { Phone } from "./phone";
import { Speciality } from "enums/speciality";
import { ColourBar } from "./colour_bar";
import { callSprites } from "../resources";

const CALL_GAP = 50;

export class Call extends ex.Actor {
  phone: Phone;
  speciality: Speciality;
  pickedup: Boolean = false;

  constructor(phone: Phone, queuePosition: number, speciality: Speciality) {
    super({
      pos: new ex.Vector(
        phone.pos.x,
        phone.pos.y - CALL_GAP * (queuePosition + 2)
      ),
    });

    const sprite =
      speciality === Speciality.Software
        ? callSprites.circle
        : speciality == Speciality.Security
        ? callSprites.triangle
        : callSprites.square;
    this.graphics.use(sprite);

    const random = new ex.Random();

    this.speciality = speciality;
    this.phone = phone;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    super.onPreUpdate(engine, delta);
  }

  move_up() {
    this.pos.y += CALL_GAP;
  }

  activate() {
    this.pos.y = this.phone.pos.y + 5;
  }

  answer() {
    this.pickedup = true;
  }
}
