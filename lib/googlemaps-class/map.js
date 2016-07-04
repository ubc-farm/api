import dic from './dictionary';
import wrap from './wrap.js';

const extra = ['panTo', 'panBy', 'fitBounds', 'panToBounds'];
export default class Map extends wrap(google.maps.Map, extra, dic) {}