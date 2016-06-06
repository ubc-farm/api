/**
 * These functions are used for migrating the database and are called by 
 * knex migrate. The up function is called when applying the migration, and the
 * down function should be called to 'undo' the up migration.
 * 
 * The model classes will reference these tables, but will be better documented.
 * 
 * This initial file will do first-time setup, but future files will modify the
 * schema established here.
 */

exports.up = function(knex) {
	// Person and sub-types
	return knex.schema
	.createTable('Person', table => {
		table.bigIncrements('id');
		table.text('name').index().notNullable();
		table.string('role');

		table.text('email');
		table.string('phoneNumber', 15);
		table.text('addressMailing');
		table.text('addressPhysical');
	})
	.createTable('Employee', table => {
		table.inherits('Person');

		table.specificType('workingDays', 'boolean[7]').index();
		table.specificType('hourlyPay', 'money');
		table.boolean('fullOrPartTime').index();

		//possiblity reconfigure to use child tables
		table.specificType('holidayDays', 'date[]');
		table.specificType('sickDays', 'date[]');
		table.specificType('paidLeaveDays', 'date[]');
		table.specificType('inLieuHours', 'interval');
		table.specificType('medicalLeaveTime', 'tsrange[]');

		table.text('emergencyContactName');
		table.string('emergencyContactNumber', 15);
	})
	.createTable('Researcher', table => {
		table.inherits('Person');

		table.text('position');
		table.text('faculty');
		table.text('department');
		table.text('labWebsite');
		table.text('expertise');
		table.specificType('coursesTaught', 'text[]');
		table.text('projects');
	})
	.createTable('Assignment', table => {
		table.bigIncrements('id');

		table.bigInteger('event').unsigned()
			.references('id').inTable('Event');
		table.bigInteger('task').unsigned()
			.references('id').inTable('Task');
			
		table.specificType('assignedTime', 'tsrange');
		table.bigInteger('assignedLocation').unsigned()
			.references('id').inTable('Location');

		table.bigInteger('assignedEmployee')
			.unsigned().notNullable()
			.references('id').inTable('Employee');
	})
	// Equipment and Usage
	.createTable('Equipment', table => {
		table.bigIncrements('id');

		table.specificType('purchase_date', 'date');
		
		table.integer('product_data')
			.references('invetory_id').inTable('inventory')
		table.integer('quantity');
		
		table.integer('equipment_location').index()
			.references('location_id').inTable('location')
			
		table.text('equipment_notes')
	})
	.createTable('EquipmentUsage', table => {
		table.bigIncrements('id');

		table.bigInteger('usedEquipment')
			.unsigned().notNullable()
			.references('id').inTable('Equipment');
		table.integer('quantity_used')
		table.specificType('usage_time', 'tsrange');
		table.bigInteger('sellingUsage').unsigned()
			.references('id').inTable('Sale');
		table.text('usage_note')
	})
	// Event
	.createTable('Event', table => {
		table.bigIncrements('id');

		table.text('event_name').index()
		table.string('event_type')
		table.integer('attendee_number')
		table.specificType('age_group', 'int4range')
		table.specificType('event_time', 'tsrange').index()
		//table.specificType('keywords', 'tsvector').index()
		table.bigInteger('location').unsigned()
			.references('id').inTable('Location');
		table.bigInteger('program').unsigned()
			.references('id').inTable('Program');
		table.bigInteger('ticket').unsigned()
			.references('id').inTable('Sale');
	})
	// Tasks
	.createTable('Task', table => {
		table.bigIncrements('id');

		table.specificType('task_time', 'tsrange').index();
		table.specificType('task_worked_time', 'interval');
		table.bigInteger('location').unsigned()
			.references('id').inTable('Location');
	})
	.createTable('Seeding', table => {
		table.inherits('Task');
		table.bigInteger('cropType').unsigned()
			.references('id').inTable('Crop');
		
		table.bigInteger('variety').unsigned()
			.references('id').inTable('Plant');
		table.bigInteger('product').unsigned()
			.references('id').inTable('Inventory');
		
		table.string('methodUsed').index();
		
		table.specificType('spacingBetweenHoles', 'point');
		table.float('depthOfHoles');
		table.float('seedsPerHole');
		table.float('seedsPerGram');

		table.float('predictedYield');
		table.specificType('daysToMaturity', 'interval');

		table.specificType('npkReq', 'integer[]');
	})
	.createTable('Irrigation', table => {
		table.inherits('Task');

		table.float('flowRate');
		table.string('type').index();
	})
	.createTable('Fertilizing', table => {
		table.inherits('Task');

		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Chemical');
		table.float('applicationRate');
		
		table.string('location') //spot, broadcast
	})
	.createTable('PestControl', table => {
		table.inherits('Task');

		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Chemical');
		table.float('applicationRate');

		table.specificType('waterToMixRatio', 'point');
		table.string('location') //foliar, root

		table.specificType('entryInterval', 'interval');
		table.specificType('harvestInterval', 'interval');
	})
	// Fields and Crops
	.createTable('Field', table => {
		table.bigIncrements('id');
		table.specificType('path', 'path').index(, 'GiST');

		table.specificType('gridWidths', 'real[]');
		table.specificType('gridHeights', 'real[]');

		table.bigInteger('parent').unsigned()
			.references('id').inTable('Field');
	})
	.createTable('Crop', table => {
		table.bigIncrements('id');

		table.bigInteger('type')
			.unsigned().notNullable().index()
			.references('id').inTable('Plant');
		table.integer('crop_field')
			.references('field.field_id').notNullable().index()
		table.bigInteger('field')
			.unsigned().notNullable().index()
			.references('id').inTable('Field');
		table.integer('crop_quantity')
		table.text('predicted_nutrient_req')
	})
	// Information tables
	.createTable('Plant', table => {
		table.bigIncrements('id')
		table.text('plant_name').index().notNullable();
		table.text('plant_latin').index();
		table.bigInteger('value').unsigned()
			.references('id').inTable('Inventory');
	})
	.createTable('Inventory', table => {
		table.bigInteger('supplier').unsigned().index()
			.references('id').inTable('Person');

		table.bigIncrements('id');
		table.text('inventory_name').index();
		table.string('product_code').index();
		table.text('inventory_notes');
		table.boolean('item_consumable').index();
		table.specificType('inventory_value', 'money');
		table.specificType('depreciation_rate', 'money');
	})
	.createTable('Location', table => {
		table.bigIncrements('id');
		table.text('location_name');
		table.specificType('location_position', 'point');
	})
	.createTable('Program', table => {
		table.bigIncrements('id');
		table.string('program_name').index();
		table.specificType('program_color', 'smallint[]');
	})
	.createTable('Chemical', table => {
		table.bigIncrements('id');
		table.string('type').index();
		table.text('productName');
		table.text('composition');
	})
	// Sales and Grants
	.createTable('Sale', table => {
		table.bigInteger('customer').unsigned().index()
			.references('id').inTable('Person');

		table.bigIncrements('id');
		table.integer('sale_quantity').defaultTo(1)
		table.specificType('selling_price', 'money');
		table.specificType('sale_date', 'date');
	})
	.createTable('Grant', table => {
		table.inherits('sale');
		table.text('grant_name');
	})
	// Research Projects
	.createTable('ResearchProject', table => {
		table.bigIncrements('id');
		table.bigInteger('researcher')
			.unsigned().notNullable().unique()
			.references('id').inTable('Researcher');
		
		table.text('title');
		table.specificType('date', 'daterange').index();

		table.integer('postDocs');
		table.integer('phds');
		table.integer('masters');
		table.integer('bachelors');
		table.integer('others');

		table.specificType('grantValue', 'money');
		table.text('grantSource');
		table.specificType('publications', 'text[]');
	})
	.createTable('ResearchPartner', table => {
		table.bigIncrements('id');
		
		table.bigInteger('person')
			.unsigned().notNullable()
			.references('id').inTable('Researcher');
		table.bigInteger('project')
			.unsigned().notNullable()
			.references('id').inTable('ResearchProject');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTableIfExists('Person')
		.dropTableIfExists('Employee')
		.dropTableIfExists('Researcher')
		.dropTableIfExists('Assignment')
		.dropTableIfExists('Equipment')
		.dropTableIfExists('EquipmentUsage')
		.dropTableIfExists('Event')
		.dropTableIfExists('Task')
		.dropTableIfExists('Seeding')
		.dropTableIfExists('Irrigation')
		.dropTableIfExists('Fertilizing')
		.dropTableIfExists('PestControl')
		.dropTableIfExists('Field')
		.dropTableIfExists('Crop')
		.dropTableIfExists('Plant')
		.dropTableIfExists('Inventory')
		.dropTableIfExists('Location')
		.dropTableIfExists('Program')
		.dropTableIfExists('Chemical')
		.dropTableIfExists('Sale')
		.dropTableIfExists('Grant')
		.dropTableIfExists('ResearchProject')
}