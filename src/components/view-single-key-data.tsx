import { ISingleRedisKeyData } from "@/types/types";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ViewSingleKeyDataProps {
  redisData: ISingleRedisKeyData;
}

const ViewSingleKeyData = ({ redisData }: ViewSingleKeyDataProps) => {
  const { data, options, ttl, expireAt, memoryUsage } = redisData;

  const otherRows = [
    ["ttl", ttl],
    ["expireAt", expireAt ?? "null"],
    ["memoryUsage", memoryUsage],
  ];
  const dataString = JSON.stringify(data);
  const dataPreview =
    dataString.length > 75 ? `${dataString.slice(0, 75)}…` : dataString;
  return (
    <Table className="border-2 mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="border-r-2">Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Single row for full data object */}
        <TableRow>
          <TableCell className="border-r-2">data</TableCell>
          <TableCell className="break-all">{dataPreview}</TableCell>
        </TableRow>

        {/* Rows for each options field */}
        {options !== null &&
          Object.entries(options).map(([field, value], index) => (
            <TableRow key={`opt-${index}`}>
              <TableCell className="border-r-2">{field}</TableCell>
              <TableCell className="break-all">{value}</TableCell>
            </TableRow>
          ))}

        {/* Rows for ttl, expireAt, memoryUsage */}
        {otherRows.map(([field, value], index) => (
          <TableRow key={`other-${index}`}>
            <TableCell className="border-r-2">{field}</TableCell>
            <TableCell className="break-all">{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ViewSingleKeyData;
