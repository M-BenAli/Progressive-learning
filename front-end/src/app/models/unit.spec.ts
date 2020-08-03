import {Unit} from './unit';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Unit("Understanding DNA", false, "", 1, [])).toBeTruthy();
  });
});
