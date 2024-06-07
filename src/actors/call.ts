import * as ex from 'excalibur';
import { Phone } from './phone';

export class Call extends ex.Actor {
	constructor(phone: Phone, queuePosition: number) {
		super({
			pos: new ex.Vector(phone.pos.x, phone.pos.y - (100 * (queuePosition + 1))),
			width: 30,
			height: 30,
			color: ex.Color.Black
		});
	}

	move_up() {
		this.pos.y -= 30
	}
}