export default fetch('/api/directory')
.then(response => response.json())
.then(json => {
	let map = new Map();

	for (const key in json) {
		let value = json[key];
		switch (value.role) {
			case 'Restaurant': value.icon = 'restaurant'; break;
			case 'Employee': value.icon = 'business'; break;
		}

		map.set(key, value);
	}

	return map;
});