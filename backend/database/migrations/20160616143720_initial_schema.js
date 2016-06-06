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
		table.bigincrements('id').primary();
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
		table.bigincrements('id').primary();

		table.integer('event').unsigned()
			.references('event_id').inTable('Event');
		table.integer('task').unsigned()
			.references('task_id').inTable('Task');
			
		table.specificType('assignedTime', 'tsrange');
		table.integer('assignedLocation').unsigned()
			.references('location_id').inTable('Location');

		table.biginteger('assignedEmployee')
			.unsigned().notNullable()
			.references('id').inTable('Employee');
	})
	// Equipment and Usage
	.createTable('Equipment', table => {
		table.increments('equipment_id').primary();
		table.specificType('purchase_date', 'date');
		
		table.integer('product_data')
			.references('invetory_id').inTable('inventory')
		table.integer('quantity');
		
		table.integer('equipment_location').index()
			.references('location_id').inTable('location')
			
		table.text('equipment_notes')
	})
	.createTable('EquipmentUsage', table => {
		table.increments('usage_id').primary();
		table.integer('equipment_info')
			.unsigned().references('equipment_id').inTable('equipment').notNullable();
		table.integer('quantity_used')
		table.specificType('usage_time', 'tsrange');
		table.integer('selling_usage').references('sale_id').inTable('sale')
		table.text('usage_note')
	})
	// Event
	.createTable('Event', table => {
		table.increments('event_id').primary();
		table.text('event_name').index()
		table.string('event_type')
		table.integer('attendee_number')
		table.specificType('age_group', 'int4range')
		table.specificType('event_time', 'tsrange').index()
		//table.specificType('keywords', 'tsvector').index()
		table.integer('event_location').references('location.location_id')
		table.integer('event_program').references('program.program_id')
		table.integer('ticket').references('sale_id').inTable('sale');
	})
	// Tasks
	.createTable('Task', table => {
		table.increments('task_id').primary();
		table.specificType('task_time', 'tsrange').index();
		table.specificType('task_worked_time', 'interval');
		table.integer('task_location').references('location_id').inTable('location')
	})
	.createTable('Seeding', table => {
		table.inherits('task');
		table.integer('crop').references('crop_id').inTable('crop')
		table.string('seed_method').index()
		table.specificType('seed_hole_spacing', 'point')
		table.decimal('seed_hole_depth', 9, 3);
	})
	.createTable('Irrigation', table => {
		table.inherits('task');
		table.string('irrigation_type').index()
		table.decimal('flow_rate', 9, 3);
	})
	.createTable('Fertilizing', table => {
		table.inherits('task');
		table.integer('chemical').references('chem_id').inTable('chemical').index()
		table.decimal('fertilizer_quantity', 9, 3);
		table.specificType('water_mix_ratio', 'point');
	})
	.createTable('PestControl', table => {
		table.inherits('task');
		table.integer('chemical').references('chem_id').inTable('chemical').index()
		table.decimal('application_rate', 9, 3);
		table.specificType('interval_entry', 'interval');
		table.specificType('interval_harvest', 'interval');
		table.specificType('water_mix_ratio', 'point');
	})
	// Fields and Crops
	.createTable('Field', table => {
		table.bigincrements('id').primary();
		table.specificType('path', 'path').index(, 'GiST');

		table.specificType('gridWidths', 'real[]');
		table.specificType('gridHeights', 'real[]');

		table.biginteger('parent').unsigned()
			.references('id').inTable('Field');
	})
	.createTable('Crop', table => {
		table.increments('crop_id').primary();
		table.integer('crop_type')
			.references('plant.plant_id').notNullable().index()
		table.integer('crop_field')
			.references('field.field_id').notNullable().index()
		table.integer('crop_quantity')
		table.text('predicted_nutrient_req')
	})
	// Information tables
	.createTable('Plant', table => {
		table.increments('plant_id').primary();
		table.text('plant_name').index().notNullable();
		table.text('plant_latin').index();
		table.integer('plant_value').references('inventory_id').inTable('inventory')
	})
	.createTable('Inventory', table => {
		table.biginteger('supplier').unsigned().index()
			.references('id').inTable('Person');

		table.increments('inventory_id').primary();
		table.text('inventory_name').index();
		table.string('product_code').index();
		table.text('inventory_notes');
		table.boolean('item_consumable').index();
		table.specificType('inventory_value', 'money');
		table.specificType('depreciation_rate', 'money');
	})
	.createTable('Location', table => {
		table.increments('location_id').primary();
		table.text('location_name');
		table.specificType('location_position', 'point');
	})
	.createTable('Program', table => {
		table.increments('program_id').primary();
		table.string('program_name').index();
		table.specificType('program_color', 'smallint[]');
	})
	.createTable('Chemical', table => {
		table.increments('chem_id').primary();
		table.string('chem_type').index();
		table.text('chem_product');
		table.text('chem_composition');
	})
	// Sales and Grants
	.createTable('Sale', table => {
		table.biginteger('customer').unsigned().index()
			.references('id').inTable('Person');

		table.increments('sale_id').primary();
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
		table.increments('project_id').primary();
		table.integer('researcher').unique().index()
		table.text('project_title')
		table.specificType('project_date', 'daterange')
		table.specificType('project_copis', 'integer[]')
		table.specificType('project_hqp', 'integer[]')
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