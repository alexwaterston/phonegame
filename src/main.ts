import {
  Actor,
  Color,
  Engine,
  Timer,
  Random
} from "excalibur";
// game.js

import {Phone } from './actors/phone';

// start-snippet{create-engine}
// Create an instance of the engine.
// I'm specifying that the game be 800 pixels wide by 600 pixels tall.
// If no dimensions are specified the game will fit to the screen.
const game = new Engine({
  width: 1024,
  height: 768,
});
// end-snippet{create-engine}

const phones: Phone[] = [];
for (let i = 0; i < 4; i++) {
  phones.push(
    new Phone((game.drawWidth / 5) * (i + 1), game.drawHeight - 200, i)
  );
}
phones.forEach((phone) => {
  game.add(phone);
});

const random = new Random(1337);
const call_manager = new Timer({
    fcn: () => phones[random.integer(0, 3)].add_random_call(),
    random,
    randomRange: [0, 500],
    interval: 500,
    repeats: true
  }
);

// start-snippet{create-paddle}
// Create an actor with x position of 150px,
// y position of 40px from the bottom of the screen,
// width of 200px, height and a height of 20px
const agent: Actor = new Actor({
  x: 150,
  y: game.drawHeight - 40,
  width: 20,
  height: 20,
  // Let's give it some color with one of the predefined
  // color constants
  color: Color.Chartreuse,
});

game.add(agent);
game.add(call_manager);

game.start();
call_manager.start();
