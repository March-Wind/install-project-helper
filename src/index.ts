import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { Listr } from 'listr2'
import chalk from 'chalk';
import eslintTask from './task/eslint'
import pettierTask from './task/prettier'
import styleTask from './task/styleint'
import jestTask from './task/jest';
import commitLintTask from './task/commit';
import {moduleType} from './utils'
// const env = process.env.NODE_ENV;
const _filename = moduleType () === 'esm'? fileURLToPath(import.meta.url): __filename;
const _dirname = dirname(_filename);
const prefix = path.resolve(_dirname,'config-file/' );
console.log(1,prefix)
interface Ctx {
  /* some variables for internal use */
}
global.CONFIG_FILE_PATH = prefix;

const tasks = new Listr<Ctx>([
  {
    title: 'add pettier',
    task: () => {
      return pettierTask;
    }
  },
  {
    title: 'add eslint',
    task: () => {
      return eslintTask;
    }
  },
  {
    title: 'add stylelint',
    task: () => {
      return  styleTask;
    }
  },
  {
    title: 'add jest',
    task: () => {
      return jestTask;
    }
  },
  {
    title: 'add lint in the commit phase',
    task: () => {
      return commitLintTask;
    }
  }
])

const run = async () => {
  try {
    await tasks.run()
    console.log(chalk.yellow(`
    请在vscode中安装以下插件：
    1. esbenp.prettier-vscode
    2. dbaeumer.vscode-eslint 
    3. editorconfig.editorconfig,
    4. stylelint.vscode-stylelint
    5. code-spell-checker进行命名检查
    `))

  } catch (e) {
    console.error(e)
  }
}
run();