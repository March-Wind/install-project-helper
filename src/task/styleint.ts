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
      return execa('npm', ['install', '-D', 'stylelint@14.3.0','stylelint-config-prettier@9.0.3', 'stylelint-config-standard@24.0.0','stylelint-prettier@2.0.0'])
    }
  },
  {
    title: 'copy ..stylelintrc file',
    task: () => {
      const prefix = global.CONFIG_FILE_PATH;
      return execa('cp', [path.resolve(prefix, '.stylelintrc.cjs'), process.cwd()])
    }
  },
]);

export default tasks;


