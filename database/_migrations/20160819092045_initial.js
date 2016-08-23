
exports.up = function(knex, Promise) {
  return knex.schema
	.table('Employee', table => {
		//table.inherits('Person');

		table.integer('hourlyPay');
		table.boolean('fullOrPartTime').index();

		//possiblity reconfigure to use child tables
		table.specificType('holidayDays', 'date[]');
		table.specificType('sickDays', 'date[]');
		table.specificType('paidLeaveDays', 'date[]');
		table.specificType('inLieuHours', 'interval');
		table.specificType('medicalLeaveTime', 'tsrange[]');

		table.boolean('working_sunday').index();
		table.boolean('working_monday').index();
		table.boolean('working_tuesday').index();
		table.boolean('working_wednesday').index();
		table.boolean('working_thursday').index();
		table.boolean('working_friday').index();
		table.boolean('working_saturday').index();

		table.text('emergencyContactName');
		table.string('emergencyContactNumber', 15);
	})
	.table('Researcher', table => {
		//table.inherits('Person');

		table.text('position');
		table.text('faculty');
		table.text('department');
		table.text('labWebsite');
		table.text('expertise');
		table.text('coursesTaught');
		table.text('projects');
	})
	.createTable('Assignment', table => {
		table.bigIncrements('id');

		table.bigInteger('assigned_task').unsigned()
			.references('id').inTable('Task');

		table.bigInteger('assigned_employee')
			.unsigned().notNullable()
			.references('id').inTable('Employee');
	})
	.createTable('Equipment', table => {
		table.bigIncrements('id');
		table.bigInteger('product')
			.unsigned().index()
			.references('id').inTable('Item');
		
		table.text('description');
		table.integer('quantity');
		table.date('purchaseDate');
		
		table.bigInteger('location').index()
			.references('id').inTable('Location');
	})
	.createTable('EquipmentUsage', table => {
		table.bigIncrements('id');

		table.bigInteger('equipment')
			.unsigned().notNullable()
			.references('id').inTable('Equipment');
		table.integer('quantity');

		table.bigInteger('sellingUsage').unsigned()
			.references('id').inTable('Sale');
		table.bigInteger('taskUsage').unsigned()
			.references('id').inTable('Task');
		table.text('notes')
	})
	.table('Event', table => {
		//table.inherits('Task');
		table.string('type').index();
		table.text('name').index();

		//table.specificType('keywords', 'tsvector').index()
		table.integer('estimatedAttendeeAmount');
		table.specificType('targetAgeGroup', 'int4range')
		
		table.bigInteger('ticketId').unsigned()
			.references('id').inTable('Sale');
		table.bigInteger('contactId').unsigned()
			.references('id').inTable('Person');
	})
	.table('Seeding', table => {
		//table.inherits('Task');
		table.bigInteger('crop').unsigned()
			.references('id').inTable('Crop');
		
		table.bigInteger('variety').unsigned()
			.references('id').inTable('Plant');
		table.bigInteger('product').unsigned()
			.references('id').inTable('Item');
		
		table.string('methodUsed').index();
		
		table.json('spacingBetweenHoles');
		table.float('depthOfHoles');
		table.float('seedsPerHole');

		table.float('gramsApplied');
		table.float('seedsPerGram');

		table.float('germinationPercentage');

		table.float('predictedYield');
		table.specificType('daysToMaturity', 'interval');

		table.json('npkReq');
	})
	.table('Irrigation', table => {
		//table.inherits('Task');

		table.float('flowRate');
		table.string('type').index();
	})
	.table('SoilSampling', table => {
		//table.inherits('Task');

		table.float('depth');
		table.string('methodUsed').index();
		table.text('variable');
		table.text('result');

		table.bigInteger('company').unsigned()
			.references('id').inTable('Person');
	})
	.table('Fertilizing', table => {
		//table.inherits('ChemicalTask');

		table.float('tc');
		table.float('n03');
		table.float('nh4');
		table.float('k20');
		table.float('p205');
	})
	.table('PestControl', table => {
		//table.inherits('ChemicalTask');		

		table.json('activeIngredients');
		table.float('percentOfActiveIngredients');
	})
	.table('ScoutHarvest', table => {
		//table.inherits('Scouting');
		table.date('newExpectedHarvest');
		table.float('newPredictedYield');
	})
	.table('ScoutPest', table => {
		//table.inherits('Scouting');
		
		table.string('pestType');
		table.string('affectedSpot');
		
		table.text('pestName');
		table.text('pestNameLatin');

		table.float('percentAreaAffected');
		table.float('percentPlantsAffected');
		table.float('economicThreshold');
	})
	.createTable('Field', table => {
		table.bigIncrements('id');
		// table.specificType('path', 'polygon').index(null, 'GiST');
		table.json('path');

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
		table.bigInteger('fieldId')
			.unsigned().notNullable().index()
			.references('id').inTable('Field');
		table.text('predictedNutrientReq');
		table.date('expectedHarvest');
	})
	.table('Plant', table => {
		//table.inherits('Item');
		table.text('latin').index().unique();
	})
	.createTable('Location', table => {
		table.bigIncrements('id');
		table.text('name');
		table.json('position');
		table.bigInteger('fieldId').unsigned().unique()
			.references('id').inTable('Field');
	})
	.createTable('Program', table => {
		table.bigIncrements('id');
		table.text('name').index();
		table.string('color', 6); 
		table.string('text_color', 6).defaultTo('000000'); 

		table.bigInteger('linkedAccount').unsigned()
			.references('id').inTable('Account');
	})
	.createTable('ProgramUsage', table => {
		table.bigIncrements('id');
		table.bigInteger('programId')
			.unsigned().notNullable()
			.references('id').inTable('Program');
		table.bigInteger('taskId')
			.unsigned().notNullable()
			.references('id').inTable('Task');
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
		table.json('composition');
	})
	.table('Grant', table => {
		//table.inherits('sale');
		table.text('grantName');
	})
	.createTable('ResearchProject', table => {
		table.bigIncrements('id');
		table.bigInteger('researcher')
			.unsigned().notNullable().unique()
			.references('id').inTable('Researcher');
		
		table.text('title');
		table.specificType('date', 'daterange').index();

		table.integer('postDocs').defaultTo(0);
		table.integer('phds').defaultTo(0);
		table.integer('masters').defaultTo(0);
		table.integer('bachelors').defaultTo(0);
		table.integer('others').defaultTo(0);

		table.specificType('grantValue', 'money');
		table.text('grantSource');
		table.text('publications');
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
	.createTable('Mix', table => {
		table.bigIncrements('id');

		table.bigInteger('forId')
			.unsigned().notNullable()
			.references('id').inTable('Plant');

		table.bigInteger('subId')
			.unsigned().notNullable()
			.references('id').inTable('Plant');
	})
};

exports.down = function(knex, Promise) {
  return knex.schema
	.table('Employee', table => table.dropColumns(
		'hourlyPay', 'fullOrPartTime',
		'holidayDays', 'sickDays', 'paidLeaveDays',
		'inLieuHours', 'medicalLeaveTime',
		'working_sunday', 'working_monday', 'working_tuesday',
		'working_wednesday', 'working_thursday', 'working_friday',
		'working_saturday',
		'emergencyContactName', 'emergencyContactNumber'
	))
	.table('Researcher', table => table.dropColumns(
		'position', 'faculty', 'department',
		'labWebsite', 'expertise',
		'coursesTaught', 'projects'
	))
	.dropTableIfExists('Assignment')
	.dropTableIfExists('Equipment')
	.dropTableIfExists('EquipmentUsage')
	.table('Event', table => table.dropColumns(
		'type', 'name',
		'estimatedAttendeeAmount', 'targetAgeGroup',
		'ticketId', 'contactId'
	))
	.table('Seeding', table => table.dropColumns(
		'crop', 'variety', 'product',
		'methodUsed', 'spacingBetweenHoles',
		'depthOfHoles', 'seedsPerHole', 
		'gramsApplied', 'seedsPerGram', 'germinationPercentage',
		'predictedYield', 'daysToMaturity', 'npkReq'
	))
	.table('Irrigation', table => table.dropColumns(
		'flowRate', 'type'
	))
	.table('SoilSampling', table => table.dropColumns(
		'depth', 'methodUsed', 'variable', 'result', 'company'
	))
	.table('Fertilizing', table => table.dropColumns(
		'tc', 'n03', 'nh4', 'k20', 'p205'
	))
	.table('PestControl', table => table.dropColumns(
		'activeIngredients', 'percentOfActiveIngredients'
	))
	.table('ScoutHarvest', table => table.dropColumns(
		'newExpectedHarvest', 'newPredictedYield'
	))
	.table('ScoutPest', table => table.dropColumns(
		'pestType', 'affectedSpot', 'pestName', 'pestNameLatin',
		'percentAreaAffected', 'percentPlantsAffected', 'economicThreshold'
	))
	.dropTableIfExists('Field')
	.dropTableIfExists('Crop')
	.table('Plant', table => table.dropColumns(
		'latin'
	))
	.dropTableIfExists('Location')
	.dropTableIfExists('Program')
	.dropTableIfExists('ProgramUsage')
	.dropTableIfExists('Account')
	.dropTableIfExists('Chemical')
	.table('Grant', table => table.dropColumns(
		'grantName'
	))
	.dropTableIfExists('ResearchProject')
	.dropTableIfExists('ResearchPartner')
	.dropTableIfExists('Mix')
};
