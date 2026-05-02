"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export function McpTokenCard() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await api<{ token: string }>("/api/my/mcp-token", {
        method: "POST",
      });
      setToken(data.token);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (!confirm("Revoke your MCP token? Claude Desktop will disconnect.")) return;
    try {
      await api("/api/my/mcp-token", { method: "DELETE" });
      setToken(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleCopy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface-variant rounded-xl p-6 border border-border">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">vpn_key</span>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            MCP Token
          </h3>
          <p className="text-xs text-muted-foreground">
            Connect your Claude Desktop to Arkon
          </p>
        </div>
      </div>

      {token ? (
        <div className="flex flex-col gap-3">
          <div className="bg-[#3a302a] rounded-lg p-3 font-mono text-xs text-[#faf5ee] break-all">
            {token}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <span className="material-symbols-outlined text-sm mr-1">
                {copied ? "check" : "content_copy"}
              </span>
              {copied ? "Copied!" : "Copy Token"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRevoke}
              className="text-destructive hover:text-destructive"
            >
              <span className="material-symbols-outlined text-sm mr-1">
                vpn_key_off
              </span>
              Revoke
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {loading ? "Generating..." : "Generate MCP Token"}
        </Button>
      )}
    </div>
  );
}
