"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

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
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Connect to Your Redis Instance</h1>

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
    </div>
  );
}
