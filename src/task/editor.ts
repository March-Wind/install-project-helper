import { Listr } from 'listr2'
import { execa, execaSync } from 'execa'
import path from 'path';

interface Ctx {
  /* some variables for internal use */
}
const tasks = new Listr<Ctx>([
  {
    title: "copy editor config file",
    task: () => {
      const prefix = global.CONFIG_FILE_PATH;
      return execa('cp', [path.resolve(prefix, '.editorConfig'), process.cwd()])
    }
  }
])

export default tasks;