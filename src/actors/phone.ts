import * as ex from "excalibur";
import { Call } from "./call";
import { Agent } from "./agent";
import { TimerBar } from "./timer_bar";
import { MainGame } from "scenes/maingame";
import { Speciality } from "enums/speciality";
import { phoneSprites, uiSprites, Resources } from "../resources";

const BLINK_RATE = 350;
const WAIT_TIME = 1000;
enum PhoneState {
  OFF,
  RING,
  WAIT,
}

export class Phone extends ex.Actor {
  public active_call: Call | undefined = undefined;
  public call_queue: Call[] = [];

  public phone_no: number;
  public agent: Agent | undefined;

  public main_game: MainGame;
  public call_distribution: Speciality[];
  public handset: ex.Actor;
  public ring_icon: ex.Actor;
  public urgent_icon: ex.Actor;
  public is_urgent: boolean = false;

  time_to_blink = BLINK_RATE;
  wait_time = WAIT_TIME;
  state = PhoneState.OFF;

  constructor(x: number, y: number, no: number) {
    super({
      name: "Phone " + no,
      pos: new ex.Vector(x, y),
      width: 80,
      height: 60,
    });
    this.graphics.use(phoneSprites.body);
    this.handset = new ex.Actor({
      name: "Handset " + no,
      pos: new ex.Vector(0, 0),
      width: 80,
      height: 60,
    });
    this.handset.graphics.use(phoneSprites.handset);
    this.addChild(this.handset);

    this.ring_icon = new ex.Actor({
      name: "Ring icon " + no,
      pos: new ex.Vector(-50, -30),
      width: 40,
      height: 40,
    });
    this.ring_icon.graphics.use(uiSprites.icon_phone_ring);
    this.ring_icon.graphics.visible = false;
    this.handset.addChild(this.ring_icon);

    this.urgent_icon = new ex.Actor({
      name: "Urgent icon " + no,
      pos: new ex.Vector(50, -30),
      width: 40,
      height: 40,
    });
    this.urgent_icon.graphics.use(uiSprites.icon_phone_ring);
    this.urgent_icon.graphics.flipHorizontal = true;
    this.urgent_icon.graphics.visible = false;
    this.handset.addChild(this.urgent_icon);

    this.handset.rotation = ex.toRadians(ex.randomInRange(-5, 5));

    this.phone_no = no;
    this.agent = undefined;
    this.call_distribution = [
      Speciality.Printers,
      Speciality.Security,
      Speciality.Software,
    ];
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.main_game = engine.currentScene as MainGame;
    const number_of_phones = this.main_game.phones.length;
    const middle_phone = Math.floor(number_of_phones / 2);
    if (this.phone_no == middle_phone) {
      this.call_distribution = [
        Speciality.Printers,
        Speciality.Security,
        Speciality.Software,
      ];
    } else if (this.phone_no == 0) {
      this.call_distribution = [Speciality.Software, Speciality.Printers];
    } else if (this.phone_no == number_of_phones - 1) {
      this.call_distribution = [Speciality.Printers, Speciality.Security];
    } else if (this.phone_no < middle_phone) {
      this.call_distribution = [
        Speciality.Software,
        Speciality.Software,
        Speciality.Printers,
        Speciality.Printers,
        Speciality.Security,
      ];
    } else {
      this.call_distribution = [
        Speciality.Software,
        Speciality.Printers,
        Speciality.Printers,
        Speciality.Security,
        Speciality.Security,
      ];
    }
  }

  add_random_call() {
    this.color = ex.Color.LightGray;
    if (this.call_queue.length >= 4) {
      //this.main_game.callFailed();
      return;
    }
    const random = new ex.Random();

    const call = new Call(
      this,
      this.call_queue.length,
      random.pickOne(this.call_distribution)
    );
    this.call_queue.push(call);

    var game = ex.Engine.useEngine();
    game.add(call);

    if (!this.is_ringing()) {
      this.activate_call();
    }
  }

  is_ringing(): Boolean {
    return this.active_call != undefined;
  }

  pickup(): Boolean {
    if (!this.is_ringing()) {
      return false;
    }

    this.active_call?.answer();

    this.handset.graphics.visible = false;

    return true;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.is_ringing()) {
      this.time_to_blink -= delta;
      if (this.time_to_blink <= 0) {
        //Resources.sfx_ring.play();

        this.handset.rotation = ex.toRadians(ex.randomInRange(-10, 10));
        if (this.ring_icon.graphics.visible) {
          this.ring_icon.graphics.visible = false;
        } else {
          this.ring_icon.graphics.visible = true;
        }
        this.time_to_blink = BLINK_RATE;
      }
    } else {
      this.ring_icon.graphics.visible = false;
      this.urgent_icon.graphics.visible = false;
    }
  }

  callEnded() {
    this.main_game.callAnswered(this.agent!.agent_no);
    this.main_game.remove(this.active_call!);
    this.active_call = undefined;
    this.activate_call();
    this.handset.graphics.visible = true;
    this.handset.rotation = ex.toRadians(ex.randomInRange(-5, 5));
    this.rotation = 0;
    this.urgent_icon.graphics.visible = false;
  }

  activate_call() {
    if (this.call_queue.length > 0) {
      this.active_call = this.call_queue.shift();
      this.active_call!.activate();
      this.call_queue.forEach((c) => c.move_up());
    }
  }
}
