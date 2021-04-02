import posts from './posts';
import tags from './tags';

export const getAllTags = () => tags;

export const getAllPosts = () => posts;
export const getPostById = (id) => posts.find((post) => post.id == id);

const post = getPostById(8);
console.log(`post`, post);
