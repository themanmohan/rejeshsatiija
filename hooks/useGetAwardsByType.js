import { DOC_TYPES } from '../lib/docsApi';
import { useGetDocsByType } from './useGetDocsByType';

/** Awards page — docType=awards, website name only (no tenant/auth) */
export function useGetAwardsByType({ page = 1, limit = 50 } = {}) {
  return useGetDocsByType({
    docType: DOC_TYPES.awards,
    page,
    limit,
    fallbackImage: '/awards/images/award-taga-lifetime-2024.jpg',
  });
}
