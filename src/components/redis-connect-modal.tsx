"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { IRedisConnections } from "@/types/types";
import { fetchConnectionsApi } from "@/service/api";
import {
  TableHeader,
  TableRow,
  TableHead,
  Table,
  TableCell,
} from "@/components/ui/table";

interface RedisConnectModalProps {
  url: string;
  setUrl: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  connectToRedis: () => void;
  status: string;
}

export default function RedisConnectModal({
  url,
  setUrl,
  password,
  setPassword,
  connectToRedis,
  status,
}: RedisConnectModalProps) {
  const [redisConnections, setRedisConnections] = useState<IRedisConnections[]>(
    []
  );

  useEffect(() => {
    fetchRedisConnections();
  }, []);

  const fetchRedisConnections = async () => {
    try {
      const connectionsData: IRedisConnections[] = await fetchConnectionsApi();
      setRedisConnections(connectionsData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Connect to Your Redis Instance
      </h1>

      <div className="border p-4 rounded shadow-md w-96 mx-auto mt-6">
        <Label htmlFor="host">Host</Label>
        <Input
          type="text"
          id="host"
          placeholder="redis://host:port"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <Button
          onClick={() => connectToRedis()}
          className="cursor-pointer w-full"
        >
          Connect
        </Button>

        {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
      </div>
      {redisConnections && (
        <div className="w-96 mx-auto mt-6">
          <p className="font-color-gray">Available connections</p>
          <Table className="w-[100%]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-[10px] text-gray-400">
                  Redis Connection
                </TableHead>
                <TableHead className="text-left w-[10px] text-gray-400">
                  Host:Port
                </TableHead>
              </TableRow>
            </TableHeader>
            {redisConnections.map((r: IRedisConnections, i: number) => (
              <TableRow
                key={i}
                className="cursor-pointer"
                onClick={() => setUrl(`redis://localhost:${r.port}`)}
              >
                <TableCell>redis://localhost:{r.port}</TableCell>
                <TableCell>localhost:{r.port}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
}
