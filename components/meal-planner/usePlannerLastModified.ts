import { useEffect, useState, useCallback } from "react"

export function usePlannerLastModified() {
  const [lastModified, setLastModified] = useState<Date | null>(null)

  const fetchLastModified = useCallback(() => {
    fetch("/api/planner-meta")
      .then(res => res.json())
      .then(data => setLastModified(data.lastModified ? new Date(data.lastModified) : null))
      .catch(() => setLastModified(null))
  }, [])

  useEffect(() => {
    fetchLastModified();
    window.addEventListener("focus", fetchLastModified);
    return () => window.removeEventListener("focus", fetchLastModified);
  }, [fetchLastModified]);

  return [lastModified, fetchLastModified] as const;
}
