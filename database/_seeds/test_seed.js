/* eslint-disable import/no-commonjs */
exports.seed = function seed(knex) {
	return Promise.all([
		knex('Person').del().then(() => Promise.all([
			knex('Person').insert({ name: 'CSA Corp', role: 'CSA' }),
			knex('Person').insert({ name: 'Eatery', role: 'Restaurant' }),
			knex('Person').insert({ name: 'Supply Co', role: 'Supplier' }),
			knex('Person').insert({ name: 'Bill Black', role: 'Customer' }),
			knex('Person').insert({ name: 'UBC Farm Market', role: 'Market' }),
		])),
		knex('Employee').del().then(() => Promise.all([
			knex('Employee').insert({ name: 'John Smith', hourlyPay: 1045 }),
			knex('Employee').insert({ name: 'Jack White', hourlyPay: 1159 }),
			knex('Employee').insert({ name: 'Jill Blue', hourlyPay: 12390 }),
			knex('Employee').insert({ name: 'James Red', hourlyPay: 4587 }),
		])),
		knex('Researcher').del().then(() => knex('Researcher')
			.insert({
				name: 'Zia Mehrabi',
				position: 'Post Doc',
				faculty: 'Science',
				department: 'Land and Food Systems',
				labWebsite: 'ubcfarm.ubc.ca',
				expertise: 'Sustainable Agriculture',
			})),
		knex('Field').del().then(() => Promise.all([

		])),
		knex('Crop').del().then(() => Promise.all([

		])),
		knex('Seeding').del().then(() => Promise.all([

		])),
		knex('Program').del().then(() => Promise.all([
			knex('Program').insert({
				name: 'Farm Operations',
				color: '0000ff',
				text_color: 'ffffff',
			}),
			knex('Program').insert({
				name: 'Special Projects',
				color: 'ff99dd',
				text_color: '000000',
			}),
			knex('Program').insert({
				name: 'Volunteer and Outreach',
				color: 'ffff00',
				text_color: '000000',
			}),
			knex('Program').insert({
				name: 'Private Events',
				color: 'cc66ff',
				text_color: '000000',
			}),
			knex('Program').insert({
				name: 'Practicum',
				color: 'ff7700',
				text_color: '000000',
			}),
			knex('Program').insert({
				name: 'Workshops',
				color: '800000',
				text_color: 'ffffff',
			}),
			knex('Program').insert({
				name: 'Children\'s',
				color: 'ff00ff',
				text_color: '000000',
			}),
		])),
		knex('Location').del().then(() => Promise.all([
			knex('Location').insert({
				name: 'Farm Center Building',
				position: JSON.stringify([-123.239926, 49.251265]),
			}),
			knex('Location').insert({
				name: 'Harvest Building',
				position: JSON.stringify([-123.238967, 49.251033]),
			}),
			knex('Location').insert({
				name: 'Storage 1',
				position: JSON.stringify([-123.234530, 49.249557]),
			}),
			knex('Location').insert({
				name: 'Storage 2',
				position: JSON.stringify([-123.240622, 49.250837]),
			}),
			knex('Location').insert({
				name: 'Kitchen',
				position: JSON.stringify([-123.240115, 49.251552]),
			}),
		])),
	]);
};
