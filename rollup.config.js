import path from 'path';
import fs from 'fs';

import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import graphql from 'rollup-plugin-graphql';

const lib = path.resolve(__dirname, 'lib/http');
const configs = [];

fs.readdirSync(lib).forEach((mod) => {
  if (mod.startsWith('.')) {
    return;
  }

  const lib = `lib/http/${mod}`;
  const src = `src/http/${mod}`;

  configs.push({
    input: `${lib}/index.ts`,
    output: {
      dir: src,
      format: 'cjs',
    },
    plugins: [
      autoExternal({
        packagePath: lib,
      }),
      resolve({ extensions: ['.js', '.ts'] }),
      graphql(),
      babel(),
      commonjs(),
      copy({
        targets: [
          {
            src: [
              `${lib}/*`,
              `${lib}/.*`,
              `!${lib}/**/*.ts`,
              `!${lib}/node_modules`,
            ],
            dest: src,
          },
        ],
        copyOnce: true,
      }),
    ],
  });
});

export default configs;
