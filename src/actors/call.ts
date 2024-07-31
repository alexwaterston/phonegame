import * as ex from "excalibur";
import { Phone } from "./phone";
import { Speciality } from "enums/speciality";
import { ColourBar } from "./colour_bar";
import { callSprites, uiSprites } from "../resources";

const CALL_GAP = 50;

export class Call extends ex.Actor {
  phone: Phone;
  speciality: Speciality;
  pickedup: Boolean = false;
  alert: ex.Actor;

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

    this.alert = new ex.Actor({
      name: "Call alert",
      pos: new ex.Vector(-20, -10),
      width: 40,
      height: 40,
    });
    this.alert.graphics.use(uiSprites.icon_phone_ring);
    this.addChild(this.alert);
    this.alert.graphics.visible = false;

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
