import { Type } from './type';

describe('Type', () => {
  it('should have defined values', () => {
    expect(Type.RECEIVED).toBeDefined();
    expect(Type.DELIVERED).toBeDefined();
  });
});
