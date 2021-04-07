import { NextApiRequest, NextApiResponse } from 'next';

import apiHelper from '@/apiHelper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword, currentPage } = req.query;
  const response = await apiHelper.unsplash.getPhotos({
    keyword,
    currentPage: +currentPage ?? 1,
  });
  const { results, totalPages, totalImageNumber } = response;
  const filteredResult = results?.map((result) => ({
    thumbImageSrc: result.urls.thumb,
    regularImageSrc: result.urls.regular,
    userProfileLink: result.user.links.html,
    userName: result.user.name,
    imageHeight: result.height,
    imageWidth: result.width,
  }));

  res.json({ results: filteredResult, totalPages, totalImageNumber });
};
