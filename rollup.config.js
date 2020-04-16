import path from 'path';
import fs from 'fs';

import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import graphql from 'rollup-plugin-graphql';

const lib = path.resolve(__dirname, 'lib/http');
const extensions = ['.js', '.ts', '.tsx'];
const plugins = [
  babel({ extensions }),
  resolve({ extensions }),
  graphql(),
  commonjs(),
];

const configs = [
  {
    external: ['react', 'react-dom'],
    input: 'lib/app/index.tsx',
    output: {
      file: 'public/app/index.js',
      format: 'cjs',
    },
    plugins,
  },
];

fs.readdirSync(lib).forEach(mod => {
  const lib = `lib/http/${mod}`;
  const src = `src/http/${mod}`;

  if (mod.startsWith('.') || !fs.lstatSync(`lib/http/${mod}`).isDirectory()) {
    return;
  }

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
      ...plugins,
      copy({
        targets: [
          {
            src: [
              `${lib}/*`,
              `${lib}/.*`,
              `!${lib}/**/*.ts*`,
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
