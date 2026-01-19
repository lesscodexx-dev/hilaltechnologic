export type ApiError = {
  message: string;
  status?: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  content?: string;
  price: number;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
};

export type Portfolio = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
};

export type OrderSummary = {
  order_number: string;
  status: string;
  total: number;
};

export type OrderDetail = OrderSummary & {
  delivery?: { token: string } | null;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const message = await response.text();
    throw { message: message || "Request failed", status: response.status } as ApiError;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export async function bootstrapCsrf() {
  await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

export const api = {
  getProducts: () => apiFetch<{ data: Product[] }>("/api/v1/products"),
  getProduct: (slug: string) => apiFetch<{ data: Product }>(`/api/v1/products/${slug}`),
  getPosts: () => apiFetch<{ data: Post[] }>("/api/v1/posts"),
  getPost: (slug: string) => apiFetch<{ data: Post }>(`/api/v1/posts/${slug}`),
  getPortfolios: () => apiFetch<{ data: Portfolio[] }>("/api/v1/portfolios"),
  getPortfolio: (slug: string) => apiFetch<{ data: Portfolio }>(`/api/v1/portfolios/${slug}`),
  register: (payload: { name: string; email: string; password: string; password_confirmation: string }) =>
    apiFetch("/api/v1/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    apiFetch("/api/v1/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => apiFetch("/api/v1/auth/logout", { method: "POST" }),
  me: () => apiFetch("/api/v1/auth/me"),
  createOrder: (payload: { items: Array<{ product_id: number; quantity: number }>; customer?: { name?: string; email?: string } }) =>
    apiFetch<{ data: { order_number: string } }>("/api/v1/orders", { method: "POST", body: JSON.stringify(payload) }),
  listOrders: () => apiFetch<{ data: OrderSummary[] }>("/api/v1/orders"),
  getOrder: (orderNumber: string) => apiFetch<{ data: OrderDetail }>(`/api/v1/orders/${orderNumber}`),
  payOrder: (orderNumber: string, payload: { method: "midtrans" | "manual" }) =>
    apiFetch(`/api/v1/orders/${orderNumber}/pay`, { method: "POST", body: JSON.stringify(payload) }),
  uploadManualProof: (orderNumber: string, file: File) => {
    const data = new FormData();
    data.append("proof", file);
    return fetch(`${baseUrl}/api/v1/orders/${orderNumber}/manual-proof`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
  },
};
