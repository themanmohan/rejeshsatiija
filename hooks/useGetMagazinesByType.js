import { DOC_TYPES } from '../lib/docsApi';
import { useGetDocsByType } from './useGetDocsByType';

/** Magazines page — docType=magazines, website name only (no tenant/auth) */
export function useGetMagazinesByType({ page = 1, limit = 50 } = {}) {
  return useGetDocsByType({
    docType: DOC_TYPES.magazines,
    page,
    limit,
    fallbackImage: '/magazines/images/mag_entrepreneur_nri2026_cover.jpg',
  });
}
