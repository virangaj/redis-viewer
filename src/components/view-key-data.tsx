import { KeyDetails } from "@/models/models";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface ViewKeyDataProps {
  selectedKey: string | null;
}

function ViewKeyData({ selectedKey }: ViewKeyDataProps) {
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
      <p className="font-color-gray">Selected key - <Badge>{selectedKey}</Badge></p>
    </div>
  );
}

export default ViewKeyData;
