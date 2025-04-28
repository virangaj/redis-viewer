"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RedisKey } from "@/models/models";

interface RedisKeyTableProps {
  keys: RedisKey[];
  viewValue?: (key: string) => Promise<void>;
  deleteKey?: (key: string) => Promise<void>;
}

export default function RedisKeyTable({ keys }: RedisKeyTableProps) {
  console.log(keys);
  return (
    <div>
      {keys.length > 0 ? (
        <Table className="w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-[100px] text-gray-400">
                Index
              </TableHead>
              <TableHead className="text-left w-[200px] text-gray-400">
                Key
              </TableHead>
              <TableHead className="text-left w-[100px] text-gray-400">
                Type
              </TableHead>
              <TableHead className="text-left w-[100px] text-gray-400">
                TTL
              </TableHead>
              <TableHead className="text-left text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {keys.map((key: RedisKey, index: number) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{key.key}</TableCell>
                <TableCell>{key.type}</TableCell>
                <TableCell>{key.ttl}</TableCell>
                <TableCell>{key.ttl}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      ) : (
        <p>No keys found</p>
      )}
    </div>
  );
}
