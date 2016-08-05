import {setLoading, updateGeoJson} from './actions.js'

export default function handleGridFormSubmit(formData) {
	return (dispatch, getState) => {
		const {active} = getState();
		dispatch(setLoading(active, true));

		const gridData = Promise.resolve({}) //TODO: Get from AutoGrid
		gridData.then(data => dispatch(updateGeoJson(data)))
			.catch(err => dispatch(updateGeoJson(undefined, err)))
			.then(() => dispatch(setLoading(active, false)));
	}
}