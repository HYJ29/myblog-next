import API, { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

import { tagByTagName } from '@/graphql/queries';

export const getAllTags = async () => {
  const tagRes = await API.graphql({
    query: tagByTagName,
    variables: { baseType: 'Tag', sortDirection: 'ASC' },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
  });

  const tags = tagRes.data.tagByTagName.items;

  return tags;
};
