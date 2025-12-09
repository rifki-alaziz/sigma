const API_URL = import.meta.env.VITE_API_URL as string;
const TOKEN = (import.meta.env.VITE_API_TOKEN as string).trim();

export const getData = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error(`Fetch error ${endpoint}: ${res.status}`);
      return null;
    }

    return res.json() as Promise<T>;
  } catch (err) {
    console.error("Network/Server error:", err);
    return null;
  }
};
