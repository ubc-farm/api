import initKnex from 'knex';
import { Model } from 'objection';
import * as knexfile from '../knexfile.js'; // eslint-disable-line import/namespace

const { NODE_ENV = 'development' } = process.env;

const knex = initKnex(knexfile[NODE_ENV]);
Model.knex(knex);
