import { DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';

const customBlockRenderMap = Immutable.Map({
 h3:{},
 h4:{},
 h5:{},
 blockquote:{},
  
});

// Just go with default renderingMap except 'unstyled'.
export default DefaultDraftBlockRenderMap.merge(customBlockRenderMap);
