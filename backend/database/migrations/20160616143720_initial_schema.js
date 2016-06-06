/**
 * These functions are used for migrating the database and are called by 
 * knex migrate. The up function is called when applying the migration, and the
 * down function should be called to 'undo' the up migration.
 * 
 * This initial file will do first-time setup, but future files will modify the
 * schema established here.
 */

exports.up = function(knex) {
	// Person and sub-types
	return knex.schema.createTable('Person', table => {
		table.bigincrements('id').primary();
		table.text('name').index().notNullable();
		table.string('role');

		table.text('email');
		table.string('phoneNumber', 15);
		table.text('addressMailing');
		table.text('addressPhysical');
	}).createTable('Employee', table => {
		table.inherits('Person');
		table.boolean('fullOrPartTime').index();
		table.specificType('daysAvaliable', 'boolean[7]').index();
		table.specificType('hourlyPay', 'money');

		//possiblity reconfigure to use child tables
		table.specificType('holidayDays', 'date[]');
		table.specificType('sickDays', 'date[]');
		table.specificType('paidLeaveDays', 'date[]');
		table.specificType('inLieuHours', 'interval');
		table.specificType('medicalAppHours', 'tsrange[]');
	}).createTable('Researcher', table => {
		table.inherits('person');
		table.text('researcher_position');
		table.text('researcher_faculty');
		table.text('researcher_department');
		table.text('lab_website');
		table.text('researcher_expertise');
		table.specificType('researcher_courses', 'text[]');
		table.text('researcher_affiliation');
		table.text('researcher_publications');
		table.text('researcher_partners');
	}).createTable('Assignment', table => {
		table.increments('assignment_id').primary();
		table.integer('assigned_employee')
			.references('person_id').inTable('employee')
			.notNullable();
			
		table.integer('assigned_event')
			.references('event_id').inTable('event');
		table.integer('assigned_task')
			.references('task_id').inTable('task');
			
		table.specificType('assignment_time', 'tsrange');
		table.integer('assignment_location')
			.references('location_id').inTable('location');
	})
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTableIfExists('Person')
		.dropTableIfExists('Employee')
		.dropTableIfExists('Researcher')
		.dropTableIfExists('Assignment')
}