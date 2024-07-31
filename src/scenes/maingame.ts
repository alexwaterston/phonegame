import * as ex from "excalibur";

import { Phone } from "actors/phone";
import { Agent } from "actors/agent";
import { TimerBar } from "actors/timer_bar";
import { ColourBar, BarStatus } from "actors/colour_bar";
import { EndGameScreen } from "./gameend";
import { Speciality } from "enums/speciality";
import { uiSprites } from "../resources";

const NUMBER_OF_PHONES = 5;

export class MainGame extends ex.Scene {
  timerBar: TimerBar | undefined;
  lives: number = 3;

  overallScore: number = 0;
  overallScoreText: ex.Text | undefined;
  phones: Phone[] = [];
  agent1: Agent | undefined;
  agent2: Agent | undefined;
  hearts: ex.Actor[] = [];
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
        //const middle_phone = Math.ceil(NUMBER_OF_PHONES / 2);
        random.pickOne(this.phones).add_random_call();
        //this.phones[this.next_call_right].add_random_call();
        //this.next_call_left = random.integer(0, middle_phone);
        //this.next_call_right = random.integer(
        //middle_phone,
        //NUMBER_OF_PHONES - 1
        //);
        var min_speed = 1000;
        if (this.timerBar!.value < 10000) {
          min_speed = 300;
        } else if (this.timerBar!.value < 30000) {
          min_speed = 500;
        } else if (this.timerBar!.value < 50000) {
          min_speed = 700;
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
      ex.Color.Black
    );
    this.add(this.timerBar);

    for (let i = 0; i < this.lives; i++) {
      this.hearts.push(
        new ex.Actor({
          name: "Heart " + i,
          pos: new ex.Vector(100 + 50 * i, 100),
          width: 50,
          height: 50,
        })
      );
    }
    this.hearts.forEach((heart) => {
      heart.graphics.use(uiSprites.icon_health);
      this.add(heart);
    });

    this.overallScoreText = new ex.Text({
      text: "0",
      font: new ex.Font({ size: 60 }),
    });

    const overallScore = new ex.Actor({
      pos: ex.vec(engine.drawWidth - 100, 100),
    });

    overallScore.graphics.use(this.overallScoreText);
    this.add(overallScore);

    const es: EndGameScreen = new EndGameScreen();
    engine.add("GameEnd", es);
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.timerBar?.isFinished() || this.lives == 0) {
      var es = engine.scenes["GameEnd"];
      (es as EndGameScreen).score = this.overallScore;
      engine.goToScene("GameEnd");
    }
  }

  callFailed(): void {
    this.lives -= 1;
    this.hearts[this.lives].graphics.hide();
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
