const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const CART_KEY = 'storefront_cart_id';
const ACCESS_KEY = 'storefront_access_token';
const REFRESH_KEY = 'storefront_refresh_token';

function getJsonHeaders(token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `JWT ${token}`;
  return headers;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      message = data.detail || JSON.stringify(data);
    } catch (_error) {
      // Keep fallback message when response isn't JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function saveTokens(access, refresh) {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export async function login(username, password) {
  return request('/auth/jwt/create/', {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify({ username, password }),
  });
}

export async function register(payload) {
  return request('/auth/users/', {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function getCurrentUser() {
  return request('/auth/users/me/', {
    headers: getJsonHeaders(getAccessToken()),
  });
}

export async function listProducts(page = 1, search = '') {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (search.trim()) params.set('search', search.trim());
  return request(`/store/products/?${params.toString()}`);
}

export async function getProduct(id) {
  return request(`/store/products/${id}/`);
}

export async function listCollections() {
  return request('/store/collections/');
}

export async function createCart() {
  return request('/store/carts/', {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify({}),
  });
}

export function getStoredCartId() {
  return localStorage.getItem(CART_KEY);
}

export function setStoredCartId(cartId) {
  localStorage.setItem(CART_KEY, cartId);
}

export async function ensureCart() {
  let cartId = getStoredCartId();
  if (!cartId) {
    const created = await createCart();
    cartId = created.id;
    setStoredCartId(cartId);
  }
  return cartId;
}

export async function getCart() {
  const cartId = await ensureCart();
  return request(`/store/carts/${cartId}/`);
}

export async function addToCart(productId, quantity = 1) {
  const cartId = await ensureCart();
  return request(`/store/carts/${cartId}/items/`, {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}

export async function updateCartItem(itemId, quantity) {
  const cartId = await ensureCart();
  return request(`/store/carts/${cartId}/items/${itemId}/`, {
    method: 'PATCH',
    headers: getJsonHeaders(),
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(itemId) {
  const cartId = await ensureCart();
  return request(`/store/carts/${cartId}/items/${itemId}/`, {
    method: 'DELETE',
    headers: getJsonHeaders(),
  });
}

export async function createOrderFromCart() {
  const cartId = await ensureCart();
  return request('/store/orders/', {
    method: 'POST',
    headers: getJsonHeaders(getAccessToken()),
    body: JSON.stringify({ cart_id: cartId }),
  });
}
