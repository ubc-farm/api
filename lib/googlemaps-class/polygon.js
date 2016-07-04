import dic from './dictionary';
import wrap from './wrap.js';

const extra = [];
export default class Map extends wrap(google.maps.Map, extra, dic) {}