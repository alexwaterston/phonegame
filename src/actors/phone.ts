import * as ex from "excalibur";
import { Call } from './call';
import { Agent } from "./agent";

const phone_colours = [
  ex.Color.Red,
  ex.Color.Blue,
  ex.Color.Orange,
  ex.Color.Yellow,
];

export class Phone extends ex.Actor {
	public active_call: Call | undefined = undefined;
	public call_queue: Call[] = [];

	public phone_no: number;
	public agent: Agent | undefined;

	constructor(x: number, y: number, no: number) {
		super({
			name: 'Phone ' + no,
			pos: new ex.Vector(x, y),
			width: 80,
			height: 60,
			color: ex.Color.Black
		});
		this.phone_no = no;
    	this.agent = undefined;
	}

	add_random_call() {
		if (this.call_queue.length >= 4) {
			return;
		}

		const call = new Call(this, this.call_queue.length);
		this.call_queue.push(call);

		var game = ex.Engine.useEngine();
		game.add(call);

		if (!this.active_call){
			this.activate_call();
		}
	}

	activate_call() {
		if (this.call_queue.length > 0) {
			this.active_call = this.call_queue.shift();
			this.active_call!.activate();
			
			this.call_queue.forEach((c) => c.move_up());
		}
	}
}
