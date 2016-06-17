import {default as renderPage, Layout} from '../_helpers/render.js';

export default renderPage(
	<Layout sidebar={{
		Summary: ''
	}} prefix='/fields/'>

	</Layout>
	, {
		title: 'Edit fields',
		script: ['map/index.js']
	}
)

/*<layout-use("../_layouts/default.marko") name='Fields'>
	<layout-put into="head">
		<link href="/css/layout/map.css" rel="stylesheet" type="text/css"/>
		
		<script>System.import('map/index.js')</script>
	</layout-put>

	<layout-put into="sidebar">
		<nav-link name="Summary" href="/fields"/>
		<nav-link name="Task planner" href="/fields/new-task"/>
		<nav-link name="Edit fields layout" href="/fields/edit"/>
		<hr>
		<nav-link name="Log harvest" href="/fields/log/harvest"/>
		<nav-link name="Log soils" href="/fields/log/soil"/>
		<nav-link name="Log scouting" href="/fields/log/scouting"/>
	</layout-put>
	
	<layout-put into="banner">
		<!--Filter element-->
	</layout-put>
	
	<layout-put into="content">
		<google-map/>
		<aside class="map-aside">
			
		</aside>
	</layout-put>
</layout-use>*/