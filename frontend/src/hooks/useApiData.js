import { useEffect, useState } from 'react';

const useApiData = (fetcher, fallback, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetcher()
      .then((res) => {
        if (!active) return;
        const payload = res?.data?.data;
        const hasData = Array.isArray(payload) ? payload.length > 0 : !!payload;
        setData(hasData ? payload : fallback);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setData(fallback);
        setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data: data ?? fallback, loading, error };
};

export default useApiData;
