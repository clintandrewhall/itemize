import arc from '@architect/functions';
import { auth } from './middleware/auth';
import { query } from './middleware/query';

export const handler = arc.http.async(auth, query);
