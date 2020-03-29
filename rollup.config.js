import path from 'path';
import fs from 'fs';

import nodePolyfills from 'rollup-plugin-node-polyfills';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const lib = path.resolve(__dirname, 'lib/http');
const configs = [];

fs.readdirSync(lib).forEach(mod => {
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
    external: [],
    plugins: [
      resolve({ extensions: ['.js', '.ts'], preferBuiltins: true }),
      babel(),
    ],
  });
});

export default configs;
