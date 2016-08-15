import store from '../redux/store.js';
import connect, {defaultStyler} from './connector.js';

import './weather.js';
import './get-api.js';

connect(store);
defaultStyler();

export {default} from './map.js';