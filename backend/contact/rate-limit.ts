type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const buckets = new Map<string, RateLimitBucket>();

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < 200) {
    return;
  }

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkContactRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const nextBucket = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };

    buckets.set(key, nextBucket);

    return {
      allowed: true,
      limit: MAX_ATTEMPTS,
      remaining: MAX_ATTEMPTS - 1,
      resetAt: nextBucket.resetAt,
      retryAfterSeconds: 0,
    };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      limit: MAX_ATTEMPTS,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((current.resetAt - now) / 1000),
      ),
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: true,
    limit: MAX_ATTEMPTS,
    remaining: MAX_ATTEMPTS - current.count,
    resetAt: current.resetAt,
    retryAfterSeconds: 0,
  };
}
