import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);

      // If response was returned with success = false and error message, show toast if relevant
      if (response && response.success === false && response.error) {
        toast.error(response.error);
      }
    } catch (error) {
      setError(error);
      const isRedactedError =
        error?.message?.includes("Server Components render") ||
        error?.message?.includes("omitted in production");
      const userMessage = isRedactedError
        ? "Unable to complete request. Please verify backend service and connection."
        : error?.message || "An unexpected error occurred.";
      toast.error(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
