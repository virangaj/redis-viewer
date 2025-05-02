import {
  IRedisConnections,
  ISingleRedisKeyData,
  RedisKey,
} from "@/types/types";

const fetchKeysApi = async (): Promise<RedisKey[]> => {
  console.log("Calling get apis function");
  const res = await fetch("/api/keys");

  if (!res.ok) throw new Error("Failed to fetch keys");

  const json = await res.json();
  return json.data as RedisKey[];
};

const fetchConnectionsApi = async (): Promise<IRedisConnections[]> => {
  const response = await fetch("/api/check-redis");
  const data = await response.json();
  return data as IRedisConnections[];
};

const fetchSingleRedisValueApi = async (
  key: string
): Promise<ISingleRedisKeyData> => {
  const response = await fetch(`/api/key/${key}`);
  const data = await response.json();
  return data;
};

export { fetchConnectionsApi, fetchKeysApi, fetchSingleRedisValueApi };
