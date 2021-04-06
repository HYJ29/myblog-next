import axios from 'axios';

export const getPhotos = async ({
  keyword,
  currentPage,
}: {
  keyword: string;
  currentPage?: number;
}) => {
  const response = await axios(
    `/api/unsplash/get-photos?keyword=${keyword}&currentPage=${
      currentPage ?? 1
    }`
  );
  return response.data;
};
