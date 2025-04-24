"use client";

import { useEffect, useState } from "react";

import RedisConnectModal from "./redis-connect-modal";
import RedisKeyViewer from "./redis-key-viewer";
import RedisKeyTable from "./redis-key-table";
import { toast } from "sonner";

interface RedisKey {
  key: string;
  type: string;
  ttl: number;
}

interface KeyDetails {
  key: string;
  type: string;
  value: unknown;
  ttl: number;
}

export default function Connection() {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("");
  const [keys, setKeys] = useState<RedisKey[]>([]);
  const [selectedKey, setSelectedKey] = useState<KeyDetails | null>(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("redis_url");
    const storedPassword = localStorage.getItem("redis_password");
    if (storedUrl) {
      setUrl(storedUrl);
      setPassword(storedPassword || "");
      connectToRedis(storedUrl, storedPassword || "");
    }
  }, []);

  const connectToRedis = async (
    customUrl?: string,
    customPassword?: string
  ) => {
    const res = await fetch("/api/connect", {
      method: "POST",
      body: JSON.stringify({
        url: customUrl || url,
        password: customPassword || password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setStatus("Connention is completed");
    if (data.success) {
      localStorage.setItem("redis_url", customUrl || url);
      localStorage.setItem("redis_password", customPassword || password);
      setConnected(true);
      fetchKeys();
      toast.success("Connected to Redis!");
    } else {
      toast.error(data.message || "Failed to connect.");
    }
  };

  const disconnect = () => {
    setConnected(false);
    setUrl("");
    setPassword("");
    setKeys([]);
    setSelectedKey(null);
    setStatus("");
    localStorage.removeItem("redis_url");
    localStorage.removeItem("redis_password");
    toast("Disconnected", { icon: "🛑" });
  };

  const fetchKeys = () => {
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => setKeys(data));
  };

  const viewValue = async (key: string) => {
    const response = await fetch(`/api/key/${key}`);
    const data = await response.json();
    setSelectedKey(data);
  };

  const deleteKey = async (key: string) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete the key: ${key}?`
    );
    if (confirmDelete) {
      await fetch(`/api/key/${key}/delete`, { method: "DELETE" });
      setKeys(keys.filter((k) => k.key !== key));
      toast.success(`Deleted key: ${key}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!connected && (
        <RedisConnectModal
          url={url}
          setUrl={setUrl}
          password={password}
          setPassword={setPassword}
          connectToRedis={connectToRedis}
          status={status}
        />
      )}
      {connected && <button onClick={disconnect}>Disconnect</button>}
    </div>
  );
}
