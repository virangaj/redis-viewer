import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { KeyDetails } from "@/types/types";

interface ViewKeyDataProps {
  selectedKey: string | null;
  setSelectedKey: (key: string) => void;
}

function ViewKeyData({ selectedKey, setSelectedKey }: ViewKeyDataProps) {
  const [selectedKeyData, setSelectedKeyData] = useState<KeyDetails | null>(
    null
  );

  useEffect(() => {
    if (selectedKey !== null) {
      viewValue(selectedKey);
      console.log(selectedKeyData);
    }
  }, [selectedKey]);
  const viewValue = async (key: string) => {
    const response = await fetch(`/api/key/${key}`);
    const data = await response.json();
    setSelectedKeyData(data);
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
    </div>
  );
}

export default ViewKeyData;
