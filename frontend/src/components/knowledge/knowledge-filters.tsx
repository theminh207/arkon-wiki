"use client";

import { cn } from "@/lib/utils";

type KnowledgeType = {
  id: string;
  slug: string;
  name: string;
  color: string;
};

type Props = {
  types: KnowledgeType[];
  selectedType: string | null;
  onSelectType: (slug: string | null) => void;
};

export function KnowledgeFilters({ types, selectedType, onSelectType }: Props) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sahara">
      <h4 className="text-sm font-semibold text-foreground mb-3">
        Knowledge Type
      </h4>

      <div className="flex flex-col gap-1">
        <FilterItem
          label="All Documents"
          active={selectedType === null}
          onClick={() => onSelectType(null)}
        />

        {types.map((type) => (
          <FilterItem
            key={type.slug}
            label={type.name}
            color={type.color}
            active={selectedType === type.slug}
            onClick={() =>
              onSelectType(selectedType === type.slug ? null : type.slug)
            }
          />
        ))}
      </div>
    </div>
  );
}

function FilterItem({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors w-full",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-secondary/50"
      )}
    >
      {color ? (
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      ) : (
        <span className="material-symbols-outlined text-sm">select_all</span>
      )}
      {label}
    </button>
  );
}
