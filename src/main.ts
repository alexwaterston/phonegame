import {
  Actor,
  Color,
  Engine,
  Timer,
  Random,
  Flags,
  DisplayMode,
} from "excalibur";
// game.js

import { Phone } from "./actors/phone";
import { Agent } from "./actors/agent";
//import { ProgressBar } from "./actors/progress_bar";
import { TimerBar } from "./actors/timer_bar";
import { ColourBar } from "actors/colour_bar";
import { MainGame } from "scenes/maingame";

import { loader } from "./resources";

// start-snippet{create-engine}
// Create an instance of the engine.
// I'm specifying that the game be 800 pixels wide by 600 pixels tall.
// If no dimensions are specified the game will fit to the screen.

const game = new Engine({
  width: 1024,
  height: 768,
  displayMode: DisplayMode.FitScreen,
  backgroundColor: Color.fromRGB(199, 202, 178),
});
// end-snippet{create-engine}

const main: MainGame = new MainGame();
game.add("Main", main);
game.goToScene("Main");

game.start(loader);
console.log("start");
