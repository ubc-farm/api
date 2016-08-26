import Calendar from './calendar.js';
import Directory from './directory.js';
import GeoJSON from './fields-geojson/index.js';
import GeoJSONLocation from './locations-geojson/get.js';
import ItemList from './itemlist.js';

export default [...Calendar, ...Directory, ...GeoJSON, ...ItemList, GeoJSONLocation];
