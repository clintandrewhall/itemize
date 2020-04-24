import fs from 'fs';
import { resolve, join } from 'path';
import cp from 'child_process';
import os from 'os';

const installer = (lib, mod) => {
  const modPath = join(lib, mod);

  // ensure path has package.json
  if (!fs.existsSync(join(modPath, 'package.json'))) {
    return;
  }

  // npm binary based on OS
  const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

  // install folder
  cp.spawn(npmCmd, ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
};

export const install = path => {
  const lib = resolve(__dirname, path);
  fs.readdirSync(lib).forEach(mod => installer(lib, mod));
};
