import { useState, useCallback } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultCode, setResultCode] = useState(null); // ✅ اضافه شد

  const refetch = useCallback(
    async (customOptions = {}) => {
      if (!url) return;
      setLoading(true);
      setError(null);
      setResultCode(null);

      try {
        const res = await fetch(url, { ...options, ...customOptions });
        const json = await res.json();

        // فرض می‌کنیم سرور یه فیلد resultCode برمی‌گردونه
        setResultCode(json.resultCode ?? null);

        if (json.resultCode !== 200) {
          // اگر resultCode درست نبود، خطا بزنیم
          throw new Error(json.message || "خطا در پاسخ سرور");
        }

        setData(json.data ?? json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [url, JSON.stringify(options)]
  );

  return { data, loading, error, resultCode, refetch }; // ✅ برگردوندن resultCode
}
