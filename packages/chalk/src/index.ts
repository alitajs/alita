// 随便写写，没经过什么思考，欢迎指正和重写
// 保存下全局的 console 对象，防止被别人重写，比如在 alita 的某一些场景中，会通过暴力覆盖它来达到去除项目中的console的目的
// 通过全局的 alitadebug 来控制是否打印日志
let chalk: AlitaChalk = {} as AlitaChalk;

interface ColorProps {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  [key: string]: string;
}

interface ColorHashProps {
  log: string;
  wait: string;
  error: string;
  warn: string;
  ready: string;
  info: string;
  event: string;
  debug: string;
  [key: string]: string;
}

type ChalkFunction = (str: string) => void;
type ColorFunction = (str: string) => string[];
interface AlitaChalk {
  add: (...args: any[]) => string[];
  hello: (title: string, version: string) => void;
  log: ChalkFunction;
  wait: ChalkFunction;
  error: ChalkFunction;
  warn: ChalkFunction;
  ready: ChalkFunction;
  info: ChalkFunction;
  event: ChalkFunction;
  debug: ChalkFunction;
  black: ColorFunction;
  red: ColorFunction;
  green: ColorFunction;
  yellow: ColorFunction;
  blue: ColorFunction;
  magenta: ColorFunction;
  cyan: ColorFunction;
  white: ColorFunction;
  bgBlack: ColorFunction;
  bgRed: ColorFunction;
  bgGreen: ColorFunction;
  bgYellow: ColorFunction;
  bgBlue: ColorFunction;
  bgMagenta: ColorFunction;
  bgCyan: ColorFunction;
  bgWhite: ColorFunction;
}

if (!(window as any).chalk) {
  const _console: any = console;
  const color: ColorProps = {
    black: '#000000',
    red: '#FF0000',
    green: '#008000',
    yellow: '#FFFF00',
    blue: '#0000FF',
    magenta: '#FF00FF',
    cyan: '#00FFFF',
    white: '#FFFFFF',
  };
  // @ts-ignore
  const add = (...arr) => {
    let fi: any[] = [[]];
    for (let key = 0; key < arr.length; key++) {
      const [first, ...other] = arr[key];
      fi[0] += `${first.startsWith(' ') ? '' : ' '}${first}`;
      fi = fi.concat(other);
    }
    return fi;
  };

  const createlog =
    (util: string) =>
    (
      // @ts-ignore
      ...args
    ) => {
      const fun = _console[util] ? _console[util] : _console.log;
      (window as any).alitadebug && fun.apply(void 0, args);
    };
  const colorUtils = {
    bold: (str: string | string[]) => {
      if (typeof str === 'string' || typeof str === 'number') {
        return `${str};font-weight: bold;`;
      }
      for (let key = 1; key < str.length; key++) {
        str[key] += `;font-weight: bold;`;
      }
      return str;
    },
  } as any;
  const colorHash: ColorHashProps = {
    log: 'black',
    wait: 'cyan',
    error: 'red',
    warn: 'yellow',
    ready: 'green',
    info: 'blue',
    event: 'magenta',
    debug: 'gray',
  };
  const createChalk =
    (name: string) =>
    (
      // @ts-ignore
      ...str
    ) => {
      if (typeof str[0] === 'object') {
        createlog(name)(
          ...add(
            colorUtils.bold(
              colorUtils[colorHash[name]](`[${firstToUpperCase(name)}] `),
            ),
            ...str,
          ),
        );
        return;
      }
      let strArr = str;
      if (typeof str === 'string' || typeof str === 'number') {
        strArr = colorUtils[colorHash[name]](str);
      }
      createlog(name)(
        ...add(
          colorUtils.bold(
            colorUtils[colorHash[name]](`[${firstToUpperCase(name)}] `),
          ),
          strArr,
        ),
      );
    };
  const chalk = {} as any;
  Object.keys(colorHash).forEach((key) => {
    chalk[key] = createChalk(key);
  });
  const firstToUpperCase = (str: string) =>
    str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  Object.keys(color).forEach((key) => {
    colorUtils[key] = (str: string | string[]) => {
      if (typeof str === 'string' || typeof str === 'number') {
        return [`%c${str}`, `color:${color[key]}`];
      }
      for (let i = 1; i < str.length; i++) {
        str[i] += `;color:${color[key]}`;
      }
      return str;
    };
    colorUtils[`bg${firstToUpperCase(key)}`] = (str: string | string[]) => {
      if (typeof str === 'string' || typeof str === 'number') {
        return [
          `%c${str}`,
          `padding: 2px 4px; border-radius: 3px; color: ${
            key === 'white' ? '#000' : '#fff'
          }; font-weight: bold; background:${color[key]};`,
        ];
      }
      for (let i = 1; i < str.length; i++) {
        str[
          i
        ] += `;padding: 2px 4px; border-radius: 3px; font-weight: bold; background:${color[key]};`;
      }
      return str;
    };
  });
  (window as any).chalk = {
    add,
    ...chalk,
    ...colorUtils,
    hello: (title: string, version: string) =>
      createlog('log')(
        `%c ${title} %c V${version} `,
        'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
        'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
      ),
    image: (img: string) => {
      if (!img) return;
      createlog('log')(
        `%c `,
        `font-size: 1px;
padding: 100px 100px;
background-image: url(${img});
background-size: contain;
background-repeat: no-repeat;
color: transparent;`,
      );
    },
  };
}
chalk = (window as any).chalk;
export default chalk;
