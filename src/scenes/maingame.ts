import * as ex from "excalibur";

import { Phone } from "actors/phone";
import { Agent } from "actors/agent";
import { TimerBar } from "actors/timer_bar";
import { ColourBar, BarStatus } from "actors/colour_bar";
import { EndGameScreen } from "./gameend";

const NUMBER_OF_PHONES = 6;

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

    for (let i = 0; i < NUMBER_OF_PHONES; i++) {
      this.phones.push(
        new Phone(
          (engine.drawWidth / (NUMBER_OF_PHONES + 1)) * (i + 1),
          engine.drawHeight - 200,
          i
        )
      );
    }
    this.phones.forEach((phone) => {
      this.add(phone);
    });

    this.agent1 = new Agent(this.phones[0], 0, this.phones);
    this.agent2 = new Agent(this.phones[NUMBER_OF_PHONES - 1], 1, this.phones);

    this.add(this.agent1);
    this.add(this.agent2);

    const random = new ex.Random(1337);
    //const random = new ex.Random();

    const call_manager = new ex.Timer({
      fcn: () =>
        this.phones[random.integer(0, NUMBER_OF_PHONES - 1)].add_random_call(),
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

    this.overallSatisfactionBar.setValue(50);

    this.add(this.overallSatisfactionBar);
    this.add(this.timerBar);

    this.add(call_manager);

    call_manager.start();

    const es: EndGameScreen = new EndGameScreen();
    engine.add("GameEnd", es);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (
      this.timerBar?.isFinished() ||
      this.overallSatisfactionBar?.value == 0
    ) {
      var es = engine.scenes["GameEnd"];
      (es as EndGameScreen).score = this.overallSatisfactionBar?.value;
      engine.goToScene("GameEnd");
    }
  }

  callFailed(): void {
    this.overallSatisfactionBar?.decrement(10);
  }

  callAnswered(status: BarStatus): void {
    if (status == BarStatus.High) {
      this.overallSatisfactionBar?.increment(8);
    } else if (status == BarStatus.Mid) {
      this.overallSatisfactionBar?.increment(4);
    } else {
      this.overallSatisfactionBar?.increment(2);
    }
  }
}
