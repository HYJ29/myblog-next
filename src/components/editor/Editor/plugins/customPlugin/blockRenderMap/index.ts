import { DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';

import {
  BlockQuote,
  Title,
  SubTitle,
  SubjectTitle,
  Paragraph,
} from '@/components/editor/Editor/blocks/customBlocks';
const customBlockRenderMap = Immutable.Map({
  'header-three': { element: Title },
  'header-four': { element: SubTitle },
  'header-five': { element: SubjectTitle },
  blockquote: { element: BlockQuote },
  unstyled: { element: Paragraph },
});

// Just go with default renderingMap except 'unstyled'.
export default DefaultDraftBlockRenderMap.merge(customBlockRenderMap);
