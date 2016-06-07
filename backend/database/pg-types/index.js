import {types} from 'pg';
import {oid as PG} from './oid.js';

import {point, path, circle} from './parse/geometric.js';

types.setTypeParser(PG.point, point);
types.setTypeParser(PG.lseg, path);
types.setTypeParser(PG.box, path);
types.setTypeParser(PG.path, path);
types.setTypeParser(PG.polygon, polygon);
types.setTypeParser(PG.circle, circle);