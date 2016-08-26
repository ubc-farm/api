import { Equipment } from '../../database/index.js';
import { transformReply } from './transformer.js';
import { validate } from './transformer-validation.js';

const equipmentKeys = ['description', 'quantity', 'location'];
const itemKeys = ['id', 'name', 'supplierId', 'sku', 'value', 'salvageValue'];

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
				if (itemKeys.includes(key) && value != null) result[key] = value;
			}
		}

		return result;
	}));

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
