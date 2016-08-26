import { Equipment } from '../../database/index.js';
import { transformReply, arrayToObjectMap } from './transformer.js';
import { validate } from './transformer-validation.js';

const equipmentKeys = ['id', 'description', 'quantity', 'location'];
const itemKeys = ['name', 'supplierId', 'sku', 'value', 'salvageValue'];

function getItemList(request, reply) {
	const { id } = request.params;

	let query = Equipment.query();
	if (id) query = query.findById(id);

	query = query.map(equipment => equipment.$relatedQuery('item').then(() => {
		const result = {};
		for (const key in equipment) {
			if (Object.prototype.hasOwnProperty.call(equipment, key)) {
				const value = equipment[key];
				if (equipmentKeys.includes(key) && value != null) result[key] = value;
			}
		}

		for (const key in equipment.item) {
			if (Object.prototype.hasOwnProperty.call(equipment.item, key)) {
				const value = equipment.item[key];
				if (key === 'id') result.item = value;
				else if (itemKeys.includes(key) && value != null) result[key] = value;
			}
		}

		return result;
	}));

	query = query.then(list => arrayToObjectMap(list, 'id'));

	return transformReply(query, request, reply);
}

export default [
	{
		method: 'GET',
		path: '/api/itemlist',
		handler: getItemList,
		config: { cors: true, validate },
	},
	{
		method: 'GET',
		path: '/api/itemlist/{id}',
		handler: getItemList,
		config: { cors: true, validate },
	},
];
