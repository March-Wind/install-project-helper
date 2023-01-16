import path, { dirname } from 'path';
import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import editorTask from './editor';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prefix = path.resolve(__dirname,'../config-file/' );
console.log(prefix);
interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([
  {
    title: 'init prettier',
    task: () => {
      return execa('npm', ['install', '-D', 'prettier',])
    }
  },
  {
    title: 'copy .prettierrc file',
    task: () => {
      return execa('cp', [path.resolve(prefix, '.prettierrc'), process.cwd()])
    }
  },
  {
    title: 'copy .editor config file',
    task: () => {
      return editorTask;
    }
  },


]);

export default tasks;