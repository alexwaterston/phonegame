import * as ex from "excalibur";
import { MainGame } from "./maingame";
import { aFrameSprites, cFrameSprites } from "../resources";

export class EndGameScreen extends ex.Scene {
  public score: number = 0;
  public callsAnswered: number[] = [0, 0];
  public callsFailed: number[] = [0, 0];

  public txtGameOver: ex.Text;
  public txtScore: ex.Text;
  public txtPickupsP1: ex.Text;
  public txtPickupsP2: ex.Text;
  public txtFailsP1: ex.Text;
  public txtFailsP2: ex.Text;

  constructor() {
    super();
    this.txtGameOver = new ex.Text({
      text: "Game Over",
      font: new ex.Font({ size: 60 }),
    });

    this.txtScore = new ex.Text({
      text: "0",
      font: new ex.Font({ size: 60 }),
    });

    this.txtPickupsP1 = new ex.Text({
      text: "0",
      font: new ex.Font({ size: 40 }),
    });

    this.txtPickupsP2 = new ex.Text({
      text: "0",
      font: new ex.Font({ size: 40 }),
    });

    this.txtFailsP1 = new ex.Text({
      text: "0",
      font: new ex.Font({ size: 40 }),
    });

    this.txtFailsP2 = new ex.Text({
      text: "0",
      font: new ex.Font({ size: 40 }),
    });
  }

  public onInitialize(engine: ex.Engine) {
    // initialize scene actors
    const topline = engine.drawHeight / 4;
    const actGameOver = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 2, topline),
    });
    actGameOver.graphics.use(this.txtGameOver);
    this.add(actGameOver);

    const actScore = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 2, topline + 60),
    });
    actScore.graphics.use(this.txtScore);
    this.add(actScore);

    const actP1 = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 3, topline + 120),
    });
    actP1.graphics.use(
      new ex.GraphicsGroup({
        members: [
          aFrameSprites.a_circle_body,
          aFrameSprites.a_head_and_legs,
          aFrameSprites.a_rest_arms,
        ],
      })
    );
    this.add(actP1);

    const actP2 = new ex.Actor({
      pos: ex.vec((engine.drawWidth * 2) / 3, topline + 120),
    });
    actP2.graphics.use(
      new ex.GraphicsGroup({
        members: [
          cFrameSprites.c_triangle_body,
          cFrameSprites.c_head_and_legs,
          cFrameSprites.c_rest_arms,
        ],
      })
    );
    this.add(actP2);

    const txtPickups = new ex.Text({
      text: "Pick Ups",
      font: new ex.Font({ size: 40 }),
    });
    const actPickupsText = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 2, topline + 220),
    });
    actPickupsText.graphics.use(txtPickups);
    this.add(actPickupsText);

    const actPickupsP1Text = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 3, topline + 220),
    });
    actPickupsP1Text.graphics.use(this.txtPickupsP1);
    this.add(actPickupsP1Text);

    const actPickupsP2Text = new ex.Actor({
      pos: ex.vec((engine.drawWidth * 2) / 3, topline + 220),
    });
    actPickupsP2Text.graphics.use(this.txtPickupsP2);
    this.add(actPickupsP2Text);

    const txtFails = new ex.Text({
      text: "Bad Calls",
      font: new ex.Font({ size: 40 }),
    });
    const actFailsText = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 2, topline + 260),
    });
    actFailsText.graphics.use(txtFails);
    this.add(actFailsText);

    const actFailsP1Text = new ex.Actor({
      pos: ex.vec(engine.drawWidth / 3, topline + 260),
    });
    actFailsP1Text.graphics.use(this.txtFailsP1);
    this.add(actFailsP1Text);

    const actFailsP2Text = new ex.Actor({
      pos: ex.vec((engine.drawWidth * 2) / 3, topline + 260),
    });
    actFailsP2Text.graphics.use(this.txtFailsP2);
    this.add(actFailsP2Text);

    engine.removeScene("Main");
  }

  onActivate(context: ex.SceneActivationContext<unknown>): void {
    this.txtScore.text = "" + this.score;
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    this.txtScore.text = "" + this.score;
    this.txtPickupsP1.text = "" + this.callsAnswered[0];
    this.txtPickupsP2.text = "" + this.callsAnswered[1];

    this.txtFailsP1.text = "" + this.callsFailed[0];
    this.txtFailsP2.text = "" + this.callsFailed[1];

    if (engine.input.keyboard.wasPressed(ex.Keys.Space)) {
      const main: MainGame = new MainGame();
      engine.add("Main", main);
      engine.goToScene("Main");
    }
  }
}
