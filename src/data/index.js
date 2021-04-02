import posts from './posts';
import tags from './tags';

import { parseEditorState } from './utils';

export const getAllTags = () => tags;

export const getAllPosts = () => posts;
export const getPostById = (id) => posts.find((post) => post.id == id);
