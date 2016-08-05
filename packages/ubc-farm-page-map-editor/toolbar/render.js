import {createElement as h} from 'react' /** @jsx h */
import {render} from 'react-dom';
import {domready} from '../../ubc-farm-utils/index.js';
import store from '../redux/store.js';
import Toolbar from './connected.js';

domready.then(() => render(<Toolbar store={store} />));