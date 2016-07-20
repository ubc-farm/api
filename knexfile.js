// Update with your config settings.

module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
			filename: './dev.sqlite3'
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: 'app/models/_migrations'
		},
		seeds: {
			directory: 'app/models/_seeds'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
