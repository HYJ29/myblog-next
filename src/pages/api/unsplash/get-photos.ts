import { NextApiRequest, NextApiResponse } from 'next';

import { unsplash } from '@/apiHelper';
import { UnsplashImageInfo } from '@/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword, currentPage } = req.query;
  const response = await unsplash.getPhotos({
    keyword,
    currentPage: +currentPage ?? 1,
  });
  const { results, totalPages, totalImageNumber } = response;
  const filteredResult: UnsplashImageInfo[] | undefined = results?.map(
    (result) => ({
      thumbImageSrc: result.urls.thumb,
      regularImageSrc: result.urls.regular,
      userProfileLink: result.user.links.html,
      userName: result.user.name,
      imageHeight: result.height,
      imageWidth: result.width,
    })
  );

  res.json({ results: filteredResult, totalPages, totalImageNumber });
};
