import * as ex from "excalibur";

import { Phone } from "actors/phone";
import { Agent } from "actors/agent";
import { TimerBar } from "actors/timer_bar";
import { ColourBar, BarStatus } from "actors/colour_bar";
import { EndGameScreen } from "./gameend";
import { Speciality } from "enums/speciality";

const NUMBER_OF_PHONES = 5;

export class MainGame extends ex.Scene {
  timerBar: TimerBar | undefined;
  overallSatisfactionBar: ColourBar | undefined;

  overallScore: number = 0;
  overallScoreText: ex.Text | undefined;
  phones: Phone[] = [];
  agent1: Agent | undefined;
  agent2: Agent | undefined;
  call_manager: ex.Timer | undefined;

  next_call_left: number = 1;
  next_call_right: number = NUMBER_OF_PHONES - 2;

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

    //const random = new ex.Random(1337);
    const random = new ex.Random();

    this.call_manager = new ex.Timer({
      fcn: () => {
        const middle_phone = Math.ceil(NUMBER_OF_PHONES / 2);
        this.phones[this.next_call_left].add_random_call();
        this.phones[this.next_call_right].add_random_call();
        this.next_call_left = random.integer(0, middle_phone);
        this.next_call_right = random.integer(
          middle_phone,
          NUMBER_OF_PHONES - 1
        );
        //console.log("next calls: " + this.next_call_left + ", ", this.next_call_right);
        //this.phones[this.next_call_left].highlight_next_call();
        //this.phones[this.next_call_right].highlight_next_call();
        var min_speed = 500;
        if (this.timerBar!.value < 10000) {
          min_speed = 200;
        } else if (this.timerBar!.value < 40000) {
          min_speed = 300;
        }
        this.call_manager!.reset(
          Math.max(this.call_manager!.interval - 200, min_speed)
        );
      },
      random,
      randomRange: [0, 200],
      interval: 1500,
      repeats: true,
    });

    this.add(this.call_manager);
    this.call_manager.start();

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
      3
    );

    this.overallSatisfactionBar.setValue(3);

    this.add(this.overallSatisfactionBar);
    this.add(this.timerBar);

    this.overallScoreText = new ex.Text({
      text: "Score!",
      font: new ex.Font({ size: 60 }),
    });

    const overallScore = new ex.Actor({
      pos: ex.vec(100, 200),
    });

    overallScore.graphics.use(this.overallScoreText);
    this.add(overallScore);

    const es: EndGameScreen = new EndGameScreen();
    engine.add("GameEnd", es);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (
      this.timerBar?.isFinished() ||
      this.overallSatisfactionBar?.value == 0
    ) {
      var es = engine.scenes["GameEnd"];
      (es as EndGameScreen).score = this.overallScore;
      engine.goToScene("GameEnd");
    }
  }

  callFailed(): void {
    this.overallSatisfactionBar?.decrement(1);
  }

  updateScore() {
    this.overallScoreText!.text = "" + this.overallScore;
  }

  incrementScore(by: number) {
    this.overallScore += by;

    this.updateScore();
  }

  callAnswered(): void {
    this.incrementScore(1);
  }
}
