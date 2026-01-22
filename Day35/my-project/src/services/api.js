
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3001";
  }
  return "/db.json";
};

// Cache for db.json data
let dbCache = null;

const fetchDbData = async () => {
  if (dbCache) return dbCache;
  const res = await fetch("/db.json");
  if (!res.ok) throw new Error("Failed to fetch db.json");
  dbCache = await res.json();
  return dbCache;
};

export const getRestaurants = async () => {
  try {
    const res = await fetch(`${getApiUrl()}/restaurants`);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  } catch {
    // Fallback to db.json
    const data = await fetchDbData();
    return data.restaurants || [];
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${getApiUrl()}/categories`);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  } catch {
    // Fallback to db.json
    const data = await fetchDbData();
    return data.categories || [];
  }
};

export const getDealsByCategory = async (category) => {
  const query = encodeURIComponent(category);

  try {
    const res = await fetch(`${getApiUrl()}/deals?category=${query}`);
    if (!res.ok) throw new Error("Fetch deals failed");
    return res.json();
  } catch {
    // Fallback to db.json
    const data = await fetchDbData();
    return (data.deals || []).filter((deal) => deal.category === category);
  }
};

export const fetchFaqs = async () => {
  try {
    const res = await fetch(`${getApiUrl()}/faqs`);
    return res.json();
  } catch {
    // Fallback to db.json
    const data = await fetchDbData();
    return data.faqs || [];
  }
};

export const fetchSteps = async (type) => {
  try {
    const res = await fetch(`${getApiUrl()}/steps`);
    const data = await res.json();
    return data[type];
  } catch {
    // Fallback to db.json
    const data = await fetchDbData();
    return data.steps?.[type] || [];
  }
};

export const fetchStats = async () => {
  try {
    const res = await fetch(`${getApiUrl()}/stats`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  } catch {
    // Fallback to db.json
    const data = await fetchDbData();
    return data.stats || {};
  }
};

export const getAuth = async (data) => {
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Email hoặc Password không đúng");
  }

  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Token không hợp lệ");
  }

  return res.json();
};
