import knexFactory from 'knex';
import {Model} from 'objection';
import {resolve} from 'path'

const knex = knexFactory({
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    seeds: {
      directory: resolve(__dirname, 'seeds')
    }
  });
Model.knex(knex);