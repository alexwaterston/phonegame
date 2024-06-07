import * as ex from "excalibur";
import { Phone } from "./phone";

const agent_colours = [ex.Color.Red, ex.Color.Blue];
const agent_keys = [
  { left: ex.Keys.Left, right: ex.Keys.Right },
  { left: ex.Keys.Z, right: ex.Keys.X },
];

export class Agent extends ex.Actor {
  agent_no: number;
  phone_bank: Phone[];
  current_phone: Phone | undefined;
  
  constructor(starting_phone: Phone, agent_no: number, phone_bank: Phone[]) {
    super({
      name: "Agent " + agent_no,
      width: 60,
      height: 60,
      color: agent_colours[agent_no],
    });
    this.agent_no = agent_no;
    this.phone_bank = phone_bank;
    this.moveToPhone(starting_phone);
  }

  moveToPhone(phone: Phone) {
    if (this.current_phone != undefined) {
      this.current_phone.agent = undefined;
    }
    this.current_phone = phone;
    this.current_phone.agent = this;
    this.pos = ex.vec(this.current_phone.pos.x, this.current_phone.pos.y + 100);
  }

  onPreUpdate(engine: ex.Engine, delta: number) {
    if (engine.input.keyboard.wasPressed(agent_keys[this.agent_no].left)) {
      if (this.current_phone && this.current_phone.phone_no > 0) {
        const new_phone = this.current_phone.phone_no - 1;
        if (this.phone_bank[new_phone].agent == undefined) {
          this.moveToPhone(this.phone_bank[new_phone]);
        }
      }
    }

    if (engine.input.keyboard.wasPressed(agent_keys[this.agent_no].right)) {
      if (this.current_phone && this.current_phone.phone_no < this.phone_bank.length - 1) {
        const new_phone = this.current_phone.phone_no + 1;
        if (this.phone_bank[new_phone].agent == undefined) {
          this.moveToPhone(this.phone_bank[new_phone]);
        }
      }
    }
  }
}
