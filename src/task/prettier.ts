import path, { dirname } from 'path';
import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import editorTask from './editor';

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
      const prefix = global.CONFIG_FILE_PATH;
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