"use client";
interface KeyDetails {
  key: string;
  type: string;
  value: unknown;
  ttl: number;
}

interface RedisKeyDetailsProps {
  keyDetails: KeyDetails;
}

export default function RedisKeyDetails({ keyDetails }: RedisKeyDetailsProps) {
  return (
    <div className="border p-4 mb-4 bg-gray-100 rounded">
      <h2 className="text-2xl mb-2">Key: {keyDetails.key}</h2>
      <p>
        <strong>Type:</strong> {keyDetails.type}
      </p>
      <p>
        <strong>TTL:</strong> {keyDetails.ttl}
      </p>
      <pre className="bg-white p-2 rounded mt-2 overflow-auto">
        {JSON.stringify(keyDetails.value, null, 2)}
      </pre>
    </div>
  );
}
