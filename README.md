defaults-deep-ts
================

[![Build Status](https://travis-ci.com/wix-incubator/defaults-deep-ts.svg?branch=master)](https://travis-ci.com/wix-incubator/defaults-deep-ts)

Similar to [\_.defaultsDeep](https://lodash.com/docs/#defaultsDeep) but with intelligent TypeScript typings
and with some differences:
* Doesn't try to merge arrays
* Doesn't allow multiple sources
* Treats `null` as an empty value

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
