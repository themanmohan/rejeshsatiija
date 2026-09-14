import { DOC_TYPES } from '../lib/docsApi';
import { useGetDocsByType } from './useGetDocsByType';

/** News page — docType=news, website name only (no tenant/auth) */
export function useGetNewsByType({ page = 1, limit = 50 } = {}) {
  return useGetDocsByType({
    docType: DOC_TYPES.news,
    page,
    limit,
    fallbackImage: '/news/images/news_rrs_spiritual.jpeg',
  });
}
