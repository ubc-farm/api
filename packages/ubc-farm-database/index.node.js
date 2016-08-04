'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Knex = _interopDefault(require('knex'));
var objection = require('objection');
var require$$0 = require('path');

function interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var knexfile = createCommonjsModule(function (module) {
const {resolve} = interopDefault(require$$0);

module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
			filename: resolve(__dirname, './dev.sqlite3')
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: resolve(__dirname, './_migrations')
		},
		seeds: {
			directory: resolve(__dirname, './_seeds')
		},
		useNullAsDefault: true
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
});

var knexfile$1 = interopDefault(knexfile);
var development = knexfile.development;
var staging = knexfile.staging;
var production = knexfile.production;

var knexfile$2 = Object.freeze({
	default: knexfile$1,
	development: development,
	staging: staging,
	production: production
});

const {NODE_ENV = 'development'} = process.env;

const knex = Knex(knexfile$2[NODE_ENV]);
objection.Model.knex(knex);

/**
 * Used to represent a person or company, such as employees and customers. Can
 * be linked to a user account.
 * @alias module:app/models.Person
 * @property {string} name
 * @property {string} [role] of the person
 * @property {string} [email] - email address
 * @property {string} [phoneNumber]
 * @property {Object} [addressMailing], following addressSchema
 * @property {Object} [addressPhysical], following addressSchema
 */
class Person extends objection.Model {
	static get tableName() {return 'Person'}
	static get label() {return 'people'}

	static get jsonSchema() {return {
		type: 'object',
		required: ['name'],
		properties: {
			id: {type: 'integer'},
			name: {type: 'string'},
			role: {
				type: 'string'
			},
			email: {
				type: 'string',
				pattern: '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b',
				format: 'email'
			},
			phoneNumber: {
				type: 'string',
				minLength: 15,
				maxLength: 15
			},
			addressMailing: addressSchema,
			addressPhysical: addressSchema
		}
	}}

	static get relationMappings() {
		return {
			purchases: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Sale,
				join: {
					from: 'Person.id',
					to: 'Sale.customer'
				}
			},
			products: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Item,
				join: {
					from: 'Person.id',
					to: 'Item.supplier'
				}
			}
		}
	}
}

/**
 * Schema for objects used to represent an address.
 * @alias module:app/models.Person~addressSchema
 */
const addressSchema = {
	type: 'object',
	properties: {
		street: {type: 'string'},
		city: {type: 'string'},
		province: {type: 'string'},
		postalCode: {type: 'string', maxLength: 6}
	}
}

/**
 * Extends Person with timetable information. Task assignments are also
 * joined to employees
 * @alias module:app/models.Employee
 * @extends module:app/models.Person
 * @property {number} [hourlyPay]
 * @property {boolean} [fullOrPartTime] true if full time, false if part time
 * @property {integer[]} [holidayDays=[]]
 * @property {integer[]} [sickDays=[]]
 * @property {integer[]} [paidLeaveDays=[]]
 * @property {Object} [inLieuHours] - an interval object
 * @property {Date[][]} [medicalLeaveTime] - an array of tsrange values
 * @property {string} [emergencyContactName]
 * @property {string} [emergencyContactNumber]
 */
class Employee extends Person {
	static get tableName() {return 'Employee'}
	static get label() {return 'employees'}

	/** @type {Object} Working days as an object */
	get workingDays() {
		return {
			sunday: this.working_sunday,
			monday: this.working_monday,
			tuesday: this.working_tuesday,
			wednesday: this.working_wednesday,
			thursday: this.working_thursday,
			friday: this.working_friday,
			saturday: this.working_saturday
		}
	}
	set workingDays(obj) {
		for (let day in obj) this[`working_${day}`] = obj[day];
	}

	/** @type {boolean[]} */
	get workingDaysArray() {
		return Object.keys(this.workingDays)
			.map(day => this.workingDays[day]);
	}
	set workingDaysArray(arr) {
		this.working_sunday = arr[0];
		this.working_monday = arr[1];
		this.working_tuesday = arr[2];
		this.working_wednesday = arr[3];
		this.working_thursday = arr[4];
		this.working_friday = arr[5];
		this.working_saturday = arr[6];
	}

	/** @type {Date[]} */
	get holiday() {this.holidayDays.map(n => new Date(n))}
	set holiday(dates) {this.holidayDays = dates.map(d => d.getTime())}

	/** @type {Date[]} */
	get sick() {this.sickDays.map(n => new Date(n))}
	set sick(dates) {this.sickDays = dates.map(d => d.getTime())}

	/** @type {Date[]} */
	get paidLeave() {this.paidLeaveDays.map(n => new Date(n))}
	set paidLeave(dates) {this.paidLeaveDays = dates.map(d => d.getTime())}

	static get jsonSchema() {
		return Object.assign(super.jsonSchema, {
			hourlyPay: {type: 'integer'},
			fullOrPartTime: {type: 'boolean'},
			holidayDays: {type: 'array', unqiueItems: true},
			sickDays: {type: 'array', unqiueItems: true},
			paidLeaveDays: {type: 'array', unqiueItems: true},
			inLieuHours: {type: 'array', unqiueItems: true},
			medicalLeaveTime: {type: 'array', unqiueItems: true},
			working_sunday: {type: 'boolean'},
			working_monday: {type: 'boolean'},
			working_tuesday: {type: 'boolean'},
			working_wednesday: {type: 'boolean'},
			working_thursday: {type: 'boolean'},
			working_friday: {type: 'boolean'},
			working_saturday: {type: 'boolean'},
			emergencyContactName: {
				type: 'string'
			},
			emergencyContactNumber: {
				type: 'string',
				minLength: 15,
				maxLength: 15
			}
		})
	}

	static get relationMappings() {
		return Object.assign({
			assignments: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Task$1,
				join: {
					from: 'Employee.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_employee',
						to: 'Assignment.assigned_task'
					},
					to: 'Task.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Helper table to join Employees with their assigned Tasks
 */
class Assignment extends objection.Model {
	static get tableName() {return 'Assignment'}

	static get relationMappings() {
		return {
			assignedEmployee: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Assignment.assigned_employee',
					to: 'Employee.id'
				}
			},
			assignedTask: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Task$1,
				join: {
					from: 'Assignment.assigned_task',
					to: 'Task.id'
				}
			}
		}
	}
}

/**
 * Represents a researcher working at the farm. Extends person with extra
 * faculty data, and links to ResearchProjects.
 * @alias module:app/models.Researcher
 * @extends module:app/models.Person
 * @property {string} [position]
 * @property {string} [faculty] such as 'Land and Food Systems' or 'Science'
 * @property {string} [department] such as 'Applied Biology' or 'Mathematics'
 * @property {string} [labWebsite]
 * @property {string} [expertise]
 * @property {string[]} [coursesTaught]
 * @property {string} [projects]
 */
class Researcher extends Person {
	static get tableName() {return 'Researcher'}
	static get label() {return 'researchers'}

	static get relationMappings() {
		return Object.assign({
			/** 
			 * Projects where this researcher is a lead 
			 * @memberof! module:app/models.Researcher#
			 * @type {module:app/models.ResearchProject[]}
			 */
			projects: {
				relation: objection.Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					to: 'ResearchProject.researcher'
				}
			},
			/** 
			 * Projects where this researcher is a partner
			 * @memberof! module:app/models.Researcher# 
			 * @type {module:app/models.ResearchProject[]}
			 */
			partnerProjects: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'Researcher.id',
					through: {
						modelClass: ResearchPartner,
						from: 'ResearchPartner.person',
						to: 'ResearchPartner.project'
					},
					to: 'ResearchProject.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Represents a research project at the farm, with a lead researcher and 
 * possible partner researchers and members.
 * @alias module:app/models.ResearchProject
 * @property {string} researcher - id of the lead researcher
 * @property {string} [title] of the project
 * @property {Date[]} [date] - range indicating start and end date of project
 * @property {number} [postDocs=0], number of
 * @property {number} [phds=0], number of
 * @property {number} [masters=0], number of
 * @property {number} [bachelors=0], number of
 * @property {number} [others=0] - number of other people working on the project
 * @property {number} [grantValue] 
 * @property {string} [grantSource]
 * @property {string[]} [publications=[]]  
 */
class ResearchProject extends objection.Model {
	static get tableName() {return 'ResearchProject'}

	/**
	 * @returns {number} the total number of members working on the project
	 */
	memberCount() {
		return this.postDocs + this.phds 
		     + this.masters + this.bachelors
				 + this.others;
	}

	static get relationMappings() {
		return {
			/** 
			 * Link to the lead researcher
			 * @type {module:app/models.Researcher}
			 * @memberof! module:app/models.ResearchProject#
			 */
			lead: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.researcher',
					to: 'Researcher.id'
				}
			},
			/** 
			 * Links to the partner researchers
			 * @type {module:app/models.Researcher}
			 * @memberof! module:app/models.ResearchProject# 
			 */
			partners: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchProject.id',
					through: {
						modelClass: ResearchPartner,
						from: 'ResearchPartner.project',
						to: 'ResearchPartner.person'
					},
					to: 'Researcher.id'
				}
			}
		}
	}
}

/**
 * Helper table to join ResearchProjects with their partner Researchers
 */
class ResearchPartner extends objection.Model {
	static get tableName() {return 'ResearchPartner'}

	static get relationMappings() {
		return {
			researcher: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Researcher,
				join: {
					from: 'ResearchPartner.person',
					to: 'Researcher.id'
				}
			},
			researchProject: {
				relation: objection.Model.OneToManyRelation,
				modelClass: ResearchProject,
				join: {
					from: 'ResearchPartner.project',
					to: 'ResearchProject.id'
				}
			}
		}
	}
}

/**
 * A chemical product, such as fertilizer or herbicide.
 * @alias module:app/models.Chemical
 * @property {string} [type] - fertilizer/pest control/etc
 * @property {string} [productName]
 * @property {Object} [composition]
 */
class Amendment extends objection.Model {
	static get tableName() {return 'Chemical'}
	static get label() {return 'chemicals'}

	static get relationMappings() {
		return {
			/** 
			 * Tasks where the chemical is used
			 * @memberof! module:app/models.Chemical#
			 * @type {module:app/models.ChemicalTask[]} 
			 */
			usage: {
				relation: objection.Model.OneToManyRelation,
				modelClass: ChemicalTask,
				join: {
					from: 'Chemical.id',
					to: 'ChemicalTask.product'
				}
			}
		}
	}
}

/**
 * Stores data about a type of item, such as its worth. More specific data,
 * like the quantity and storage location, is found in the Equipment table.
 * Items are meant to be reference information about any type of item rather
 * than a specific tractor or single apple.
 * @alias module:app/models.Item
 * @property {string} [name]
 * @property {string} [sku]
 * @property {string} [barcode]
 * @property {string} [supplierId] - id of the supplier of this item
 * @property {Object} [lifespan] - interval representing lifespan
 * @property {number} [value] - monentary value
 * @property {number} [salvageValue] 
 */
class Item extends objection.Model {
	static get tableName() {return 'Item'}
	static get label() {return 'items'}

	static get relationMappings() {
		return {
			/** 
			 * Info about the supplier
			 * @type {module:app/models.Person}
			 * @memberof! module:app/models.Item# 
			 */
			supplier: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Item.supplierId',
					to: 'Person.id'
				}
			},
			/** 
			 * Equipment instances of this Item
			 * @type {module:app/models.Equipment[]}
			 * @memberof! module:app/models.Item# 
			 */
			equipment: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Item.id',
					to: 'Equipment.product'
				}
			}
		}
	}
}

/**
 * Position used for GeoJSON. A position can have many keys.
 * If given an object instead of an array, the first and second
 * keys are set from the x and y properties.
 * Position is an iterable object, and as a result can be turned into an array
 * by using Array.from
 * @alias module:lib/geojson.Position
 * @see http://geojson.org/geojson-spec.html#positions
 */
class Position {
	/**
	 * @param {number[]|Object} values of the position. 
	 * @param {number} value.x - set as value[0]
	 * @param {number} value.y - set as value[1]
	 * @throws {TypeError} If value is not an array or an object with x and y
	 */
	constructor(value) {
		if (Array.isArray(value))
			for (let key in value) this[key] = value[key];
		else if ('x' in value && 'y' in value) {
			const {x, y} = value;
			Object.assign(this, {0: x, 1: y});
		} else {
			throw TypeError('Position must be called with ' + 
				'either an array or an object with properties x and y');
		}
	}

	/** Similar to Promise.resolve(), converts value into a Position */
	static from(value) {
		if (value instanceof Position) return value;
		else return new Position(value);
	}

	/**
	 * Converts Google Maps API LatLng to Position
	 * @param {google.maps.LatLng} latlng
	 * @returns {Position}
	 */
	static fromGoogle(latlng) {
		return new Position([latlng.lng(), latlng.lat()]);
	}

	/** 
	 * For JSON.stringify serialization
	 * @returns {Array}
	 */
	toJSON() {
		return Array.from(this);
	}

	/** 
	 * Generator function to get values from this Position. Aligns with 
	 * interator protocol, and allows a position to be easily conveted into an
	 * array.
	 * @example
	 * const position = new Position({x: 12, y: 34})
	 * Array.from(position) //[12, 34]
	 * [...position]        //[12, 34]
	 * @returns {Generator}
	 */
	* [Symbol.iterator]() {
		let i = 0;
		while (true) {
			if (i in this) yield this[i];
			else break;
			i++;
		}
	}

	/**
	 * @type {number} number of dimensions in this point. Let's you call push on
	 * a position.
	 * @example
	 * let position = new Position([12, 34]);
	 * [].push.call(position, 56);
	 * 
	 * position.toJSON(); //[12, 34, 56]
	 */
	get length() {
		let i = 0; 
		for (const _ of this) i++;
		return i;
	}

	//aliases
	get lat() {return this[1]}
	get lng() {return this[0]}
	get x() {return this[0]}
	get y() {return this[1]}
}

/**
 * Base class for Geometry objects such as Polygons
 */
class Geometry {
	toJSON() {
		const {type, coordinates} = this;
		return {type, coordinates};
	}
	
	static parse(geojson) {
		return Object.assign(new this(), geojson);
	}

	/**
	 * Similar to Promise.resolve(): converts the value into a Geometry if it
	 * isn't one already.
	 * @param {Geometry|*} value
	 */
	static from(value) {
		if (value instanceof this) return value;
		else if (value.type && value.type == this.type)
			return new this(value.coordinates);
		else return new this(value);
	}
}

/**
 * A string of positions that forms a line
 * @extends module:lib/geojson~Geometry
 * @alias module:lib/geojson.LineString
 * @see http://geojson.org/geojson-spec.html#linestring
 */
class LineString extends Geometry {
	get type() {return 'LineString';}

	/** @param {Position[]} positions */
	constructor(positions) {
		super();
		/** @type {Position[]} */
		this.coordinates = positions.map(Position.from);
	}
}

/**
 * Polygon coordinates contains LineStrings where the last point is equal to
 * the first point. If multiple lines are specified, the first will be the
 * exterior ring and the others will be holes in the polygon.
 * @extends module:lib/geojson~Geometry
 * @alias module:lib/geojson.Polygon
 * @see http://geojson.org/geojson-spec.html#polygon
 */
class Polygon extends Geometry {
	get type() {return 'Polygon';}

	/** @param {...LineString} lines */
	constructor(...lines) {
		super();
		/** @type {Position[][]} */
		this.coordinates = lines.map(line => new LineString(line).coordinates);
	}

	/**
	 * Converts value into a Polygon
	 * @param {Polygon|*} value
	 */
	static from(value) {
		if (Array.isArray(value)) return new Polygon(value);
		else return super.from(value);
	}

	/**
	 * Converts Google Maps API LatLng to Position
	 * @param {google.maps.Polygon} polygon
	 * @returns {Polygon}
	 */
	static fromGoogle(polygon) {
		return new Polygon(
			...polygon.getPaths().getArray().map(path => {
				let p = path.getArray().map(Position.fromGoogle);
				p.push(p[0]);
				return p;
			})
		);
	}
}

/**
 * Represents a location. If field is specified, this location represents that
 * field.
 * @alias module:app/models.Location
 * @property {string} [name]
 * @property {float[]} [position] - a coordinate expressed as [x, y]
 * @property {string} [fieldId]
 */
class Location extends objection.Model {
	static get tableName() {return 'Location'}
	static get label() {return 'locations'}

	/** @type {module:lib/geojson.Position} */
	get coord() {return Position.from(this.position);}
	set coord(value) {this.position = value.toJSON();}

	static get relationMappings() {
		return {
			field: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Location.fieldId',
					to: 'Field.id'
				}
			}
		}
	}
}

/**
 * Extends Item with Plant specific information for crops
 * @alias module:app/models.Plant
 * @extends module:app/models.Item
 * @property {string} [latin] name of the plant
 */
class Plant extends Item {
	static get tableName() {return 'Plant'}
	static get label() {return 'plants'}

	static get relationMappings() {
		return {
			crops: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Plant.id',
					to: 'Crop.type'
				}
			},
			mixedPlants: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Plant,
				join: {
					from: 'Plant.id',
					through: {
						modelClass: Mix,
						from: 'Mix.forId',
						to: 'Mix.subId'
					},
					to: 'Plant.id'
				}
			}
		}
	}
}

/**
 * Helper table for mix of seeds
 */
class Mix extends objection.Model {
	static get tableName() {return 'Mix'}

	static get relationMappings() {
		return {
			subPlants: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Plant,
				join: {
					from: 'Mix.subId',
					to: 'Plant.id'
				}
			},
			forPlant: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Mix.forId',
					to: 'Plant.id'
				}
			}
		}
	}
}

/**
 * Represents a program at the farm
 * @alias module:app/models.Program
 * @property {string} name
 * @property {Object} [color] used to represent this program in the interface
 * @property {boolean} [text_color] - text color to use. Should be calculated
 * based on the color, see WebAIM Color Contrast Checker.
 * @property {string} [linkedAccount]
 */
class Program extends objection.Model {
	static get tableName() {return 'Program'}
	static get label() {return 'program'}

	static get relationMappings() {
		return {
			/** 
			 * An Account linked to this program
			 * @memberof! module:app/models.Program# 
			 */
			link: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Account,
				join: {
					from: 'Program.linkedAccount',
					to: 'Account.id'
				}
			},
			/** 
			 * Tasks and events classified under this program
			 * @memberof! module:app/models.Program#
			 * @type {module:app/models.Task[]} 
			 */
			tasks: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Task$1,
				join: {
					from: 'Program.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.programId',
						to: 'ProgramUsage.taskId'
					},
					to: 'Task.id'
				}
			}
		}
	}
}

class Account extends objection.Model {
	static get tableName() {return 'Account'}

	static get relationMappings() {
		return {
			programs: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Program,
				join: {
					from: 'Account.id',
					to: 'Program.linkedAccount'
				}
			}
		}
	}
}

/**
 * Helper table to join Programs with Tasks
 * @alias module:app/models~ProgramUsage
 */
class ProgramUsage extends objection.Model {
	static get tableName() {return 'ProgramUsage'}

	static get relationMappings() {
		return {
			program: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Program,
				join: {
					from: 'ProgramUsage.programId',
					to: 'Program.id'
				}
			},
			task: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Task$1,
				join: {
					from: 'ProgramUsage.taskId',
					to: 'Task.id'
				}
			}
		}
	}
}

/**
 * Represents an item in the inventory, with fields like the amount stored and 
 * its location. While the table is named Equipment, this can also represent
 * other stored items like harvested crops or seeds.
 * @alias module:app/models.Equipment
 * @property {string} product - the type of item this equipment is
 * @property {string} location - where this equipment is stored
 * @property {number} [quantity]
 * @property {Date} [purchaseDate] - may be populated by purchase (Sale) info
 * @property {string} [description]
 */
class Equipment extends objection.Model {
	static get tableName() {return 'Equipment'}
	static get label() {return 'equipment'}

	/** @type {Date} this equipment's date of purchase */
	get purchase() {return new Date(this.purchaseDate);}
	set purchase(date) {this.purchaseDate = date.getTime();}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			id: {type: 'integer'},
			product: {type: 'integer'},
			description: {type: 'string'},
			quantity: {type: 'integer'},
			purchaseDate: {type: 'number'}, //milliseconds from enoch
			location: {type: 'integer'}
		}
	}}

	static get relationMappings() {
		return {
			/** 
			 * Sale data related to this equipment
			 * @memberof! module:app/models.Equipment#
			 * @type {module:app/models.Sale[]} 
			 */
			sales: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Sale,
				join: {
					from: 'Equipment.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.equipment',
						to: 'EquipmentUsage.sellingUsage'
					},
					to: 'Sale.id'
				}
			},
			/** 
			 * Tasks this equipment is being used for
			 * @memberof! module:app/models.Equipment#
			 * @type {module:app/models.Task[]} 
			 */
			tasks: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Task$1,
				join: {
					from: 'Equipment.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.equipment',
						to: 'EquipmentUsage.taskUsage'
					},
					to: 'Task.id'
				}
			},
			/** 
			 * The location where this equipment is stored
			 * @memberof! module:app/models.Equipment#
			 * @type {module:app/models.Location} 
			 */
			loc: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Equipment.location',
					to: 'Location.id'
				}
			},
			/** 
			 * The type of item this equipment is 
			 * @memberof! module:app/models.Equipment#
			 * @type {module:app/models.Item}
			 */
			item: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Equipment.product',
					to: 'Item.id'
				}
			}
		}
	}
}

/**
 * A helper table for joining equipment to some usage
 */
class EquipmentUsage extends objection.Model {
	static get tableName() {return 'EquipmentUsage'}

	static get relationMappings() {
		return {
			eqiupmentUsed: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'EquipmentUsage.equipment',
					to: 'Equipment.id'
				}
			},
			forSelling: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Sale,
				join: {
					from: 'EquipmentUsage.sellingUsage',
					to: 'Sale.id'
				}
			},
			forTask: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Task$1,
				join: {
					from: 'EquipmentUsage.taskUsage',
					to: 'Task.id'
				}
			}
		}
	}
}



var joins = Object.freeze({
	EquipmentUsage: EquipmentUsage,
	Assignment: Assignment,
	ResearchProject: ResearchProject,
	Mix: Mix,
	ProgramUsage: ProgramUsage
});

/**
 * Common attributes for tasks that other tables inherit.
 * @alias module:app/models.Task
 * @property {number} [start_time] - tsrange representing the task time
 * @property {number} [end_time] - tsrange representing the task time
 * @property {Object} [hoursTaken] - interval showing how long the 
 * task actually took.
 * @property {string} [locationId]
 */
class Task extends objection.Model {
	static get tableName() {return 'Task'}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			start_time: {type: 'integer'},
			end_time: {type: 'integer'},
			locationId: {type: 'integer'}
		}
	}}

	/** @type {Date} */
	get start() {return new Date(this.start_time);}
	set start(date) {this.start_time = date.getTime();}
	/** @type {Date} */
	get end() {return new Date(this.end_time);}
	set end(date) {this.end_time = date.getTime();}

	/** @type {integer} different between start and end in milliseconds */
	get hoursTaken() {
		const [start, end] = this.time;
		return end - start;
	}

	static get relationMappings() {
		return {
			/** 
			 * Location for this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Location} 
			 */
			location: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Task.locationId',
					to: 'Location.id'
				}
			},
			/** 
			 * Programs that this task is linked to 
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Program[]}
			 */
			program: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Program,
				join: {
					from: 'Task.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.taskId',
						to: 'ProgramUsage.programId'
					},
					to: 'Program.id'
				}
			},
			/** 
			 * Employees assigned to this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Employee[]} 
			 */
			labour: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Task.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_task',
						to: 'Assignment.assigned_employee'
					},
					to: 'Employee.id'
				}
			},
			/** 
			 * Equipment used by this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Equipment[]} 
			 */
			equipment: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Task.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.taskUsage',
						to: 'EquipmentUsage.equipment'
					},
					to: 'Equipment.id'
				}
			}
		}
	}
}

/**
 * Shared properties for chemical tasks
 * @alias module:app/models.ChemicalTask
 * @extends module:app/models.Task
 * @property {number} [product] used for this task
 * @property {string} [type]
 * @property {number} [applicationRate] of the product
 * @property {number} [waterToMixRatio] - water:mix ratio
 * @property {string} [plantLocation]
 * @property {number} [entryInterval] - how long before the field can be entered
 * @property {Object} [harvestInterval] - how long before it can be 
 * consumed by humans
 */
class ChemicalTask extends Task {
	static get tableName() {return 'ChemicalTask'}
	static get label() {return 'chemical-tasks'}

	/** @type {Date} how long before the field can be entered */
	get entryInterval() {return new Date(this.entry_interval)}
	set entryInterval(date) {this.entry_interval = date.getTime()}

	/** 
	 * @type {Date} how long before it can be consumed by humans 
	 */
	get harvestInterval() {return new Date(this.harvest_interval)}
	set harvestInterval(date) {this.harvest_interval = date.getTime()}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: Object.assign({}, super.jsonSchema.properties, {
				product: {type: 'integer'},
				type: {type: 'string'},
				applicationRate: {type: 'number'},
				waterToMixRatio: {type: 'number'},
				plantLocation: {type: 'string'},
				entry_interval: {type: 'number'},
				harvest_interval: {type: 'number'},
			})
		}
	}

	static get relationMappings() {
		return Object.assign({
			chemProduct: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Amendment,
				join: {
					from: 'ChemicalTask.product',
					to: 'Chemical.id'
				}
			}
		}, super.relationMappings);
	}
}

const percentageSchema = {
	type: 'number',
	minimum: 0, maximum: 1
}

/**
 * Task for fertilizing a field
 * @alias module:app/models.Fertilizing
 * @extends module:app/models.ChemicalTask
 * @property {string} [type] - one of compost or NPK
 * @property {string} [plantLocation] - one of spot or broadcast
 * @property {number} [tc] - percentage of TC
 * @property {number} [n03] - percentage of N03
 * @property {number} [nh4] - percentage of NH4
 * @property {number} [k20] - percentage of K20
 * @property {number} [p205] - percentage of P205
 */
class Fertilizing extends ChemicalTask {
	static get tableName() {return 'Fertilizing'}
	static get label() {return 'fertilizing'}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: Object.assign({}, super.jsonSchema.properties, {
				type: {
					type: 'string',
					oneOf: ['compost', 'npk']
				},
				plantLocation: {
					type: 'string',
					oneOf: ['spot', 'broadcast']
				},
				tc: percentageSchema,
				n03: percentageSchema,
				nh4: percentageSchema,
				k20: percentageSchema,
				p205: percentageSchema
			})
		}
	}
}

/**
 * Task for pest control for a field
 * @alias module:app/models.PestControl
 * @extends module:app/models.ChemicalTask
 * @property {string} [type] - one of spray or biocontrol
 * @property {string} [plantLocation] - one of foliar or root
 * @property {Object} [activeIngredients]
 * @property {number} [percentOfActiveIngredients]
 */
class PestControl extends ChemicalTask {
	static get tableName() {return 'PestControl'}
	static get label() {return 'pest-control'}

	static get jsonSchema() {
		return {
			type: 'object',
			properties: Object.assign({}, super.jsonSchema.properties, {
				type: {
					type: 'string',
					oneOf: ['spray', 'biocontrol']
				},
				plantLocation: {
					type: 'string',
					oneOf: ['foliar', 'root']
				},
				activeIngredients: {type: 'object'},
				percentOfActiveIngredients: percentageSchema
			})
		}
	}
}

/**
 * An irrigation task
 * @alias module:app/models.Irrigate
 * @extends module:app/models.Task
 * @property {number} [flowRate]
 * @property {string} [type]
 */
class Irrigation extends Task {
	static get tableName() {return 'Irrigation'}
	static get label() {return 'irrigation'}
}

/**
 * Shared properties for scouting tasks, mainly used for historical data
 * @alias module:app/models.Scouting
 * @extends Task
 * @property {string} cropId
 */
class Scouting extends Task {
	static get tableName() {return 'Scouting'}
	static get label() {return 'scouting'}

	static get jsonSchema() {
		return Object.assign(super.jsonSchema, {
			cropId: {type: 'integer'}
		})
	}

	static get relationMappings() {
		return Object.assign({
			/** 
			 * The crop that the scouting is related to
			 * @memberof! module:app/models.Scouting# 
			 * @type {module:app/models.Crop}
			 */
			crop: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'Scouting.cropId',
					to: 'Crop.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Data for scouting a harvest
 * @alias module:app/models.ScoutHarvest
 * @extends module:app/models.Scouting
 * @property {Date} [newExpectedHarvest]
 * @property {number} [newPredictedYield]
 */
class ScoutHarvest extends Scouting {
	static get tableName() {return 'ScoutHarvest'}
	static get label() {return 'scouting-harvest'}

	static get jsonSchema() {
		return Object.assign(super.jsonSchema, {
			newExpectedHarvest: {type: 'integer'},
			newPredictedYield: {type: 'integer'}
		})
	}
}

/**
 * Data for scouting pests in the crop
 * @alias module:app/models.ScoutPest
 * @extends module:app/models.Scouting
 * @property {string} [pestType]
 * @property {string} [affectedSpot]
 * @property {string} [pestName]
 * @property {string} [pestNameLatin]
 * @property {number} [percentAreaAffected]
 * @property {number} [percentPlantsAffected]
 * @property {number} [economicThreshold]
 */
class ScoutPest extends Scouting {
	static get tableName() {return 'ScoutPest'}
	static get label() {return 'scouting-pests'}
}

/**
 * Task for seeding and transplating
 * @alias module:app/models.Seeding
 * @extends module:app/models.Task
 * @property {string} crop affected/created by this task
 * @property {string} [variety] of plant
 * @property {string} [product] name of seed bags/product
 * @property {string} [methodUsed] - one of broadcast/direct drill
 * @property {Object} [spacingBetweenHoles] - expressed as {width, height} in cm
 * @property {float} [depthOfHoles] in cm
 * @property {float} [seedsPerHole]
 * @property {float} [gramsApplied] - amount applied to area
 * @property {float} [germinationPercentage] - between 0 and 1
 * @property {float} [seedsPerGram]
 * @property {float} [predictedYield] in kg
 * @property {Object} [daysToMaturity] - an interval
 * @property {Object} [npkReq] - Required N, P, and K amounts
 */
class Seeding extends Task {
	static get tableName() {return 'Seeding'}
	static get label() {return 'seeding'}

	/**
	 * @param {number} area as m^2
	 * @returns {number} amount of holes in given area
	 */
	getNumberOfHoles(area) {
		const cmSquared = this.spacingBetweenHoles.x * this.spacingBetweenHoles.y;
		return area / (cmSquared * 1e-4);
	}

	/**
	 * @param {number} area as m^2
	 * @returns {number} density of seeds
	 */
	getDensity(area) {
		if (this.seedsPerHole && this.spacingBetweenHoles) {
			return (
				this.getNumberOfHoles(area) * 
				this.seedsPerHole * 
				this.germinationPercentage
			) / area;
		} else if (this.seedsPerGram && this.gramsApplied) {
			return (
				this.seedsPerGram *
				this.gramsApplied *
				this.germinationPercentage
			) / area;
		} 
	}

	static get relationMappings() {
		return Object.assign({
			seeded: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Crop,
				join: {
					from: 'Seeding.crop',
					to: 'Crop.id'
				}
			},
			seedVariety: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Seeding.variety',
					to: 'Plant.id'
				}
			},
			seedProduct: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Item,
				join: {
					from: 'Seeding.product',
					to: 'Item.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * A soil sampling task
 * @alias module:app/models.SoilSample
 * @extends module:app/models.Task
 * @property {number} [depth]
 * @property {string} [methodUsed]
 * @property {string} [variable]
 * @property {string} [result]
 * @property {string} [company]
 */
class SoilSampling extends Task {
	static get tableName() {return 'SoilSampling'}
	static get label() {return 'soil-samples'}

	static get relationMappings() {
		return Object.assign({
			samplingCompany: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'SoilSampling.company',
					to: 'Person.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Represents an event held at the farm
 * @alias module:app/models.Event
 * @extends Task
 * @property {string} [type]
 * @property {string} name of the event
 * @property {number} [estimatedAttendeeAmount]
 * @property {number[]} [targetAgeGroup] - int4range
 * @property {string} [ticketId] - id for sale data for tickets to this event
 * @property {string} [contactId] - id for the person to contact for this event
 */
class Event extends Task {
	static get tableName() {return 'Event'}
	static get label() {return 'events'}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['start_time', 'end_time'],
			properties: Object.assign({}, super.jsonSchema.properties, {
				type: {type: 'string'},
				name: {type: 'string'},
				estimatedAttendeeAmount: {type: 'integer'},
				targetAgeGroup: {type: 'array'},
				ticketId: {type: 'integer'},
				contactId: {type: 'integer'}
			})
		}
	}

	static get relationMappings() {
		return Object.assign({
			/** 
			 * Contains ticket sale data for this event
			 * @memberof! module:app/models.Event#
			 * @type {module:app/models.Sale} 
			 */
			ticket: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Sale,
				join: {
					from: 'Event.ticketId',
					to: 'Sale.id'
				}
			},
			/** 
			 * Represents a person to contact about this event
			 * @memberof! module:app/models.Event#
			 * @type {module:app/models.Person} 
			 */
			contact: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Event.contactId',
					to: 'Person.id'
				}
			}
		}, super.relationMappings);
	}
}

/**
 * Common attributes for tasks that other tables inherit.
 * @alias module:app/models.Task
 * @property {number} [start_time] - tsrange representing the task time
 * @property {number} [end_time] - tsrange representing the task time
 * @property {Object} [hoursTaken] - interval showing how long the 
 * task actually took.
 * @property {string} [locationId]
 */
class Task$1 extends objection.Model {
	static get tableName() {return 'Task'}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			start_time: {type: 'integer'},
			end_time: {type: 'integer'},
			locationId: {type: 'integer'}
		}
	}}

	/** @type {Date} */
	get start() {return new Date(this.start_time);}
	set start(date) {this.start_time = date.getTime();}
	/** @type {Date} */
	get end() {return new Date(this.end_time);}
	set end(date) {this.end_time = date.getTime();}

	/** @type {integer} different between start and end in milliseconds */
	get hoursTaken() {
		const [start, end] = this.time;
		return end - start;
	}

	static get relationMappings() {
		return {
			/** 
			 * Location for this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Location} 
			 */
			location: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Task.locationId',
					to: 'Location.id'
				}
			},
			/** 
			 * Programs that this task is linked to 
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Program[]}
			 */
			program: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Program,
				join: {
					from: 'Task.id',
					through: {
						modelClass: ProgramUsage,
						from: 'ProgramUsage.taskId',
						to: 'ProgramUsage.programId'
					},
					to: 'Program.id'
				}
			},
			/** 
			 * Employees assigned to this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Employee[]} 
			 */
			labour: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Employee,
				join: {
					from: 'Task.id',
					through: {
						modelClass: Assignment,
						from: 'Assignment.assigned_task',
						to: 'Assignment.assigned_employee'
					},
					to: 'Employee.id'
				}
			},
			/** 
			 * Equipment used by this task
			 * @memberof! module:app/models.Task#
			 * @type {module:app/models.Equipment[]} 
			 */
			equipment: {
				relation: objection.Model.ManyToManyRelation,
				modelClass: Equipment,
				join: {
					from: 'Task.id',
					through: {
						modelClass: EquipmentUsage,
						from: 'EquipmentUsage.taskUsage',
						to: 'EquipmentUsage.equipment'
					},
					to: 'Equipment.id'
				}
			}
		}
	}
}

/**
 * Represents a field or sub-field in the farm with crops. If parentField is 
 * specified, the field is a sub-field. 
 * @alias module:app/models.Field
 * @property {float[][]} path - [x,y] coordinates of the field's path
 * @property {float[]} [gridWidths]
 * @property {float[]} [gridHeights]
 * @property {string} [parent] field id
 */
class Field extends objection.Model {
	static get tableName() {return 'Field'}
	static get label() {return 'fields'}

	/** @type {module:lib/geojson.Polygon} */
	get polygon() {return new Polygon(this.path);}
	set polygon(value) {this.path = value.toJSON().coordinates;}

	get grid() {
		const [baseWidth, ...specificWidths] = this.gridWidths;
		const [baseHeight, ...specificHeights] = this.gridHeights;
		return {
			baseWidth, baseHeight,
			specificWidths, specificHeights
		};
	}

	static get relationMappings() {
		return {
			/** 
			 * Crops growing in this field
			 * @memberof! module:app/models.Field# 
			 * @type {module:app/models.Crop}
			 */
			crops: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Crop,
				join: {
					from: 'Field.id',
					to: 'Crop.fieldId'
				}
			},
			/** 
			 * The containing field, if applicable 
			 * @memberof! module:app/models.Field#
			 * @type {module:app/models.Field}
			 */
			parentField: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Field.parent',
					to: 'Field.id'
				}
			},
			/** 
			 * Fields within this one, if applicable
			 * @memberof! module:app/models.Field#
			 * @type {module:app/models.Field[]} 
			 */
			childFields: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Field,
				join: {
					from: 'Field.id',
					to: 'Field.parent'
				}
			}
		}
	}
}

/**
 * Data for a crop growing in a field, including the type of plant it it and
 * historical data like scouting.
 * @alias module:app/models.Crop
 * @property {string} type of plant growing in this field.
 * @property {string} fieldId of the field this crop grows in
 * @property {string} predictedNutrientReq - predicted nutrient requirements
 * @proeprty {Date} [expectedHarvest]
 */
class Crop extends objection.Model {
	static get tableName() {return 'Crop'}

	static get jsonSchema() {return {
		type: 'object',
		properties: {
			type: {type: 'string'},
			fieldId: {type: 'integer'},
			quantity: {type: 'integer'}
		}
	}}

	static get relationMappings() {
		return {
			/** 
			 * The type of plant
			 * @memberof! module:app/models.Crop#
			 * @type {module:app/models.Plant} 
			 */
			variety: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Plant,
				join: {
					from: 'Crop.type',
					to: 'Plant.id'
				}
			},
			/** 
			 * The field this crop grows in
			 * @memberof! module:app/models.Crop#
			 */
			field: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Field,
				join: {
					from: 'Crop.fieldId',
					to: 'Field.id'
				}
			},
			/** 
			 * Scouting logs
			 * @memberof! module:app/models.Crop# 
			 */
			scouting: {
				relation: objection.Model.OneToManyRelation,
				modelClass: Scouting,
				join: {
					from: 'Crop.id',
					to: 'Scouting.crop'
				}
			}
		}
	}
}

/**
 * Class used to represent money. 
 * Internally represents its value as an integer, to avoid float math issues
 * @extends Number
 * @alias module:lib/money.default
 * @typicalname money
 */
class Money extends Number {
	/**
	 * @param {number|number[]} money - if an array, 
	 * uses money[0] as dollars and money[1] as cents. If a float, try to convert
	 * it to an integer representing cents (multiply by 100).
	 * @param {Object} [options]
	 * @param {boolean} [options.convert=true] - if false, parse the money
	 * integer as dollars instead of cents.
	 */
	constructor(money, {convert = true} = {}) {
		let dollars, cents = 0;
		if (Array.isArray(dollars)) {
			dollars = money[0]; cents = money[1];
		}	else if ((convert && Number.isInteger(money)) 
		|| money instanceof Money) {
			super(money); 
			return;
		} else {
			const split = String(money).split('.');
			dollars = split[0]; cents = split[1];
			dollars = parseInt(dollars, 10);

			const centStr = cents;
			if (cents === undefined) cents = 0;
			else {
				cents = parseInt(centStr, 10);
				if (centStr.length === 1) cents *= 10;
			}

			const negativeDollars = 1 / dollars < 0;
			if (negativeDollars) cents *= -1;
		}

		super((dollars * 100) + cents);
	}

	/** @type {number} */
	get dollars() {
		return Math.trunc(this / 100);
	}
	/** @type {number} */
	get cents() {
		return this - (this.dollars * 100);
	}

	/**
	 * Convert the money into a string
	 * @param {boolean} [opts.dollarSign=true] if true, prepends a dollar sign 
	 * to the string
	 * @param {boolean} [opts.useMinusSign=false] normally negative amounts are
	 * wrapped in parenthesis. If useMinusSign is true, a negative sign will
	 * be prefixed to the string instead
	 * @param {string} [opts.currency=USD] currency code to use
	 * @param {string} [opts.currencyDisplay=symbol] currency style to use
	 * @param {boolean} [opts.useGrouping=true] wheter or not to 
	 * use thousands seperators
	 * @returns {string}
	 */
	toString({
		dollarSign = true, 
		useMinusSign = false, 
		currency = 'USD',
		currencyDisplay,
		useGrouping
	} = {}) {
		let value = this.toFloat(); const negative = value < 0;
		if (!useMinusSign && negative) value = Math.abs(value);

		let str;
		if (dollarSign) {
			str = value.toLocaleString(undefined, 
				{style: 'currency', currency, currencyDisplay, useGrouping});
		} else {
			str = value.toLocaleString(undefined, 
				{style: 'decimal', minimumFractionDigits: 2, useGrouping});
		}

		if (useMinusSign || !negative) return str;
		else return `(${str})`;
	}

	/**
	 * Convert the money into a float instead of an integer
	 */
	toFloat() {
		return this / 100;
	}

	/**
	 * Checks if the given money is not a number. This function avoids the 
	 * coersion used by the global isNaN function, but Number.isNaN doesn't work
	 * properly with number extensions like Money. 
	 * @returns {boolean} 
	 */
	static isNaN(money) {
		return Number.isNaN(money.valueOf());
	}
}

/**
 * A common format for sale information. This can be used for tickets,
 * things we sell, or logs of things we purchased.
 * @alias module:app/models.Sale
 * @property {number} [order_date]
 * @property {number} [delivery_date] - when the product was delivered/arrived
 * @property {string} [customerId] - the buyer (can be ourselves)
 * @property {string} [deliveryLocation] - reference to the delivery location
 * @property {number} [quantity=1] 
 * @property {number} [price] 
 * @property {number} [discount], as set value (not a percentage)
 * @property {number} [tax], as set value (not a percentage)
 * @property {string} [notes]
 * @property {number} [budgetLineNumber]
 */
class Sale extends objection.Model {
	static get tableName() {return 'Sale'}
	static get label() {return 'sales'}

	/** @type {module:lib/money.default} */
	get cost() {return new Money(this.price, {convert: true});}
	set cost(money) {this.price = money;}

	/** @type {Date} */
	get orderDate() {return new Date(this.order_date);}
	set orderDate(date) {this.order_date = date.getTime();}
	/** @type {Date} */
	get deliveryDate() {return new Date(this.delivery_date);}
	set deliveryDate(date) {this.delivery_date = date.getTime();}

	static get relationMappings() {
		return {
			/** 
			 * Refers to the customer who purchased an item in this sale. 
			 * A possible buyer is ourself, in which case this sale is a purchase
			 * rather than a sale to someone else. 
			 * @memberof! module:app/models.Sale#
			 * @type {module:app/models.Person}
			 */
			customer: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Person,
				join: {
					from: 'Sale.customerId',
					to: 'Person.id'
				}
			},
			/**
			 * Represents the location this item was delivered to. 
			 * @todo find a way to allow for custom locations
			 * @memberof! module:app/models.Sale#
			 * @type {module:app/models.Location}
			 */
			deliveryLoc: {
				relation: objection.Model.OneToOneRelation,
				modelClass: Location,
				join: {
					from: 'Sale.deliveryLocation',
					to: 'Location.id'
				}
			}
		}
	}
}

/**
 * A Grant uses sale data to represent the monentary values.
 * @extends module:app/models.Sale
 * @property {string} grantName
 */
class Grant extends Sale {
	static get tableName() {return 'Grant'}
	static get label() {return 'grants'}
}

exports.joins = joins;
exports.Equipment = Equipment;
exports.Field = Field;
exports.Crop = Crop;
exports.Sale = Sale;
exports.Grant = Grant;
exports.Person = Person;
exports.Employee = Employee;
exports.Researcher = Researcher;
exports.ResearchProject = ResearchProject;
exports.Chemical = Amendment;
exports.Item = Item;
exports.Location = Location;
exports.Plant = Plant;
exports.Program = Program;
exports.Account = Account;
exports.ChemicalTask = ChemicalTask;
exports.Fertilizing = Fertilizing;
exports.PestControl = PestControl;
exports.Irrigation = Irrigation;
exports.Scouting = Scouting;
exports.ScoutHarvest = ScoutHarvest;
exports.ScoutPest = ScoutPest;
exports.Seeding = Seeding;
exports.SoilSampling = SoilSampling;
exports.Event = Event;
exports.Task = Task$1;
//# sourceMappingURL=index.node.js.map
