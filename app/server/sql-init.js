import knexFactory from 'knex';
import {Model} from 'objection';

const knex = knexFactory({
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  });
Model.knex(knex);