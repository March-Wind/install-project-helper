


declare global {
  declare var CONFIG_FILE_PATH: string;
  declare const wx: WX;
  // window上挂载
  declare interface Window {
    wx: WX;
  }
  // node上挂载
  namespace NodeJS {
    interface Global {
      CONFIG_FILE_PATH: string;
     }
  }

}

export {}