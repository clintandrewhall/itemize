import arc from '@architect/functions';
import { query } from './middleware/query';

export const handler = arc.http.async(query);
