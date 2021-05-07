import { KeyBindingUtil, getDefaultKeyBinding } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

export const keyBindeFn = (e) => {
  // shift + enter
  if (e.keyCode === 13 && e.shiftKey) {
    return 'add-soft-new-line';
  }

  return getDefaultKeyBinding(e);
};

export default keyBindeFn;
