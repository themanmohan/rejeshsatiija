import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  DOC_TYPE_LABELS,
  DOC_TYPES,
  filterDocsByType,
  getDocsByTypeApiUrl,
  mapDocToDetail,
  mapDocToListItem,
  normalizeDocsResponse,
  sortDocsByDate,
  WEBSITE_CENTER,
} from '../lib/docsApi';
// import { TENANT_ID } from '../lib/env';

/**
 * Fetch public site content by website name + docType only.
 * No tenant-id, auth token, or other authorization headers.
 */
export function useGetDocsByType({
  docType = DOC_TYPES.blog,
  page = 1,
  limit = 50,
  fallbackImage = '/blogs/images/blog-01.png',
  websiteName = WEBSITE_CENTER,
} = {}) {
  const [items, setItems] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchDocs = async () => {
      setLoading(true);
      setError(null);

      const fallbackTag = DOC_TYPE_LABELS[docType] || 'Blog';
      const url = getDocsByTypeApiUrl(docType, page, limit, websiteName);

      try {
        console.log(`[${docType}] public API request:`, {
          url,
          websiteName,
          docType,
          page,
          limit,
        });

        // Public call by website name + docType — no auth / tenant headers
        // const headers = {};
        // if (TENANT_ID) {
        //   headers['x-tenant-id'] = TENANT_ID;
        // }
        // const response = await axios.get(url, { headers });
        const response = await axios.get(url);

        if (cancelled) return;

        console.log(`[${docType}] raw API response.data:`, response.data);

        const normalized = filterDocsByType(
          sortDocsByDate(normalizeDocsResponse(response.data)),
          docType
        );

        console.log(`[${docType}] normalized docs count:`, normalized.length);

        const mappedDetails = normalized
          .map((doc) => mapDocToDetail(doc, { fallbackImage, fallbackTag }))
          .filter((item) => item.slug);
        const mappedList = normalized
          .map((doc) => mapDocToListItem(doc, { fallbackImage, fallbackTag }))
          .filter((item) => item.slug);

        setDocs(mappedDetails);
        setItems(mappedList);
      } catch (err) {
        if (cancelled) return;
        const apiMessage = err?.response?.data?.message;
        console.error(`Failed to load ${docType}:`, err);
        setError(apiMessage || `Failed to load ${docType}. Please try again later.`);
        setItems([]);
        setDocs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDocs();

    return () => {
      cancelled = true;
    };
  }, [docType, page, limit, fallbackImage, websiteName]);

  return { items, docs, loading, error };
}
