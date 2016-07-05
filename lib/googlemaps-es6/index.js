import enhance from './enhance.js';

import MVCArray from './mvcarray.js';
import Data from './data.js';
import LatLng from './latlng.js';

[
	google.maps.Map,
	google.maps.Data.Feature,
	google.maps.Data.Geometry,
	google.maps.Marker,
	google.maps.InfoWindow,
	google.maps.Polyline,
	google.maps.Polygon,
	google.maps.Rectangle,
	google.maps.Circle,
	google.maps.GroundOverlay,
	google.maps.OverlayView,
	google.maps.MapCanvasProjection,
]
.map(o => enhance(o))

export default google.maps;