import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  Engine,
  vec,
} from "excalibur";
// game.js

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
const phones: Actor[] = [];
for (let i = 0; i < 4; i++) {
  phones.push(
    new Actor({
      x: (game.drawWidth / 5) * (i + 1),
      y: game.drawHeight - 100,
      width: 50,
      height: 30,
      color: phone_colours[i],
    })
  );
}
phones.forEach((phone) => {
  game.add(phone);
});

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

// `game.add` is the same as calling
// `game.currentScene.add`
game.add(agent);
// end-snippet{create-paddle}

// start-snippet{start-game}
// Start the engine to begin the game.
game.start();
// end-snippet{start-game}
