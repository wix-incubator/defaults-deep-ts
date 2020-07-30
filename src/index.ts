import lodashDefaultsDeep from 'lodash.defaultsdeep';

const UndefSymbol = Symbol();

type Undef = typeof UndefSymbol;
type NonUndef<T> = T extends Undef ? never : T;

type Converted<T> = {
  [P in keyof T]:
    Undef extends T[P] ? NonUndef<T[P]> | undefined :
    T[P]
};

type DefaultsDeep<T, U extends Partial<T>> = {
  [P in keyof T]-?:
    U[P] extends Date ? T[P] :
    U[P] extends Partial<T[P]> ?
      null extends U[P] ?
        undefined extends U[P] ? Converted<DefaultsDeep<T[P], NonNullable<U[P]>>> | Undef :
        Converted<DefaultsDeep<T[P], NonNullable<U[P]>>> :
      undefined extends U[P] ? Converted<NonNullable<DefaultsDeep<T[P], NonNullable<U[P]>>>> | Undef :
      Converted<NonNullable<DefaultsDeep<T[P], NonNullable<U[P]>>>> :
    undefined extends U[P] ?
      undefined extends T[P] ? T[P] | Undef : T[P] :
    T[P]
};

export default <T, U extends Partial<T>>(object: T, defaults: U): Converted<DefaultsDeep<T, U>> =>
  lodashDefaultsDeep(object, defaults);
