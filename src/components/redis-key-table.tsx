"use client";
import React from "react";

interface RedisKey {
  key: string;
  type: string;
  ttl: number;
}

interface Props {
  keys: RedisKey[];
  viewValue: (key: string) => void;
  deleteKey: (key: string) => void;
}

const RedisKeyTable: React.FC<Props> = ({ keys, viewValue, deleteKey }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Key</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">TTL</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {keys.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-4">
              No keys found
            </td>
          </tr>
        ) : (
          keys.map(({ key, type, ttl }) => (
            <tr key={key}>
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">{type}</td>
              <td className="border px-4 py-2">{ttl}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => viewValue(key)}
                  className="bg-blue-500 text-white px-4 py-1 mr-2 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => deleteKey(key)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default RedisKeyTable;
