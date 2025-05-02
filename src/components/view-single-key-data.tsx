import { ISingleRedisKeyData } from "@/types/types";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { shrinkText } from "@/utils/utils";

interface ViewSingleKeyDataProps {
  redisData: ISingleRedisKeyData;
}

const ViewSingleKeyData = ({ redisData }: ViewSingleKeyDataProps) => {
  const { data, options, ttl, expireAt, memoryUsage } = redisData;
  const [dataFieldClicked, setDataFieldClicked] = useState<boolean>(false);
  const [optionsSelected, setOptionSelected] = useState<unknown>();
  const otherRows = [
    ["ttl", ttl],
    ["expireAt", expireAt ?? "null"],
    ["memoryUsage", memoryUsage],
  ];

  const clickOnOptions = (option: string) => {
    setOptionSelected((op: unknown) => ({
      ...op,
      [option]: !op?.[option], // toggle the current value
    }));
  };

  return (
    <Table className="border-2 mt-4 w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="border-r-2">Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Single row for full data object */}
        {data && (
          <TableRow className={`${dataFieldClicked ? "h-auto" : ""}`}>
            <TableCell className="border-r-2 break-all whitespace-normal min-w-[100px]">
              data
            </TableCell>
            <TableCell
              className="break-all whitespace-normal cursor-pointer"
              onClick={() => setDataFieldClicked((val) => !val)}
            >
              {dataFieldClicked ? (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </pre>
              ) : (
                <pre>{shrinkText(JSON.stringify(data), 75)}</pre>
              )}
            </TableCell>
          </TableRow>
        )}

        {/* Rows for each options field */}
        {options !== null &&
          Object.entries(options).map(([field, value], index) => {
            const isSelected =
              typeof optionsSelected === "object" && optionsSelected !== null
                ? (optionsSelected as Record<string, unknown>)[field]
                : false;

            return (
              <TableRow
                key={`opt-${index}`}
                className={`${isSelected ? "h-auto" : ""}`}
              >
                <TableCell className="border-r-2">{field}</TableCell>
                <TableCell
                  className="break-all cursor-pointer"
                  onClick={() => clickOnOptions(field)}
                >
                  {isSelected ? (
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    <pre>{shrinkText(JSON.stringify(value), 75)}</pre>
                  )}
                </TableCell>
              </TableRow>
            );
          })}

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
