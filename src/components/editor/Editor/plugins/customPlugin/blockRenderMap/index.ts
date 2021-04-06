import { DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';

const customBlockRenderMap = Immutable.Map({
  // unstyled: {
  //   element: 'p',
  // },
});

// Just go with default renderingMap except 'unstyled'.
export default DefaultDraftBlockRenderMap.merge(customBlockRenderMap);
