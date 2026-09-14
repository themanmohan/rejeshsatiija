import axios from 'axios';
import { useEffect, useState } from 'react';
import { OTP_API_URL } from '../lib/env';

export const useGetTenantDetails = (externalToken) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${OTP_API_URL}/api/tenant/details`, {
          withCredentials: true,
        });

        console.log('tenant response', response);

        if (response.status === 200) {
          setData(response?.data?.tenant);
        }
      } catch (err) {
        console.log('tenant error', err);
      }
    };

    fetchDetails();
  }, [externalToken]);

  return { data };
};
