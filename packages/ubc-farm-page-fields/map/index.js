import store from '../redux/store.js';
import connect from './connector.js';

import './weather.js';
import './get-api.js';

connect(store);

export {default} from './map.js';