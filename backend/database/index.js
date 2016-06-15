import initTypes from './pg-types';
import objection from 'objection';
import Knex from 'knex';
import * as model from './models';

initTypes();

const knex = Knex({
	client: 'pg',
  connection: process.env.PG_CONNECTION
});
objection.Model.knex(knex);