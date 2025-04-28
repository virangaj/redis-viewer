import { RedisKey } from "@/models/models";
import { Trash2, SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { TableBody, TableRow, TableCell } from "./ui/table";
import TableIcon from "./table-icon";

interface RedisKeyTableProps {
  data: RedisKey;
  index: number;
  viewValue: (key: string) => Promise<void>;
  deleteKey: (key: string) => Promise<void>;
}

const RedisKeyTableRow = ({
  data,
  index,
  viewValue,
  deleteKey,
}: RedisKeyTableProps) => {
  const confirmDelete = () => {
    deleteKey(data.key);
  };
  return (
    <TableBody key={index}>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{data.key}</TableCell>
        <TableCell>{data.type}</TableCell>
        <TableCell>{data.ttl}</TableCell>
        <TableCell>
          <div className="flex items-center gap-4">
            <SquareArrowOutUpRight
              size={16}
              className="cursor-pointer text-blue-400"
              onClick={() => viewValue(data.key)}
            />
            <TableIcon
              Icon={Trash2}
              action={confirmDelete}
              className="cursor-pointer text-red-400"
              message={`Are you sure you want to delete the key ${data.key}?`}
            />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default RedisKeyTableRow;
