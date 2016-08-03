import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';

export default propagating(Hammer, {
	preventDefault: 'mouse'
});