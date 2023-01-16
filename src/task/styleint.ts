import path, { dirname } from 'path';
import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prefix = path.resolve(__dirname,'../config-file/' );
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
      return execa('cp', [path.resolve(prefix, '.stylelintrc.js'), process.cwd()])
    }
  },
]);

export default tasks;


