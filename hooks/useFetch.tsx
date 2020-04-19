import * as React from "react";

export function useFetch(
  url: string,
  options: { [k: string]: any } = { method: "GET" }
) {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const res = await fetch(url, options);
        const json = await res.json();

        setResponse(json);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { response, error, isLoading };
}
