import {expectType} from 'tsd';

import defaultsDeep from '../src';

// With default value
expectType<{a: string}>(defaultsDeep({} as {a: string}, {}));
expectType<{a: string}>(defaultsDeep({} as {a?: string}, {a: ''}));
expectType<{a: string}>(defaultsDeep({} as {a: string | null}, {a: ''}));
expectType<{a: string}>(defaultsDeep({} as {a?: string | null}, {a: ''}));

// Without default values
expectType<{a: string | undefined}>(defaultsDeep({} as {a?: string}, {}));
expectType<{a: string | null}>(defaultsDeep({} as {a: string | null}, {}));
expectType<{a: string | undefined | null}>(defaultsDeep({} as {a?: string | null}, {}));

// Chain without default values
expectType<{a: {b: string | undefined} | undefined}>(
  defaultsDeep({} as {a?: {b: string | undefined}}, {}),
);
expectType<{a: {b: string | null} | null}>(defaultsDeep({} as {a: {b: string | null} | null}, {}));
expectType<{a: {b?: string | null} | undefined | null}>(
  defaultsDeep({} as {a?: {b?: string | null} | null}, {}),
);

// Provided only first chain value
expectType<{a: {b: string | undefined}}>(defaultsDeep({} as {a?: {b?: string}}, {a: {}}));
expectType<{a: {b: string | null}}>(
  defaultsDeep({} as {a: {b: string | null} | null}, {a: {b: null}}),
);
expectType<{a: {b: string | undefined | null}}>(
  defaultsDeep({} as {a?: {b?: string | null} | null}, {a: {}}),
);

// Provided all chain values
expectType<{a: {b: string}}>(defaultsDeep({} as {a?: {b?: string}}, {a: {b: ''}}));
expectType<{a: {b: string}}>(defaultsDeep({} as {a: {b: string | null} | null}, {a: {b: ''}}));
expectType<{a: {b: string}}>(defaultsDeep({} as {a?: {b?: string | null} | null}, {a: {b: ''}}));
expectType<{a: {b: {c: number}}}>(defaultsDeep({} as {a?: {b: {c: number}}}, {a: {b: {c: 1}}}));

// Arrays
expectType<{a: {b: string}[] | undefined}>(defaultsDeep({} as {a?: {b: string}[]}, {}));
expectType<{a: {b: string}[]}>(defaultsDeep({} as {a?: {b: string}[]}, {a: []}));
expectType<{a: {b: string[] | undefined}}>(defaultsDeep({} as {a?: {b?: string[]}}, {a: {}}));
expectType<{a: {b: string[]}}>(defaultsDeep({} as {a?: {b: string[]}}, {a: {b: ['']}}));

// Doesn't work unfortunately:
// expectType<{a: 1}>(defaultsDeep({} as {a?: 1}, {a: 1}));
