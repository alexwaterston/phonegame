import * as ex from "excalibur";
import { MainGame } from "./maingame";

export class EndGameScreen extends ex.Scene {
  public score: number | undefined = 0;
  public text: ex.Text;

  constructor() {
    super();
    this.text = new ex.Text({
      text: "Score!",
      font: new ex.Font({ size: 60 }),
    });
  }

  public onInitialize(engine: ex.Engine) {
    // initialize scene actors
    const actor = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 2, engine.drawHeight / 2),
    });
    actor.graphics.use(this.text);
    this.add(actor);

    engine.removeScene("Main");
  }

  onActivate(context: ex.SceneActivationContext<unknown>): void {
    this.text.text = "Score: " + this.score;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (engine.input.keyboard.wasPressed(ex.Keys.Space)) {
      const main: MainGame = new MainGame();
      engine.add("Main", main);
      engine.goToScene("Main");
    }
  }
}
