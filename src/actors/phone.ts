import * as ex from "excalibur";
import { Call } from "./call";
import { Agent } from "./agent";
import { TimerBar } from "./timer_bar";
import { MainGame } from "scenes/maingame";
import { Speciality } from "enums/speciality";

const phone_colour = ex.Color.LightGray;

export class Phone extends ex.Actor {
  public active_call: Call | undefined = undefined;
  public call_queue: Call[] = [];

  public phone_no: number;
  public agent: Agent | undefined;

  public call_timer: TimerBar | undefined;

  public main_game: MainGame;
  public call_distribution: Speciality[];

  constructor(x: number, y: number, no: number) {
    super({
      name: "Phone " + no,
      pos: new ex.Vector(x, y),
      width: 80,
      height: 60,
      color: phone_colour,
    });
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
    const middle_phone = Math.ceil(number_of_phones / 2);
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
    if (this.call_queue.length >= 4) {
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

  pickup() {
    if (!this.is_ringing()) {
      return;
    }

    this.active_call?.answer();
    var call_time: number = 200;
    if (this.active_call?.speciality === this.agent?.strength) {
      call_time = 200;
    } else if (this.active_call?.speciality === this.agent?.weakness) {
      call_time = 5000;
    }

    this.call_timer = new TimerBar(
      this.pos.x - this.width / 2,
      this.pos.y + this.height / 2 + 10,
      this.width,
      10,
      call_time,
      this.active_call!.color
    );
    var game = ex.Engine.useEngine();
    game.add(this.call_timer);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (
      this.call_queue.length > 0 &&
      this.call_queue[0].satisfaction.value == 0
    ) {
      const missed_call = this.call_queue.shift();
      engine.remove(missed_call);
      this.call_queue.forEach((c) => c.move_up());
      this.main_game.callFailed();
    }
    if (
      this.active_call &&
      !this.call_timer &&
      this.active_call.satisfaction.value == 0
    ) {
      engine.remove(this.active_call);
      this.active_call = undefined;
      this.activate_call();
      this.main_game.callFailed();
    }
    if (this.call_timer && this.call_timer.isFinished()) {
      engine.remove(this.call_timer);
      this.call_timer = undefined;
      this.main_game.callAnswered(this.active_call.satisfaction.getStatus());
      engine.remove(this.active_call!);
      this.active_call = undefined;
      this.activate_call();
    }
  }

  activate_call() {
    if (this.call_queue.length > 0) {
      this.active_call = this.call_queue.shift();
      this.active_call!.activate();
      this.call_queue.forEach((c) => c.move_up());
    }
  }
}
