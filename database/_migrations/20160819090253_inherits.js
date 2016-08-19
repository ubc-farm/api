function inheritPerson(table) {
	table.bigIncrements('id');
	table.text('name').index().notNullable();
	table.string('role');

	table.text('email');
	table.string('phoneNumber', 15);
	table.json('addressMailing');
	table.json('addressPhysical');
}

function inheritTask(table) {
	table.bigIncrements('id');

	table.timestamp('start_time');
	table.timestamp('end_time');
	table.specificType('hoursTaken', 'interval');

	table.bigInteger('locationId').unsigned()
		.references('id').inTable('Location');
}
function inheritChemicalTask(table) {
	inheritTask(table); //table.inherits('Task');
		
	table.bigInteger('product')
		.unsigned().index()
		.references('id').inTable('Chemical');

	table.string('type');
	table.float('applicationRate');
	table.float('waterToMixRatio');
	table.string('plantLocation');
	table.specificType('entry_interval', 'interval');
	table.specificType('harvest_interval', 'interval');
}

function inheritScouting(table) {
	inheritTask(table); //table.inherits('Task');
	table.bigInteger('cropId').unsigned()
		.references('id').inTable('Crop');
}

function inheritItem(table) {
	table.bigIncrements('id');
	table.text('name').index();
		
	table.text('sku').unique().index();
	table.text('barcode').unique();

	table.bigInteger('supplierId').unsigned().index()
		.references('id').inTable('Person');
		
	table.specificType('lifespan', 'interval').index();
	table.specificType('value', 'money');
	table.specificType('salvageValue', 'money');
}

function inheritSale(table) {
	table.bigIncrements('id');

	table.timestamp('order_date');
	table.timestamp('delivery_date');

	table.integer('budgetLineNumber');

	table.bigInteger('customerId')
		.unsigned().index()
		.references('id').inTable('Person');

	table.bigInteger('deliveryLocation')
		.unsigned().index()
		.references('id').inTable('Location');
	
	table.integer('quantity').defaultTo(1);
	table.specificType('price', 'money');
	
	table.specificType('discount', 'money');
	table.specificType('tax', 'money');
	
	table.text('notes');
}

exports.up = function(knex) {
	return knex.schema
	.table('Employee', inheritPerson)
	.table('Researcher', inheritPerson)
	
	.table('Event', inheritTask)
	.table('Seeding', inheritTask)
	.table('Irrigation', inheritTask)
	.table('SoilSampling', inheritTask)

	.table('Fertilizing', inheritChemicalTask)
	.table('PestControl', inheritChemicalTask)

	.table('Scouting', inheritTask)
	.table('ScoutHarvest', inheritScouting)
	.table('ScoutPest', inheritScouting)

	.table('Plant', inheritItem)
	.table('Grant', inheritSale)
};

function dropPerson(table) {
	table.dropColumns('id', 'name', 'role');
	table.dropColumns('email', 'phoneNumber', 'addressMailing', 'addressPhysical')
}

function dropTask(table) {
	table.dropColumns('id', 'start_time', 'end_time');
	table.dropColumns('hoursTaken', 'locationId');
}

function dropChemicalTask(table) {
	dropTask(table);
	table.dropColumns('product', 'type', 'applicationRate', 'waterToMixRatio');
	table.dropColumns('plantLocation', 'entry_interval', 'harvest_interval');
}

function dropScouting(table) {
	dropTask(table);
	table.dropColumn('cropId');
}

function dropItem(table) {
	table.dropColumns('id', 'name', 'sku', 'barcode');
	table.dropColumns('supplierId', 'lifespan', 'value', 'salvageValue');
}

function dropSale(table) {
	table.dropColumns('id', 'order_date', 'delivery_date', 'budgetLineNumber');
	table.dropColumns('customerId', 'deliveryLocation');
	table.dropColumns('quantity', 'price', 'discount', 'tax', 'notes');
}

exports.down = function(knex) {
	return knex.schema
	.table('Employee', dropPerson)
	.table('Researcher', dropPerson)
	
	.table('Event', dropTask)
	.table('Seeding', dropTask)
	.table('Irrigation', dropTask)
	.table('SoilSampling', dropTask)

	.table('Fertilizing', dropChemicalTask)
	.table('PestControl', dropChemicalTask)

	.table('Scouting', dropTask)
	.table('ScoutHarvest', dropScouting)
	.table('ScoutPest', dropScouting)

	.table('Plant', dropItem)
	.table('Grant', dropSale)
};
