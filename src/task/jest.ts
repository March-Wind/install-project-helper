import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prefix = path.resolve(__dirname,'../config-file/' );


const jest_config_in_eslint = {
  files: ["__tests__/**/*.test.ts", "__tests__/**/*.test.js"],
  "plugins": ["jest"],
  extends: ["plugin:jest/recommended"],
  "parserOptions": {
    'jest/globals': true,
  }
}

interface Ctx {
  /* some variables for internal use */
}
const tasks = new Listr<Ctx>([
  {
    title: 'init jest',
    task: (ctx, task) => {
      return task.newListr([
        {
          title: "install packages",
          task: () => {
            return execa('npm', ['i', '-D',
              'jest',
              'ts-jest',
              '@types/jest'
            ])
          }
        },
        {
          title: "copy jest config file",
          task: () => {
            return execa('cp', [path.resolve(prefix, 'jest.config.ts'), process.cwd()])
          }
        },
        {
          title: 'add jest script',
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
            configObj.scripts = {
              ...configObj.scripts,
              "test": "jest --passWithNoTests",
            }
            fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
          }
        },
        {
          title: 'use jest in eslint when there is eslint',
          task: (ctx, task) => {
            return task.newListr([
              {
                title: "install jest plugin",
                task: () => {
                  return execa('npm', ['i', '-D', 'eslint-plugin-jest']);
                }
              }, {
                title: "set eslintrc",
                task: async () => {
                 
                  const eslintrcPath = path.resolve(process.cwd(), './.eslintrc.cjs');
                  let fileStat = null;
                  try {
                    fileStat = fs.statSync(eslintrcPath);
                  } catch (err) {

                  }
                  let configObj: any = { overrides: {} };
                  if (fileStat && fileStat.isFile()) {
                    configObj = (await import(/* webpackIgnore: true */ eslintrcPath)).default;
                  }
                  configObj.overrides = [
                    ...configObj.overrides,
                    jest_config_in_eslint
                  ];

                  fs.writeFileSync(eslintrcPath, `module.exports = ${JSON.stringify(configObj, null, 2)}`, { encoding: 'utf-8' });
                }
              }
            ])

          }
        }

      ])
    }
  }])


export default tasks;