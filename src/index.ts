import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import chalk from 'chalk';
import eslintTask from './task/eslint'
import pettierTask from './task/prettier'
import styleTask from './task/styleint'
import jestTask from './task/jest';
import commitLintTask from './task/commit';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
interface Ctx {
  /* some variables for internal use */
}


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