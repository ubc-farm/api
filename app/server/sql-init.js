import knexFactory from 'knex';
import {Model} from 'objection';
import knexfile from 'knexfile.js';

const knex = knexFactory(knexfile.development);
Model.knex(knex);