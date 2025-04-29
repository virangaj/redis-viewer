export interface RedisKey {
  key: string;
  type: string;
  ttl: number;
  size: number;
  memoryFormatted: string;
}

export interface KeyDetails {
  key: string;
  type: string;
  value: unknown;
  ttl: number;
}
