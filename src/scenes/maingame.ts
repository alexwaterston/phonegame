import * as ex from "excalibur";

import { Phone } from "actors/phone";
import { Agent } from "actors/agent";
import { TimerBar } from "actors/timer_bar";
import { ColourBar } from "actors/colour_bar";

export class MainGame extends ex.Scene {
  timerBar: TimerBar | undefined;
  overallSatisfactionBar: ColourBar | undefined;
  phones: Phone[] = [];
  agent1: Agent | undefined;
  agent2: Agent | undefined;

  /**
   * Start-up logic, called once
   */
  public onInitialize(engine: ex.Engine) {
    // initialize scene actors

    for (let i = 0; i < 4; i++) {
      this.phones.push(
        new Phone((engine.drawWidth / 5) * (i + 1), engine.drawHeight - 200, i)
      );
    }
    this.phones.forEach((phone) => {
      this.add(phone);
    });

    this.agent1 = new Agent(this.phones[0], 0, this.phones);
    this.agent2 = new Agent(this.phones[3], 1, this.phones);

    this.add(this.agent1);
    this.add(this.agent2);

    const random = new ex.Random(1337);

    const call_manager = new ex.Timer({
      fcn: () => this.phones[random.integer(0, 3)].add_random_call(),
      random,
      randomRange: [0, 1000],
      interval: 1500,
      repeats: true,
    });

    this.timerBar = new TimerBar(
      (engine.drawWidth - (engine.drawWidth - 100)) / 2,
      40,
      engine.drawWidth - 100,
      20,
      60 * 1000,
      ex.Color.Green
    );

    this.overallSatisfactionBar = new ColourBar(
      (engine.drawWidth - (engine.drawWidth - 100)) / 2,
      80,
      engine.drawWidth - 100,
      20,
      100
    );

    this.add(this.overallSatisfactionBar);
    this.add(this.timerBar);

    this.add(call_manager);

    call_manager.start();
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.timerBar?.isFinished()) {
    }
  }

  callFailed(): void {
    this.overallSatisfactionBar?.decrement(5);
  }

  callAnswered(): void {
    this.overallSatisfactionBar?.increment(5);
  }
}
