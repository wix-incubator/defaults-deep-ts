import defaultsDeep from './index';

describe('defaultsDeep', () => {
    it('makes sure only single operation is made', () => {
      expect(defaultsDeep({}, {a: {}})).toEqual({a: {}});
    });
});

