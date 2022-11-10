type Undef = {'@Undefined$ymbol': true};
type Undef2 = {'@Undefined2$ymbol': true};
type NonUndef<T> = T extends Undef | Undef2 ? never : T;

// Same NonNullable which suddenly stopped working in some cases (and some tests failed)
type NonNil<T> = T extends null | undefined ? never : T;

type Converted<T> = {
  [P in keyof T]:
    Undef & Undef2 extends T[P] ? NonUndef<T[P]> | undefined :
    T[P]
};

type NonTraversable = string | number | bigint | boolean | symbol | Date;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U> ?
    Array<DeepPartial<U>> :
    T[P] extends ReadonlyArray<infer U> ?
    ReadonlyArray<DeepPartial<U>> :
    DeepPartial<T[P]>
};

type DefaultsDeep<T, U extends DeepPartial<T>> = {
  [P in keyof T]-?:
    NonNil<T[P]> extends NonTraversable ?
      null extends U[P] ?
        undefined extends U[P] ?
          undefined extends T[P] ? T[P] | Undef : T[P] :
        T[P] :
      undefined extends U[P] ? NonNil<T[P]> | Undef : NonNil<T[P]> :
    U[P] extends DeepPartial<T[P]> ?
      null extends U[P] ?
        undefined extends U[P] ? Converted<DefaultsDeep<T[P], NonNil<U[P]>>> | Undef2 :
        Converted<DefaultsDeep<T[P], NonNil<U[P]>>> :
      undefined extends U[P] ? Converted<NonNil<DefaultsDeep<T[P], NonNil<U[P]>>>> | Undef :
      Converted<NonNil<DefaultsDeep<T[P], NonNil<U[P]>>>> :
    undefined extends U[P] ?
      undefined extends T[P] ? T[P] | Undef : T[P] :
    T[P]
};

const isPlainObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]';
const isNil = (v: any) => v === null || v === undefined;

const defaultsDeep = <T, U extends DeepPartial<T>>(object: T, defaults: U): Converted<DefaultsDeep<T, U>> => {
  const result: any = object;
  for (let p in defaults) {
    if (!Object.prototype.hasOwnProperty.call(defaults, p)) {
      continue;
    }
    if (isNil(result[p]) && !isNil(defaults[p])) {
      result[p] = defaults[p];
    }
  }
  for (let p in result) {
    const defaultValue = (defaults as any)[p];
    if (isPlainObject(result[p]) && isPlainObject(defaultValue)) {
      result[p] = defaultsDeep(result[p], defaultValue);
    }
  }
  return result;
};

export default defaultsDeep;
