export default function calculateOffset(totalColumn, allColumns) {
	let i = 0, indexOf;
	for (const column of allColumns) {
		if (totalColumn === column) {
			indexOf = i;
			break;
		} else i++;
	}

	return {
		leftPad: indexOf + 1,
		rightPad: allColumns.length - indexOf - 1
	};
}