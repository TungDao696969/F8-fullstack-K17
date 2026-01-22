export const getRestaurants = async () => {
  const res = await fetch("http://localhost:3001/restaurants");
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch("http://localhost:3001/categories");
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const getDealsByCategory = async (category) => {
  const query = encodeURIComponent(category);

  const res = await fetch(`http://localhost:3001/deals?category=${query}`);

  if (!res.ok) throw new Error("Fetch deals failed");

  return res.json();
};

export const fetchFaqs = async () => {
  const res = await fetch("http://localhost:3001/faqs");
  return res.json();
};

export const fetchSteps = async (type) => {
  const res = await fetch("http://localhost:3001/steps");
  const data = await res.json();
  return data[type];
};

export const fetchStats = async () => {
const res = await fetch("http://localhost:3001/stats");
if (!res.ok) throw new Error("Failed to fetch stats");
return res.json();
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
}

export const getProfile = async (token) => {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/auth/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Token không hợp lệ");
  }

  return res.json();
};