import { RedisKey } from "@/models/models";
import { RotateCw } from "lucide-react";
import RedisKeyTable from "./redis-key-table";
import { useEffect, useState } from "react";

interface RedisKeyViewProps {
  keys: RedisKey[];
  viewValue: (key: string) => Promise<void>;
  deleteKey: (key: string) => Promise<void>;
  lastRefresh: Date;
  fetchKeys: () => void;
}

const RediKeyView = ({
  keys,
  lastRefresh,
  viewValue,
  deleteKey,
  fetchKeys
}: RedisKeyViewProps) => {
  const [duration, setDuration] = useState<{
    value: number;
    unit: "mins" | "h";
  }>({
    value: 0,
    unit: "mins",
  });

  useEffect(() => {
    function updateDuration() {
      const now = new Date();
      const diffMs = now.getTime() - new Date(lastRefresh).getTime();
      const diffMinutes = Math.floor(diffMs / 60000);

      if (diffMinutes >= 60) {
        const diffHours = Math.floor(diffMinutes / 60);
        setDuration({ value: diffHours, unit: "h" });
      } else {
        setDuration({ value: diffMinutes, unit: "mins" });
      }
    }

    updateDuration();
    const interval = setInterval(updateDuration, 60000);

    return () => clearInterval(interval);
  }, [lastRefresh]);

  return (
    <>
      <div className="flex items-center justify-between font-color-gray text-sm w-[100%]">
        <div>
          <p>Results: {keys.length}</p>
        </div>
        <div className="flex items-center">
          <p>
            Last refresh: {duration.value} {duration.unit}
          </p>
          <RotateCw
            size={16}
            className="ml-2 cursor-pointer"
            onClick={fetchKeys}
          />
        </div>
      </div>
      <RedisKeyTable keys={keys} viewValue={viewValue} deleteKey={deleteKey} />
    </>
  );
};

export default RediKeyView;
