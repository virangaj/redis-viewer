import { RedisKey } from "@/models/models";
import React from "react";
import RedisKeyTable from "./redis-key-table";

interface RedisKeyViewProps {
  keys: RedisKey[];
  viewValue?: (key: string) => Promise<void>;
  deleteKey?: (key: string) => Promise<void>;
}

const RediKeyView = ({ keys }: RedisKeyViewProps) => {
  return (
    <div>
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div>
          <p>Results: {keys.length}</p>
        </div>
        <div>Last refresh</div>
      </div>
      <RedisKeyTable keys={keys} />
    </div>
  );
};

export default RediKeyView;
