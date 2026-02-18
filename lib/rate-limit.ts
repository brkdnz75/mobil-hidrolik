const requestMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, maxRequests = 6, windowMs = 60_000) {
  const now = Date.now();
  const existing = requestMap.get(key);

  if (!existing || existing.resetAt < now) {
    requestMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= maxRequests) {
    return false;
  }

  existing.count += 1;
  requestMap.set(key, existing);
  return true;
}
