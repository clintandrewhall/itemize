import { printSchema } from 'graphql';
import fs from 'fs';
import path from 'path';
import { schema } from '../lib/common/data/schema';

const schemaPath = path.resolve(__dirname, '../lib/common/data/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));

console.log('Wrote ' + schemaPath);
