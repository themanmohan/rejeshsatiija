import { DOC_TYPES } from '../lib/docsApi';
import { useGetDocsByType } from './useGetDocsByType';

/** Blogs page — docType=blog, website name only (no tenant/auth) */
export function useGetBlogsByType({ page = 1, limit = 50 } = {}) {
  return useGetDocsByType({
    docType: DOC_TYPES.blog,
    page,
    limit,
    fallbackImage: '/blogs/images/blog-01.png',
  });
}
