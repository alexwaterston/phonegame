import * as ex from "excalibur";
import { Call } from "./call";
import { Agent } from "./agent";
import { TimerBar } from "./timer_bar";
import { MainGame } from "scenes/maingame";

const phone_colour = ex.Color.LightGray;

export class Phone extends ex.Actor {
  public active_call: Call | undefined = undefined;
  public call_queue: Call[] = [];

  public phone_no: number;
  public agent: Agent | undefined;

  public call_timer: TimerBar | undefined;

  public main_game: MainGame;

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
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.main_game = engine.currentScene;
  }

  add_random_call() {
    if (this.call_queue.length >= 4) {
      return;
    }

    const call = new Call(this, this.call_queue.length);
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
    var call_time: number = 4000;
    if (this.active_call?.speciality === this.agent?.strength) {
      call_time = 2000;
    } else if (this.active_call?.speciality === this.agent?.weakness) {
      call_time = 8000;
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
