import defaultsDeep from './index';

const noop = () => undefined;

describe('defaultsDeep', () => {
  it('provides defaults', () => {
    const object = {};
    const source = {a: {}};
    const actual = {a: {}};

    expect(defaultsDeep(object, source)).toEqual(actual);
  });

  it('doesn\'t override existing props', () => {
    const object = {a: {b: 1}};
    const source = {a: {} as any};
    const actual = {a: {b: 1}};

    expect(defaultsDeep(object, source)).toEqual(actual);
  });

  it('extends props', () => {
    const object = {a: {a: 1}};
    const source = {a: {a: 2, b: 2}};
    const actual = {a: {a: 1, b: 2}};

    expect(defaultsDeep(object, source)).toEqual(actual);
  });

  it('dosn\'t override arrays', () => {
    const object = {a: []};
    const source = {a: [2] as any};
    const actual = {a: []};

    expect(defaultsDeep(object, source)).toEqual(actual);
  });

  it('should deep assign source properties if missing on `object`', function() {
    var object = { 'a': { 'b': 2 }, 'd': 4 },
        source = { 'a': { 'b': 3, 'c': 3 }, 'e': 5 },
        expected = { 'a': { 'b': 2, 'c': 3 }, 'd': 4, 'e': 5 };

    expect(defaultsDeep(object, source)).toEqual(expected);
  });

  it('should overwrite `null` values', function() {
    const object = { 'a': { 'b': null } };
    const source: any = { 'a': { 'b': 2 } };
    const actual: any = defaultsDeep(object, source);

    expect(actual.a.b).toBe(2);
  });

  it('should not overwrite regexp values', function() {
    const object = { 'a': { 'b': /x/ } };
    const source = { 'a': { 'b': /y/ } };
    const actual = defaultsDeep(object, source);

    expect(actual.a.b).toEqual(/x/);
  });

  it('should not convert function properties to objects', function() {
    let actual: any = defaultsDeep({}, { 'a': noop });
    expect(actual.a).toEqual(noop);

    actual = defaultsDeep({}, { 'a': { 'b': noop } });
    expect(actual.a.b).toEqual(noop);
  });

  it('should overwrite `undefined` values', function() {
    const object = { 'a': { 'b': undefined } };
    const source: any = { 'a': { 'b': 2 } };
    const actual: any = defaultsDeep(object, source);

    expect(actual.a.b).toEqual(2);
  });

  it('should assign `undefined` values', function() {
    const source = { 'a': undefined, 'b': { 'c': undefined, 'd': 1 } };
    const expected = { 'a': undefined, 'b': { 'c': undefined, 'd': 1 } };
    const actual = defaultsDeep({}, source);

    expect(actual).toEqual(expected);
  });

  it.skip('should merge sources containing circular references', function() {
    const object = {
      'foo': { 'b': { 'c': { 'd': {} } } },
      'bar': { 'a': 2 }
    };

    const source: any = {
      'foo': { 'b': { 'c': { 'd': {} } } },
      'bar': {}
    };

    object.foo.b.c.d = object;
    source.foo.b.c.d = source;
    source.bar.b = source.foo.b;

    const actual: any = defaultsDeep(object, source);

    expect(actual.bar.b).toEqual(actual.foo.b);
    expect(actual.foo.b.c.d).toEqual(actual.foo.b.c.d.foo.b.c.d);
  });

  it('should not attempt a merge of a string into an array', function() {
    const actual = defaultsDeep({ 'a': ['abc'] }, { 'a': 'abc' as any });
    expect(actual.a).toEqual(['abc']);
  });
});

