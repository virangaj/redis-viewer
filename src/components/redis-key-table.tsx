"use client";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RedisKey } from "@/models/models";
import RedisKeyTableRow from "./redis-key-table-row";

interface RedisKeyTableProps {
  keys: RedisKey[];
  viewValue: (key: string) => Promise<void>;
  deleteKey: (key: string) => Promise<void>;
}

export default function RedisKeyTable({
  keys,
  deleteKey,
  viewValue,
}: RedisKeyTableProps) {
  return (
    <div>
      {keys.length > 0 ? (
        <Table className="w-[100%]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-[200px] text-gray-400">
                Key
              </TableHead>
              <TableHead className="text-left w-[100px] text-gray-400">
                Type
              </TableHead>
              <TableHead className="text-left w-[100px] text-gray-400">
                TTL
              </TableHead>
              <TableHead className="text-left w-[100px] text-gray-400">
                size
              </TableHead>
              <TableHead className="text-left text-gray-400 w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {keys.map((key: RedisKey, index: number) => (
            <RedisKeyTableRow
              key={index}
              data={key}
              index={index}
              deleteKey={deleteKey}
              viewValue={viewValue}
            />
          ))}
        </Table>
      ) : (
        <p className="text-center text-gray-400 mt-10">No keys found</p>
      )}
    </div>
  );
}
