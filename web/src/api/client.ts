// Every request goes to the Tripwise API, a separate backend service. Its base URL
// comes from VITE_API_URL at build time and defaults to the local backend.
export const API_BASE_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function apiRequest<T>(
  path: string,
  init: { method?: "GET" | "POST" | "DELETE"; body?: unknown } = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: init.method ?? "GET",
    headers: init.body === undefined ? undefined : { "Content-Type": "application/json" },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  if (!response.ok) {
    throw new Error(`${init.method ?? "GET"} ${path} failed: ${response.status}`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}
