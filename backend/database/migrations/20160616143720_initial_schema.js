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

		table.bigInteger('task').unsigned()
			.references('id').inTable('Task');

		table.bigInteger('assignedEmployee')
			.unsigned().notNullable()
			.references('id').inTable('Employee');
	})
	// Equipment and Usage
	.createTable('Equipment', table => {
		table.bigIncrements('id');
		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Item');
		
		table.text('description');
		table.integer('quantity');
		table.specificType('purchaseDate', 'date');
		
		table.bigInteger('location').index()
			.references('id').inTable('Location');
	})
	.createTable('EquipmentUsage', table => {
		table.bigIncrements('id');

		table.bigInteger('usedEquipment')
			.unsigned().notNullable()
			.references('id').inTable('Equipment');
		table.integer('quantity');

		table.bigInteger('sellingUsage').unsigned()
			.references('id').inTable('Sale');
		table.text('notes')
	})
	// Event
	.createTable('Event', table => {
		table.inherits('Task');
		table.string('type').index();
		table.text('name').index();

		//table.specificType('keywords', 'tsvector').index()
		table.integer('estimatedAttendeeAmount');
		table.specificType('targetAgeGroup', 'int4range')
		
		table.bigInteger('location').unsigned()
			.references('id').inTable('Location');
		table.bigInteger('ticket').unsigned()
			.references('id').inTable('Sale');
		table.bigInteger('contact').unsigned()
			.references('id').inTable('Person');
	})
	// Tasks
	.createTable('Task', table => {
		table.bigIncrements('id');

		table.specificType('time', 'tsrange');
		table.specificType('hoursTaken', 'interval');

		table.bigInteger('program').unsigned()
			.references('id').inTable('Program');
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
			.references('id').inTable('Item');
		
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
	.createTable('Item', table => {
		table.bigIncrements('id');
		table.text('name').index();
		
		table.text('sku').unique().index();
		table.text('barcode').unique();

		table.bigInteger('supplier').unsigned().index()
			.references('id').inTable('Person');
		
		table.specificType('lifespan', 'interval').index();
		table.specificType('value', 'money');
		table.specificType('salvageValue', 'money');
	})
	.createTable('Plant', table => {
		table.inherits('Item');
		table.text('latin').index().unique();
	})
	.createTable('Location', table => {
		table.bigIncrements('id');
		table.text('name');
		table.specificType('position', 'point');
		table.bigInteger('field').unsigned().unique()
			.references('id').inTable('Field');
	})
	.createTable('Program', table => {
		table.bigIncrements('id');
		table.text('name').index();
		table.specificType('color', 'smallint[]'); //rgb

		table.bigInteger('linkedAccount').unsigned()
			.references('id').inTable('Account');
	})
	.createTable('Account', table => {
		table.bigIncrements('id');
		table.text('name').index();
		table.text('number').index();
		table.text('sortCode').index();
		table.text('taxReference');
		table.text('ubcReference');
	})
	.createTable('Chemical', table => {
		table.bigIncrements('id');
		table.string('type').index();
		table.text('productName');
		table.text('composition');
	})
	// Sales and Grants
	.createTable('Sale', table => {
		table.bigIncrements('id');

		table.specificType('orderDate', 'timestamp');
		table.specificType('deliveryDate', 'timestamp');

		table.bigInteger('customer')
			.unsigned().index()
			.references('id').inTable('Person');
		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Equipment');
		
		table.integer('quantity').defaultTo(1)
		table.specificType('price', 'money');
		
		table.float('discount').defaultTo(0.0);
		table.float('tax');
		
		table.text('notes');
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
		.dropTableIfExists('Item')
		.dropTableIfExists('Location')
		.dropTableIfExists('Program')
		.dropTableIfExists('Chemical')
		.dropTableIfExists('Sale')
		.dropTableIfExists('Grant')
		.dropTableIfExists('ResearchProject')
		.dropTableIfExists('ResearchPartner')
}