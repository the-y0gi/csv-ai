const cache = new Map();

const MAX_CACHE_SIZE = 200;
const TTL_MS = 10 * 60 * 1000; // 10 minutes

export const generateCacheKey = (input) => {
  return JSON.stringify(input);
};

export const getFromCache = (key) => {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.value;
};

export const setToCache = (key, value) => {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }

  cache.set(key, {
    value,
    expiry: Date.now() + TTL_MS,
  });
};
