import * as ex from 'excalibur';
import { Phone } from './phone';
import { Speciality } from 'enums/speciality';

export class Call extends ex.Actor {
	arrivalTime: number;
	pickupTime: number | undefined;
	phone: Phone;
	speciality: Speciality;

	constructor(phone: Phone, queuePosition: number) {
		const random = new ex.Random();
		const speciality = random.integer(0, 2);

		super({
			pos: new ex.Vector(phone.pos.x, phone.pos.y - (100 * (queuePosition + 1))),
			width: 30,
			height: 30,
			color: speciality === 0 ? ex.Color.Red : speciality == 1 ? ex.Color.Blue : ex.Color.Yellow
		});

		this.speciality = speciality;
		this.phone = phone;
		this.arrivalTime = Date.now();
	}

	move_up() {
		this.pos.y += 100
	}

	activate() {
		this.pos.y = this.phone.pos.y;
	}

	answer() {
		this.pickupTime = Date.now();
	}

	resolve(): number {
		// TODO: Scoring logic
		return 1;
	}
}