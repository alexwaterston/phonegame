import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  Engine,
  vec,
} from "excalibur";
// game.js

import { Phone } from "./actors/phone";
import { Agent } from "./actors/agent";

// start-snippet{create-engine}
// Create an instance of the engine.
// I'm specifying that the game be 800 pixels wide by 600 pixels tall.
// If no dimensions are specified the game will fit to the screen.
const game = new Engine({
  width: 1024,
  height: 768,
});
// end-snippet{create-engine}

const phone_colours = [Color.Red, Color.Blue, Color.Orange, Color.Yellow];
const phones: Phone[] = [];
for (let i = 0; i < 4; i++) {
  phones.push(
    new Phone((game.drawWidth / 5) * (i + 1), game.drawHeight - 200, i)
  );
}
phones.forEach((phone) => {
  game.add(phone);
});

const agent1: Agent = new Agent(phones[0], 0, phones);
const agent2: Agent = new Agent(phones[3], 1, phones);

game.add(agent1);
game.add(agent2);

game.start();
