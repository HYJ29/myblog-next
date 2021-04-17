import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  DraftDecorator,
} from 'draft-js';

import { Link, HashTag } from '@/components/editor/Editor/blocks/inlineBlocks';

const findLinkEntity = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  console.log('findLInk');
  contentBlock.findEntityRanges((character) => {
    const characterEntityKey = character.getEntity();
    console.log(`charactreEntityKey`, characterEntityKey);
    return (
      characterEntityKey !== null &&
      contentState.getEntity(characterEntityKey).getType() === 'LINK'
    );
  }, callback);
};

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HASHTAG_REGEX = /#[가-힣\w\u0590-\u05ff]+/g;
function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

const compositeDecorator = new CompositeDecorator([
  { strategy: hashtagStrategy, component: HashTag },
  { strategy: findLinkEntity, component: Link },
]);

export default compositeDecorator;
