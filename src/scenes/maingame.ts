import * as ex from "excalibur";
// game.js

import { Phone } from "actors/phone";
import { Agent } from "actors/agent";
//import { ProgressBar } from "./actors/progress_bar";
import { TimerBar } from "actors/timer_bar";
import { ColourBar } from "actors/colour_bar";

export class MainGame extends ex.Scene {
  /**
   * Start-up logic, called once
   */
  public onInitialize(engine: ex.Engine) {
    // initialize scene actors

    const phones: Phone[] = [];
    for (let i = 0; i < 4; i++) {
      phones.push(
        new Phone((engine.drawWidth / 5) * (i + 1), engine.drawHeight - 200, i)
      );
    }
    phones.forEach((phone) => {
      this.add(phone);
    });

    const agent1: Agent = new Agent(phones[0], 0, phones);
    const agent2: Agent = new Agent(phones[3], 1, phones);

    this.add(agent1);
    this.add(agent2);
    const random = new ex.Random(1337);
    const call_manager = new ex.Timer({
      fcn: () => phones[random.integer(0, 3)].add_random_call(),
      random,
      randomRange: [0, 1000],
      interval: 1500,
      repeats: true,
    });

    const timerBar: TimerBar = new TimerBar(
      (engine.drawWidth - (engine.drawWidth - 100)) / 2,
      40,
      engine.drawWidth - 100,
      20,
      60 * 1000,
      ex.Color.Green
    );

    const overallSatisfactionBar: ColourBar = new ColourBar(
      (engine.drawWidth - (engine.drawWidth - 100)) / 2,
      80,
      engine.drawWidth - 100,
      20,
      100
    );
    this.add(overallSatisfactionBar);

    this.add(timerBar);
    this.add(call_manager);

    call_manager.start();
  }
}
