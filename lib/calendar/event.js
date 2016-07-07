import parse, {parseDate} from './parse.js';

export default class Event {
	constructor(data) {
		this.subject = data.Subject;
		this.allDay = Boolean(data['All Day Event']);

		if (this.allDay) {
			{
				const {year, month, date} = parseDate(data['Start Date']);
				this.start = new Date(year, month, date);
			}
			{
				const {year, month, date} = parseDate(data['End Date']);
				this.end = new Date(year, month, date);
			}
		} else {
			this.start = parse(data['Start Date'], data['Start Time']);
			this.end = parse(data['End Date'], data['End Time']);
		}
		
		this.description = data.Description;
		this.locationString = data.Location;
		this.private = Boolean(data.Private);
	}

	[Symbol.hasInstance](instance) {
		return typeof instance === 'object' && 
		instance.start instanceof Date && instance.end instanceof Date;
	}
}