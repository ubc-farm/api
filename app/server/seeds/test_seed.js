exports.seed = function(knex) {
	return knex('Person').del().then(() => Promise.all([
		knex('Person').insert({id: 1, name: 'John Smith'}),
		knex('Person').insert({name: 'Snow White'})
	]))
}