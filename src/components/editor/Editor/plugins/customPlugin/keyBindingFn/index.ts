import { KeyBindingUtil, getDefaultKeyBinding } from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

export default (e) => {
  // shift + enter
  if (e.keyCode === 13 && e.shiftKey) {
    console.log('soft line');
    return 'add-soft-new-line';
  }

  return getDefaultKeyBinding(e);
};
