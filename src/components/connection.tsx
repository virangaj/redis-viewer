"use client";

import { useEffect, useRef, useState } from "react";

import { RedisKey } from "@/models/models";
import { toast } from "sonner";
import RedisConnectModal from "./redis-connect-modal";
import RediKeyView from "./redis-key-view";
import ViewKeyData from "./view-key-data";

export default function Connection() {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("");
  const [keys, setKeys] = useState<RedisKey[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [leftWidth, setLeftWidth] = useState(800); // initial width in px
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const startDragging = () => {
    isDragging.current = true;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const handleDragging = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerX = containerRef.current.getBoundingClientRect().left;
    const newLeftWidth = e.clientX - containerX;

    setLeftWidth(newLeftWidth);
  };

  // Attach/remove mousemove globally
  useEffect(() => {
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const storedUrl = localStorage.getItem("redis_url");
    const storedPassword = localStorage.getItem("redis_password");
    if (storedUrl) {
      setUrl(storedUrl);
      setPassword(storedPassword || "");
      connectToRedis(storedUrl, storedPassword || "");
    }
  }, [hasMounted]);

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
    setKeys([]);
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => {
        setKeys(data.data);
        setLastRefresh(new Date());
        // console.log(data.data);
      });
  };

  const viewValue = async (key: string) => {
    setSelectedKey(key);
  };

  const deleteKey = async (key: string) => {
    await fetch(`/api/key/${key}/delete`, { method: "DELETE" });
    setKeys(keys.filter((k) => k.key !== key));
    toast.success(`Deleted key: ${key}`);
  };

  return (
    <div className="w-full min-h-2/3">
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
      {connected && (
        <div
          ref={containerRef}
          className="flex w-full h-96 bg-gray-100 dark:bg-gray-800"
        >
          <div style={{ width: leftWidth }} className="p-4">
            <RediKeyView
              keys={keys}
              viewValue={viewValue}
              deleteKey={deleteKey}
              lastRefresh={lastRefresh}
              fetchKeys={fetchKeys}
            />
          </div>
          <div
            onMouseDown={startDragging}
            className="w-1 cursor-col-resize bg-gray-400"
          />
          <div className="flex-1 p-4">
            <ViewKeyData selectedKey={selectedKey} />
          </div>
        </div>
      )}

      {connected && <button onClick={disconnect}>Disconnect</button>}
    </div>
  );
}
