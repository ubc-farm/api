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
	}} prefix='/fields/' banner={/* Filter element */}>
		<div id="google-map" class="google-map"/>
		<aside className='map-aside'>
			<MapSidebar/>
		</aside>
	</Layout>
	, {
		title: 'Edit fields',
		script: ['map/editor.js'],
		css: [
			'modules/icon', 'modules/icon-button', 'modules/text-field',
			'modules/angle-indicator', 'modules/loading'
		]
	}
)