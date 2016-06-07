import objection from 'objection';
import Knex from 'knex';

const knex = Knex({
	client: 'pg',
  connection: process.env.PG_CONNECTION
});
objection.Model.knex(knex);