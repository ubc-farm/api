import {DataSet} from 'vis-timeline'; //eslint-disable-line 

const getClass = type => `planner-${type.toLowerCase()}`;

const items = new DataSet();
export default items;

export function addTask(location, tasktype, text, tooltip) {
	
}