import Unsplash, { createApi } from 'unsplash-js';

const unsplashAccessKey: string = process.env.UNSPLASH_ACCESS_KEY ?? '';

const unsplashApi = createApi({ accessKey: unsplashAccessKey });

export const getPhotos = async ({
  keyword,
  currentPage,
}: {
  keyword: string;
  currentPage: number;
}) => {
  const result = await unsplashApi.search.getPhotos({
    query: keyword,
    page: currentPage,
    perPage: 9,
  });
  const results = result.response?.results;
  const totalPages = result.response?.total_pages;
  const totalImageNumber = result.response?.total;

  return { results, totalPages, totalImageNumber };
};
