import { AnsichtsartPopup } from "./ansichtsartPopup";


describe('AnsichtsartPopup', () => {
  it('should have the correct values', () => {
    expect(AnsichtsartPopup.SAVE).toEqual('EXTRAKTION');
    expect(AnsichtsartPopup.STANDARD).toEqual('BILDANSICHT');
  });

  it('should have the correct number of values', () => {
    expect(Object.keys(AnsichtsartPopup).length).toEqual(2);
  });
});
