import * as ex from "excalibur";
import { Phone } from "./phone";
import { Speciality } from "enums/speciality";
import { aFrameSprites, bFrameSprites, cFrameSprites } from "../resources";

const agent_colours = [ex.Color.Red, ex.Color.Blue];
const agent_keys = [
  {
    left: ex.Keys.A,
    right: ex.Keys.D,
    up: ex.Keys.W,
  },
  {
    left: ex.Keys.Left,
    right: ex.Keys.Right,
    up: ex.Keys.Up,
  },
];
const agent_specialties = [
  { strength: Speciality.Software, weakness: Speciality.Security },
  { strength: Speciality.Security, weakness: Speciality.Software },
];

enum agent_state {
  REST,
  MOVING,
  ANSWERING,
}

export class Agent extends ex.Actor {
  agent_no: number;
  phone_bank: Phone[];
  current_phone: Phone;
  strength: Speciality;
  weakness: Speciality;

  state: agent_state = agent_state.REST;
  state_time: number = 0;

  frame: number;
  frames = [
    {
      circle_body: aFrameSprites.a_circle_body,
      rest_arms: aFrameSprites.a_rest_arms,
      phone_arms: aFrameSprites.a_phone_arms,
      head_and_legs: aFrameSprites.a_head_and_legs,
      triangle_body: aFrameSprites.a_triangle_body,
    },
    {
      circle_body: cFrameSprites.c_circle_body,
      rest_arms: cFrameSprites.c_rest_arms,
      phone_arms: cFrameSprites.c_phone_arms,
      head_and_legs: cFrameSprites.c_head_and_legs,
      triangle_body: cFrameSprites.c_triangle_body,
    },
  ];
  moving_frames = {
    circle_body: bFrameSprites.b_circle_body,
    head_and_legs_and_arms: bFrameSprites.b_head_and_legs_and_arms,
    triangle_body: bFrameSprites.b_triangle_body,
  };

  rest_arms: ex.Actor;
  phone_arms: ex.Actor;
  head_and_legs: ex.Actor;

  constructor(starting_phone: Phone, agent_no: number, phone_bank: Phone[]) {
    super({
      name: "Agent " + agent_no,
    });

    this.head_and_legs = new ex.Actor({
      name: "Head_and_legs " + agent_no,
      pos: new ex.Vector(0, 0),
      width: 100,
      height: 100,
    });
    this.rest_arms = new ex.Actor({
      name: "rest_arms " + agent_no,
      pos: new ex.Vector(0, 0),
      width: 100,
      height: 100,
    });
    this.phone_arms = new ex.Actor({
      name: "rest_arms " + agent_no,
      pos: new ex.Vector(0, 0),
      width: 100,
      height: 100,
    });

    this.addChild(this.head_and_legs);
    this.addChild(this.rest_arms);

    this.frame = agent_no;
    this.flip_frame();

    this.agent_no = agent_no;
    this.phone_bank = phone_bank;
    this.current_phone = starting_phone;
    this.current_phone.agent = this;
    this.finishMoveToPhone();
    this.strength = agent_specialties[agent_no].strength;
    this.weakness = agent_specialties[agent_no].weakness;
  }

  change_state(new_state: agent_state) {
    //console.log("old state " + this.state + ". new state " + new_state);
    this.state = new_state;
    this.state_time = 0;
  }

  flip_frame() {
    this.frame = (this.frame + 1) % 2;

    if (this.agent_no === 0) {
      this.graphics.use(this.frames[this.frame].circle_body);
    } else {
      this.graphics.use(this.frames[this.frame].triangle_body);
    }
    this.head_and_legs.graphics.use(this.frames[this.frame].head_and_legs);
    this.rest_arms.graphics.use(this.frames[this.frame].rest_arms);
    this.phone_arms.graphics.use(this.frames[this.frame].phone_arms);
  }

  move_frame() {
    if (this.agent_no === 0) {
      this.graphics.use(this.moving_frames.circle_body);
    } else {
      this.graphics.use(this.moving_frames.triangle_body);
    }
    this.head_and_legs.graphics.use(this.moving_frames.head_and_legs_and_arms);
    this.rest_arms.graphics.hide();
    this.phone_arms.graphics.hide();
  }

  moveToPhone(phone: Phone) {
    const old_x_position = this.current_phone?.pos.x;

    if (this.current_phone != undefined) {
      this.current_phone.agent = undefined;
      if (this.current_phone.agent) {
        return;
      }
    }

    this.current_phone = phone;
    this.current_phone.agent = this;
    this.pos = ex.vec(
      old_x_position + (this.current_phone.pos.x - old_x_position) / 2,
      this.current_phone.pos.y + 120
    );
    this.move_frame();
    this.change_state(agent_state.MOVING);
  }

  finishMoveToPhone() {
    this.pos = ex.vec(this.current_phone.pos.x, this.current_phone.pos.y + 120);
    this.flip_frame();
    this.change_state(agent_state.REST);
  }

  pickupPhone() {
    this.current_phone?.pickup();
    this.change_state(agent_state.ANSWERING);
    this.removeChild(this.rest_arms);
    this.addChild(this.phone_arms);
  }

  callFinished() {
    this.change_state(agent_state.REST);
    this.removeChild(this.phone_arms);
    this.addChild(this.rest_arms);
  }

  onPreUpdate(engine: ex.Engine, delta: number) {
    this.state_time += delta;
    if (this.state === agent_state.REST) {
      //MOVE LEFT
      if (engine.input.keyboard.wasPressed(agent_keys[this.agent_no].left)) {
        if (this.current_phone && this.current_phone.phone_no > 0) {
          const new_phone = this.current_phone.phone_no - 1;
          if (this.phone_bank[new_phone].agent == undefined) {
            this.moveToPhone(this.phone_bank[new_phone]);
          }
        }
      } else if (
        engine.input.keyboard.wasPressed(agent_keys[this.agent_no].right)
      ) {
        if (
          this.current_phone &&
          this.current_phone.phone_no < this.phone_bank.length - 1
        ) {
          const new_phone = this.current_phone.phone_no + 1;
          if (this.phone_bank[new_phone].agent == undefined) {
            this.moveToPhone(this.phone_bank[new_phone]);
          }
        }
      } else if (
        engine.input.keyboard.wasPressed(agent_keys[this.agent_no].up) &&
        this.current_phone?.is_ringing()
      ) {
        this.pickupPhone();
      }
    } else if (this.state == agent_state.ANSWERING) {
      if (this.state_time >= 200) {
        this.current_phone?.callEnded();
        this.callFinished();
      }
    } else if (this.state == agent_state.MOVING) {
      if (this.state_time >= 200) {
        this.finishMoveToPhone();
      }
    }
  }
}
