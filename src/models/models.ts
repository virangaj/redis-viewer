export interface RedisKey {
  key: string;
  type: string;
  ttl: number;
}

export interface KeyDetails {
  key: string;
  type: string;
  value: unknown;
  ttl: number;
}
