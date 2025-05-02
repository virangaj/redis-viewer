import { fetchSingleRedisValueApi } from "@/service/api";
import { ISingleRedisKeyData } from "@/types/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import ViewSingleKeyData from "./view-single-key-data";

interface ViewKeyDataProps {
  selectedKey: string | null;
  setSelectedKey: (key: string) => void;
}

function ViewKeyData({ selectedKey, setSelectedKey }: ViewKeyDataProps) {
  const [selectedKeyData, setSelectedKeyData] =
    useState<ISingleRedisKeyData | null>(null);

  useEffect(() => {
    if (selectedKey !== null) {
      viewValue(selectedKey);
      console.log(selectedKeyData);
    }
  }, [selectedKey]);

  const viewValue = async (key: string) => {
    try {
      const response = await fetchSingleRedisValueApi(key);
      setSelectedKeyData(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-color-gray">
          Selected key - <Badge>{selectedKey}</Badge>
        </p>
        <X
          size={20}
          className="cursor-pointer text-red-400"
          onClick={() => setSelectedKey("")}
        />
      </div>
      {selectedKeyData && (
        <ViewSingleKeyData redisData={selectedKeyData && selectedKeyData} />
      )}
    </div>
  );
}

export default ViewKeyData;
