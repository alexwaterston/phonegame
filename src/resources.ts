import * as ex from "excalibur";

const waterstons_icon_circle = require("../assets/waterstons_icon_circle.png");
const waterstons_icon_triangle = require("../assets/waterstons_icon_triangle.png");
const waterstons_icon_square = require("../assets/waterstons_icon_square.png");

const waterstons_phone_body = require("../assets/waterstons_phone_body.png");
const waterstons_phone_handset = require("../assets/waterstons_phone_handset.png");
const waterstons_phone_cord = require("../assets/waterstons_phone_cord.png");

const waterstons_a_circle_body = require("../assets/waterstons_a_circle_body.png");
const waterstons_a_head_and_legs = require("../assets/waterstons_a_head_and_legs.png");
const waterstons_a_phone_arms = require("../assets/waterstons_a_phone_arms.png");
const waterstons_a_rest_arms = require("../assets/waterstons_a_rest_arms.png");
const waterstons_a_triangle_body = require("../assets/waterstons_a_triangle_body.png");

const waterstons_b_circle_body = require("../assets/waterstons_b_circle_body.png");
const waterstons_b_head_and_legs_and_arms = require("../assets/waterstons_b_head_and_legs_and_arms.png");
const waterstons_b_triangle_body = require("../assets/waterstons_b_triangle_body.png");

const waterstons_c_circle_body = require("../assets/waterstons_c_circle_body.png");
const waterstons_c_head_and_legs = require("../assets/waterstons_c_head_and_legs.png");
const waterstons_c_phone_arms = require("../assets/waterstons_c_phone_arms.png");
const waterstons_c_rest_arms = require("../assets/waterstons_c_rest_arms.png");
const waterstons_c_triangle_body = require("../assets/waterstons_c_triangle_body.png");

const waterstons_fail_circle = require("../assets/waterstons_fail_circle.png");
const waterstons_fail_head_and_legs = require("../assets/waterstons_fail_head_and_legs.png");
const waterstons_fail_triangle = require("../assets/waterstons_fail_triangle.png");

const waterstons_icon_health = require("../assets/waterstons_icon_health.png");
const waterstons_icon_phone_ring = require("../assets/waterstons_icon_phone_ring.png");

const waterstons_sfx_ring = require("url:../assets/waterstons_phone_ring.wav");

const waterstons_sfx_success = require("url:../assets/sfx_success.wav");
const waterstons_sfx_fail = require("url:../assets/sfx_fail.wav");

const Resources = {
  call_circle: new ex.ImageSource(waterstons_icon_circle),
  call_triangle: new ex.ImageSource(waterstons_icon_triangle),
  call_square: new ex.ImageSource(waterstons_icon_square),

  phone_body: new ex.ImageSource(waterstons_phone_body),
  phone_handset: new ex.ImageSource(waterstons_phone_handset),
  phone_cord: new ex.ImageSource(waterstons_phone_cord),

  a_circle_body: new ex.ImageSource(waterstons_a_circle_body),
  a_head_and_legs: new ex.ImageSource(waterstons_a_head_and_legs),
  a_phone_arms: new ex.ImageSource(waterstons_a_phone_arms),
  a_rest_arms: new ex.ImageSource(waterstons_a_rest_arms),
  a_triangle_body: new ex.ImageSource(waterstons_a_triangle_body),

  b_circle_body: new ex.ImageSource(waterstons_b_circle_body),
  b_head_and_legs_and_arms: new ex.ImageSource(
    waterstons_b_head_and_legs_and_arms
  ),
  b_triangle_body: new ex.ImageSource(waterstons_b_triangle_body),

  c_circle_body: new ex.ImageSource(waterstons_c_circle_body),
  c_head_and_legs: new ex.ImageSource(waterstons_c_head_and_legs),
  c_phone_arms: new ex.ImageSource(waterstons_c_phone_arms),
  c_rest_arms: new ex.ImageSource(waterstons_c_rest_arms),
  c_triangle_body: new ex.ImageSource(waterstons_c_triangle_body),

  icon_health: new ex.ImageSource(waterstons_icon_health),
  icon_phone_ring: new ex.ImageSource(waterstons_icon_phone_ring),

  fail_circle: new ex.ImageSource(waterstons_fail_circle),
  fail_head_and_legs: new ex.ImageSource(waterstons_fail_head_and_legs),
  fail_triangle: new ex.ImageSource(waterstons_fail_triangle),

  sfx_ring: new ex.Sound(waterstons_sfx_ring),
  sfx_success: new ex.Sound(waterstons_sfx_success),
  sfx_fail: new ex.Sound(waterstons_sfx_fail),
};

function loadSprite(
  image: ex.ImageSource,
  width: number,
  height: number
): ex.Sprite {
  const sprite = new ex.Sprite({
    image: image,
    destSize: {
      width: width,
      height: height,
    },
  });
  return sprite;
}

const loader = new ex.Loader();

const CALL_SPRITE_SIZE = 40;
const callSprites = {
  circle: loadSprite(Resources.call_circle, CALL_SPRITE_SIZE, CALL_SPRITE_SIZE),
  triangle: loadSprite(
    Resources.call_triangle,
    CALL_SPRITE_SIZE,
    CALL_SPRITE_SIZE
  ),
  square: loadSprite(Resources.call_square, CALL_SPRITE_SIZE, CALL_SPRITE_SIZE),
};

const PHONE_SPRITE_SIZE = 100;
const phoneSprites = {
  body: loadSprite(Resources.phone_body, PHONE_SPRITE_SIZE, PHONE_SPRITE_SIZE),
  handset: loadSprite(
    Resources.phone_handset,
    PHONE_SPRITE_SIZE,
    PHONE_SPRITE_SIZE
  ),
  cord: loadSprite(
    Resources.phone_cord,
    PHONE_SPRITE_SIZE / 2,
    PHONE_SPRITE_SIZE
  ),
};

const AGENT_SPRITE_SIZE = 128;
const aFrameSprites = {
  a_circle_body: loadSprite(
    Resources.a_circle_body,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  a_head_and_legs: loadSprite(
    Resources.a_head_and_legs,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  a_phone_arms: loadSprite(
    Resources.a_phone_arms,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  a_rest_arms: loadSprite(
    Resources.a_rest_arms,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  a_triangle_body: loadSprite(
    Resources.a_triangle_body,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
};

const bFrameSprites = {
  b_circle_body: loadSprite(
    Resources.b_circle_body,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  b_head_and_legs_and_arms: loadSprite(
    Resources.b_head_and_legs_and_arms,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  b_triangle_body: loadSprite(
    Resources.b_triangle_body,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
};

const cFrameSprites = {
  c_circle_body: loadSprite(
    Resources.c_circle_body,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  c_head_and_legs: loadSprite(
    Resources.c_head_and_legs,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  c_phone_arms: loadSprite(
    Resources.c_phone_arms,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  c_rest_arms: loadSprite(
    Resources.c_rest_arms,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  c_triangle_body: loadSprite(
    Resources.c_triangle_body,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
};

const failFrameSprites = {
  fail_circle: loadSprite(
    Resources.fail_circle,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  fail_head_and_legs: loadSprite(
    Resources.fail_head_and_legs,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
  fail_triangle: loadSprite(
    Resources.fail_triangle,
    AGENT_SPRITE_SIZE,
    AGENT_SPRITE_SIZE
  ),
};

const HEALTH_ICON_SPRITE_SIZE = 50;
const uiSprites = {
  icon_health: loadSprite(
    Resources.icon_health,
    HEALTH_ICON_SPRITE_SIZE,
    HEALTH_ICON_SPRITE_SIZE
  ),
  icon_phone_ring: loadSprite(
    Resources.icon_phone_ring,
    PHONE_SPRITE_SIZE / 2,
    PHONE_SPRITE_SIZE / 2
  ),
};

for (const res in Resources) {
  loader.addResource((Resources as any)[res]);
}

export {
  Resources,
  loader,
  callSprites,
  phoneSprites,
  aFrameSprites,
  bFrameSprites,
  cFrameSprites,
  failFrameSprites,
  uiSprites,
};
