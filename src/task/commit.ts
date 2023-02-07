import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prefix = path.resolve(__dirname,'../config-file/' );

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([
  {
    title: 'Install husky',
    task: () => {
      return new Listr([{
        title: "install",
        task: () => {
          return execa('npm', ['i', '-D', 'husky',])
        }
      },
      {
        title: "init git",
        task: () => {
          return execa('git', ['init'])
        }
      },
      {
        title: "init husky",
        task: () => {
          return execa('npx', ['husky', 'install'])
        }
      }])
    }
  },
  {
    title: 'add commit msg lint ',
    task: () => {
      return new Listr([{
        title: "install depaendece package",
        task: () => {
          return execa('npm', ['i', '-D', '@commitlint/config-conventional', '@commitlint/cli'])
        }
      },
      {
        title: "add msg lint hooks",
        task: () => {
          return execa('npx', ['husky', 'add', '.husky/commit-msg', 'npx --no-install commitlint --edit "$1"'])
        }
      }])
    }
  },
  {
    title: 'install code lint',
    task: () => {
      return new Listr([{
        title: "Install depaendece package",
        task: () => {
          return execa('npm', ['i', '-D', 'lint-staged'])
        }
      },
      {
        title: "Add code lint hooks",
        task: () => {
          return execa('npx', ['husky', 'add', '.husky/pre-commit', 'npx lint-staged'])
        }
      }, {
        title: 'Add command ',
        task: () => {
          const packagePath = path.resolve(process.cwd(), './package.json');
          let fileStat = null;
          try {
            fileStat = fs.statSync(packagePath);
          } catch (err) {

          }
          let configObj: any = { scripts: {} };
          if (fileStat && fileStat.isFile()) {
            const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
            try {
              configObj = JSON.parse(configString);
            } catch (error) {
              throw new Error('package.json 解析错误！')
            }

          }
          configObj["lint-staged"] = {
            ...configObj["lint-staged"],
            "**.{js,jsx,ts,tsx}": [
              "eslint --fix",
              "prettier --config .prettierrc --write"
            ],
            "*.+(css|less|scss|sass)": "stylelint --fix"
          }
          fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
        }
      },{
        title:'config rule',
        task: () => {
          return execa('cp', [path.resolve(prefix, 'commitlint.config.cjs'), process.cwd()])
        }
      }])
    }
  },

]);

export default tasks;