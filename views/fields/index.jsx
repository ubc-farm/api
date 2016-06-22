import {default as renderPage, Layout} from '../_helpers/render.js';

export default renderPage(
	<Layout sidebar={{
		'Summary': '',
		'Task planner': 'new-task',
		'Edit fields layout': 'edit',
		'': null,
		'Log harvest': 'log/harvest',
		'Log soils': 'log/soil',
		'Log scouting': 'log/scouting'
	}} prefix='/fields/'>
		<div id="google-map" class="google-map"/>
		<aside className='map-aside'>

		</aside>
	</Layout>
	, {
		title: 'Fields',
		script: ['map/index.js']
	}
)