import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prefix = path.resolve(__dirname,'../config-file/' );

const vscode = {
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript"
  ],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.tabSize": 2,
  "eslint.options": {
    "overrideConfigFile": ".eslintrc.cjs"
  },
  // "css.validate": false,
  // "less.validate": false,
  // "scss.validate": false,
  // "stylelint.validate": ["css", "scss", "less"],
  // "stylelint.enable": true,
}

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([
  {
    title: 'Install eslint dependent packages',
    task: () => {
      return execa('npm', ['install', '-D',
        'eslint',
        'babel-eslint',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'markdown-eslint-parser',
        "eslint-config-prettier", // 避免prettier冲突
        // 'eslint-plugin-react',
        // 'eslint-plugin-react-hooks',
        // 'eslint-plugin-jsx-control-statements',
      ])
    }
  },
  {
    title: 'copy .eslintrc file',
    task: () => {
      return execa('cp', [path.resolve(prefix, '.eslintrc.cjs'), process.cwd()])
    }
  },
  {
    title: 'add eslint script',
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
        "eslint": "eslint ./src --fix"
      }
      fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
    }
  },
  {
    title: 'set vscode config',
    task: () => {

      return new Promise((resolve, reject) => {
        const vscodeConfig = path.resolve(process.cwd(), '.vscode/settings.json');
        let fileStat = null;
        try {
          fileStat = fs.statSync(vscodeConfig);
        } catch (err) {

        }
        let configObj = {
          ...vscode
        };
        if (fileStat && fileStat.isFile()) {
          const configString = fs.readFileSync(vscodeConfig, { encoding: 'utf8' });
          try {
            configObj = JSON.parse(configString);
          } catch (error) {
            reject('.vscode/settings.json 解析错误！')
          }
          configObj = {
            ...vscode,
            ...configObj,
          }
        } else {
          const vscode = path.resolve(process.cwd(), '.vscode');
          try {
            fileStat = fs.statSync(vscode);
          } catch (err) {
            fs.mkdirSync('.vscode')
          }
        }
        fs.writeFileSync(vscodeConfig, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
        resolve(undefined)
      })
    }
  }
]);

export default tasks;