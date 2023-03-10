import path, { dirname } from 'path';
import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([
  {
    title: 'install packages',
    task: () => {
      return execa('npm', ['install', '-D', 'stylelint-config-prettier', 'stylelint-prettier'])
    }
  },
  {
    title: 'copy ..stylelintrc file',
    task: () => {
      const prefix = global.CONFIG_FILE_PATH;
      return execa('cp', [path.resolve(prefix, '.stylelintrc.js'), process.cwd()])
    }
  },
]);

export default tasks;


