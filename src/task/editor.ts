import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
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
    title: "copy editor config file",
    task: () => {
      return execa('cp', [path.resolve(prefix, '.editorConfig'), process.cwd()])
    }
  }
])

export default tasks;