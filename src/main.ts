import { Actor, Color, Engine, Timer, Random, Flags } from "excalibur";
// game.js

import { Phone } from "./actors/phone";
import { Agent } from "./actors/agent";
//import { ProgressBar } from "./actors/progress_bar";
import { TimerBar } from "./actors/timer_bar";
import { ColourBar } from "actors/colour_bar";
import { MainGame } from "scenes/maingame";

// start-snippet{create-engine}
// Create an instance of the engine.
// I'm specifying that the game be 800 pixels wide by 600 pixels tall.
// If no dimensions are specified the game will fit to the screen.

const game = new Engine({
  width: 1024,
  height: 768,
});
// end-snippet{create-engine}

const main: MainGame = new MainGame();
game.add("Main", main);
game.goToScene("Main");
game.start();
