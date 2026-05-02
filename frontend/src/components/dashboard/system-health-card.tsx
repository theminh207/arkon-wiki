"use client";

export function SystemHealthCard() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sahara">
      <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
        <h3 className="text-xl tracking-tight text-foreground">
          System Health
        </h3>
        <span className="text-xs font-medium text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          MCP Server Online
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <HealthItem label="API" status="healthy" />
        <HealthItem label="Database" status="healthy" />
        <HealthItem label="Worker" status="healthy" />
      </div>
    </div>
  );
}

function HealthItem({
  label,
  status,
}: {
  label: string;
  status: "healthy" | "warning" | "error";
}) {
  const colors = {
    healthy: "text-green-600 bg-green-50",
    warning: "text-yellow-600 bg-yellow-50",
    error: "text-destructive bg-destructive/10",
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${colors[status]}`}>
      <span className="material-symbols-outlined text-sm filled">
        {status === "healthy" ? "check_circle" : status === "warning" ? "warning" : "error"}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
