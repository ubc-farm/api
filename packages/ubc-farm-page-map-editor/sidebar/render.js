import {createElement as h} from 'react' /** @jsx h */
import {render} from 'react-dom';
import {domready} from '../../ubc-farm-utils/index.js';
import store from '../redux/store.js';
import Form from './form-connector.js';
import Submit from './submit-button.js';

domready.then(() => render(
	<aside className='map-aside'>
		<Form store={store} id='grid-form' />
		<Submit store={store} form='grid-form' />
	</aside>
));