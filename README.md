defaults-deep-ts
================

Just like [\_.defaultsDeep](https://lodash.com/docs/#defaultsDeep) but with intelligent TypeScript typings.

Install
-------

```
npm install defaults-deep-ts
```

Usage
-----

```ts
// let's say you have some object where some fields are optional:
type SomeData = {
  order?: {
    id?: string
  };
}
const data: SomeData = {};

// You have to check for for undefined fields using `!` or `?`:
const id: string = data.order!.id!;

// Let's provide some defaults:
import defaultsDeep from 'defaults-deep-ts'
const dataWithDefaults = defaultsDeep(data, {order: {id: ''}});

// Now `order` and `id` are not optional bacause you provided defaults for them:
const id: string = dataWithDefaults.order.id;
```
