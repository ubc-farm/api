import enhance from './enhance.js';

import MVCArray from './mvcarray.js';
import Data from './data.js';
import LatLng from './latlng.js';

[
	google.maps.Map,
	google.maps.Data.Feature,
	google.maps.Data.Geometry
]
.map(o => enhance(o))