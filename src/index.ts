import lodashDefaultsDeep from 'lodash.defaultsdeep';

const UndefSymbol = Symbol();

type Undef = typeof UndefSymbol;
type NonUndef<T> = T extends Undef ? never : T;

/* tslint:disable prettier */
type Converted<T> = {
  [P in keyof T]:
    Undef extends T[P] ? NonUndef<T[P]> | undefined :
    T[P]
};

type DefaultsDeep<T, U extends Partial<T>> = Converted<{
  [P in keyof T]-?:
    U[P] extends Partial<T[P]> ?
      null extends U[P] ? DefaultsDeep<T[P], U[P]> :
      NonNullable<DefaultsDeep<T[P], U[P]>> :
    T[P] extends object ? T[P] | null :
    undefined extends T[P] ? T[P] | Undef :
    T[P]
}>;
/* tslint:enable prettier */

export default <T, U>(object: T, defaults: U): DefaultsDeep<T, U> =>
  lodashDefaultsDeep(object, defaults);
